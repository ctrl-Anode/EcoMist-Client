// Centralized lazy loaders to keep heavy libs out of main bundle
export async function getPDFLibs() {
  const [{ jsPDF }, autoTableMod, html2canvasMod] = await Promise.all([
    import('jspdf').then(m => ({ jsPDF: m.jsPDF || m.default })),
    import('jspdf-autotable'),
    import('html2canvas')
  ]);
  const html2canvas = html2canvasMod.default || html2canvasMod;
  // jsPDF v2 ESM exports jsPDF named; fallback for default
  return { jsPDF, autoTable: autoTableMod, html2canvas };
}

export async function getXLSX() {
  const mod = await import('xlsx');
  return mod;
}
