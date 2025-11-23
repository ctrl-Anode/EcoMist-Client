/**
 * PDF Generator Utility
 * Handles professional PDF report generation with templates
 */

import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

/**
 * Brand Colors
 */
export const COLORS = {
  primary: { r: 16/255, g: 185/255, b: 129/255 },      // #10B981 Emerald
  secondary: { r: 99/255, g: 102/255, b: 241/255 },    // #6366F1 Indigo
  accent: { r: 245/255, g: 158/255, b: 11/255 },       // #F59E0B Amber
  success: { r: 34/255, g: 197/255, b: 94/255 },       // #22C55E Green
  warning: { r: 251/255, g: 191/255, b: 36/255 },      // #FBBF24 Yellow
  danger: { r: 239/255, g: 68/255, b: 68/255 },        // #EF4444 Red
  text: { r: 31/255, g: 41/255, b: 55/255 },           // #1F2937 Gray-800
  textLight: { r: 107/255, g: 114/255, b: 128/255 },   // #6B7280 Gray-500
  background: { r: 249/255, g: 250/255, b: 251/255 }   // #F9FAFB Gray-50
};

/**
 * Load PDF Template
 */
export async function loadPDFTemplate(templatePath = '/format/AeroTech-Template.pdf') {
  try {
    const response = await fetch(templatePath);
    if (!response.ok) throw new Error('Template not found');
    const arrayBuffer = await response.arrayBuffer();
    return await PDFDocument.load(arrayBuffer);
  } catch (error) {
    console.error('Error loading PDF template:', error);
    // Return a new blank PDF if template fails to load
    return await PDFDocument.create();
  }
}

/**
 * Convert Image URL to Base64
 */
export async function imageToBase64(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error converting image:', error);
    return null;
  }
}

/**
 * Convert Chart Canvas to Image
 */
export async function chartToImage(chartElement) {
  if (!chartElement) return null;
  try {
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(chartElement, {
      scale: 2,
      backgroundColor: '#FFFFFF',
      useCORS: true
    });
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error converting chart:', error);
    return null;
  }
}

/**
 * Format Date
 */
