<template>
  <div>
    <h1>Exports</h1>
    <label for="exportFormat">Select Export Format:</label>
    <select id="exportFormat" v-model="selectedFormat">
      <option value="json">JSON</option>
      <option value="csv">CSV</option>
      <option value="excel">Excel</option>
    </select>
    <button @click="exportUserData">Export User Data</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

const selectedFormat = ref('json');

const exportUserData = async () => {
  try {
    const db = getFirestore();
    const usersCollection = collection(db, 'users');
    const querySnapshot = await getDocs(usersCollection);

    const users = [];
    const allFields = new Set(); // To track all unique fields

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      users.push({ id: doc.id, ...data });

      // Collect all unique fields
      Object.keys(data).forEach((key) => allFields.add(key));
    });

    // Ensure all documents have the same fields
    const unifiedUsers = users.map((user) => {
      const unifiedUser = {};
      allFields.forEach((field) => {
        unifiedUser[field] = user[field] || ''; // Fill missing fields with empty strings
      });
      return unifiedUser;
    });

    if (selectedFormat.value === 'json') {
      const blob = new Blob([JSON.stringify(unifiedUsers, null, 2)], { type: 'application/json' });
      saveAs(blob, 'user_data.json');
    } else if (selectedFormat.value === 'csv') {
      const csv = Papa.unparse(unifiedUsers, {
        quotes: true, // Add quotes around fields for better spacing
        delimiter: ',',
        newline: '\r\n',
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      saveAs(blob, 'user_data.csv');
    } else if (selectedFormat.value === 'excel') {
      const worksheet = XLSX.utils.json_to_sheet(unifiedUsers);

      // Add a logo placeholder and header
      XLSX.utils.sheet_add_aoa(worksheet, [
        ['AeroTech Inc.'], // Logo placeholder
        ['User Data Export'], // Title row
        ['Generated On:', new Date().toLocaleString()], // Metadata row
        [], // Empty row for spacing
      ], { origin: 'A1' });

      // Adjust column widths for better spacing
      const columnWidths = Object.keys(unifiedUsers[0] || {}).map(() => ({ wch: 20 }));
      worksheet['!cols'] = columnWidths;

      // Add a footer row
      const footerRow = [['', '', '© 2025 AeroTech Inc. All rights reserved. | Contact: support@aerotech.com']];
      XLSX.utils.sheet_add_aoa(worksheet, footerRow, { origin: -1 }); // Append to the end

      // Create a workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

      // Export the workbook
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, 'user_data.xlsx');
    }

    alert('User data exported successfully!');
  } catch (error) {
    console.error('Error exporting user data:', error);
    if (error.code === 'permission-denied') {
      alert('You do not have permission to access this data. Please contact the administrator.');
    } else if (error.code === 'unavailable') {
      alert('The service is currently unavailable. Please try again later.');
    } else {
      alert(`An unexpected error occurred: ${error.message}`);
    }
  }
};
</script>

<style scoped>
label {
  margin-right: 10px;
}

select {
  margin-right: 10px;
  padding: 5px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