export function formatDate(date) {
  if (!date) return 'N/A';
  const d = date instanceof Date ? date : (date.toDate ? date.toDate() : new Date(date));
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Calculate Summary Statistics
 */
export function calculateSummaryStats(data) {
  const stats = {
    total: data.length,
    healthy: 0,
    bacterial: 0,
    fungal: 0,
    mosaicVirus: 0,
    nutrientDeficiency: 0,
    notLettuce: 0,
    cannotClassify: 0,
    avgConfidence: 0,
    highConfidence: 0,
    mediumConfidence: 0,
    lowConfidence: 0
  };

  let totalConfidence = 0;

  data.forEach(item => {
    const prediction = item.prediction || '';
    const confidence = item.confidence || 0;

    // Count by prediction
    if (prediction === 'Healthy') stats.healthy++;
    else if (prediction === 'Bacterial') stats.bacterial++;
    else if (prediction === 'Fungal') stats.fungal++;
    else if (prediction === 'Mosaic Virus') stats.mosaicVirus++;
    else if (prediction === 'Nutrient Deficiency') stats.nutrientDeficiency++;
    else if (prediction === 'Not Lettuce') stats.notLettuce++;
    else if (prediction === 'Cannot Classify') stats.cannotClassify++;

    // Count by confidence level
    totalConfidence += confidence;
    if (confidence >= 0.8) stats.highConfidence++;
    else if (confidence >= 0.5) stats.mediumConfidence++;
    else stats.lowConfidence++;
  });

  stats.avgConfidence = data.length > 0 ? (totalConfidence / data.length * 100).toFixed(2) : 0;

  return stats;
}

/**
 * Get Disease Color
 */
export function getDiseaseColor(prediction) {
  switch (prediction) {
    case 'Healthy':
      return COLORS.success;
    case 'Bacterial':
      return COLORS.danger;
    case 'Fungal':
      return COLORS.warning;
    case 'Mosaic Virus':
      return { r: 168/255, g: 85/255, b: 247/255 }; // Purple
    case 'Nutrient Deficiency':
      return { r: 251/255, g: 146/255, b: 60/255 }; // Orange
    default:
      return COLORS.textLight;
  }
}

/**
 * Add Page Header
 */
export async function addPageHeader(page, title, pageNumber, totalPages, pdfDoc) {
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Header background
  page.drawRectangle({
    x: 0,
    y: height - 60,
    width: width,
    height: 60,
    color: rgb(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b)
  });

  // Title
  page.drawText(title, {
    x: 30,
    y: height - 35,
    size: 16,
    font: font,
    color: rgb(1, 1, 1)
  });

  // Page number
  const pageText = `Page ${pageNumber} of ${totalPages}`;
  const pageTextWidth = regularFont.widthOfTextAtSize(pageText, 10);
  page.drawText(pageText, {
    x: width - pageTextWidth - 30,
    y: height - 35,
    size: 10,
    font: regularFont,
    color: rgb(1, 1, 1)
  });
}

/**
 * Add Page Footer
 */
export async function addPageFooter(page, pdfDoc) {
  const { width } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const timestamp = new Date().toLocaleString();
  const footerText = `Generated on ${timestamp} | AeroTech Crop Disease Detection System`;
  const textWidth = font.widthOfTextAtSize(footerText, 8);

  page.drawText(footerText, {
    x: (width - textWidth) / 2,
    y: 20,
    size: 8,
    font: font,
    color: rgb(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b)
  });
}

/**
 * Create Cover Page
 */
export async function createCoverPage(pdfDoc, reportData) {
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
  const { width, height } = page.getSize();
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Background gradient effect (using rectangles)
  page.drawRectangle({
    x: 0,
    y: height - 250,
    width: width,
    height: 250,
    color: rgb(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b),
    opacity: 0.1
  });

  // Main Title
  const title = 'AeroTech';
  page.drawText(title, {
    x: 50,
    y: height - 100,
    size: 48,
    font: boldFont,
    color: rgb(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b)
  });

  // Subtitle
  const subtitle = 'Crop Disease Detection Report';
  page.drawText(subtitle, {
    x: 50,
    y: height - 140,
    size: 24,
    font: regularFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  // Report Type
  const reportType = reportData.reportType || 'Analysis Report';
  page.drawText(reportType, {
    x: 50,
    y: height - 180,
    size: 16,
    font: boldFont,
    color: rgb(COLORS.secondary.r, COLORS.secondary.g, COLORS.secondary.b)
  });

  // Divider line
  page.drawLine({
    start: { x: 50, y: height - 200 },
    end: { x: width - 50, y: height - 200 },
    thickness: 2,
    color: rgb(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b)
  });

  // Report Details
  let yPos = height - 240;
  const details = [
    { label: 'Report ID:', value: String(reportData.reportId || `RPT-${Date.now()}`) },
    { label: 'Generated On:', value: String(formatDate(new Date())) },
    { label: 'Analysis Period:', value: String(reportData.period || 'All Time') },
    { label: 'Total Records:', value: String(reportData.totalRecords || 0) },
    { label: 'Model Version:', value: String(reportData.modelVersion || 'V3') }
  ];

  details.forEach(detail => {
    page.drawText(detail.label, {
      x: 50,
      y: yPos,
      size: 12,
      font: boldFont,
      color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
    });

    page.drawText(String(detail.value), {
      x: 200,
      y: yPos,
      size: 12,
      font: regularFont,
      color: rgb(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b)
    });

    yPos -= 25;
  });

  // Footer note
  page.drawText('Confidential - For Internal Use Only', {
    x: 50,
    y: 50,
    size: 10,
    font: regularFont,
    color: rgb(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b)
  });

  return page;
}

/**
 * Create Executive Summary Page
 */
export async function createExecutiveSummary(pdfDoc, stats, insights) {
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  await addPageHeader(page, 'Executive Summary', 2, insights.totalPages || 10, pdfDoc);

  let yPos = height - 100;

  // Title
  page.drawText('Key Findings', {
    x: 50,
    y: yPos,
    size: 18,
    font: boldFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  yPos -= 40;

  // Statistics Box
  const boxWidth = width - 100;
  const boxHeight = 180;
  
  // Background
  page.drawRectangle({
    x: 50,
    y: yPos - boxHeight,
    width: boxWidth,
    height: boxHeight,
    color: rgb(COLORS.background.r, COLORS.background.g, COLORS.background.b),
    borderColor: rgb(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b),
    borderWidth: 2
  });

  // Stats Grid
  const statItems = [
    { label: 'Total Analyses', value: stats.total },
    { label: 'Healthy', value: stats.healthy },
    { label: 'Bacterial', value: stats.bacterial },
    { label: 'Fungal', value: stats.fungal },
    { label: 'Avg Confidence', value: `${stats.avgConfidence}%` },
    { label: 'High Confidence', value: stats.highConfidence }
  ];

  let statYPos = yPos - 30;
  let statXPos = 70;
  const colWidth = (boxWidth - 40) / 3;

  statItems.forEach((stat, index) => {
    if (index > 0 && index % 3 === 0) {
      statYPos -= 70;
      statXPos = 70;
    }

    // Value
    page.drawText(String(stat.value), {
      x: statXPos,
      y: statYPos + 5,
      size: 20,
      font: boldFont,
      color: rgb(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b)
    });

    // Label
    page.drawText(stat.label, {
      x: statXPos,
      y: statYPos - 15,
      size: 10,
      font: regularFont,
      color: rgb(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b)
    });

    statXPos += colWidth;
  });

  yPos -= boxHeight + 50;

  // Critical Alerts
  page.drawText('Critical Alerts', {
    x: 50,
    y: yPos,
    size: 16,
    font: boldFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  yPos -= 30;

  const alerts = [];
  if (stats.bacterial > 0) {
    alerts.push(`[!] ${stats.bacterial} bacterial infection(s) detected - Immediate action recommended`);
  }
  if (stats.fungal > 0) {
    alerts.push(`[!] ${stats.fungal} fungal infection(s) detected - Treatment required`);
  }
  if (stats.lowConfidence > 0) {
    alerts.push(`[i] ${stats.lowConfidence} low confidence prediction(s) - Manual review suggested`);
  }
  if (alerts.length === 0) {
    alerts.push('[OK] No critical alerts - All systems operating normally');
  }

  alerts.forEach(alert => {
    page.drawText(alert, {
      x: 70,
      y: yPos,
      size: 11,
      font: regularFont,
      color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b),
      maxWidth: width - 140
    });
    yPos -= 25;
  });

  await addPageFooter(page, pdfDoc);

  return page;
}

/**
 * Wrap text to fit within width
 */
export function wrapText(text, maxWidth, font, fontSize) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);
    
    if (testWidth > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

/**
 * Save PDF with filename
 */
export async function savePDF(pdfDoc, filename) {
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}
