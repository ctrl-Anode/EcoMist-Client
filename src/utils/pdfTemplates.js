/**
 * PDF Template Handlers
 * Specialized functions for creating different report sections
 */

// Import only what is needed (avoid duplicate StandardFonts import)
import { rgb, StandardFonts } from 'pdf-lib';
import { 
  COLORS, 
  formatDate, 
  wrapText, 
  addPageHeader, 
  addPageFooter,
  getDiseaseColor,
  imageToBase64
} from './pdfGenerator';
// Removed duplicate import of StandardFonts and rgb

/**
 * Generic helper: embed remote image (PNG/JPEG) with max sizing
 */
export async function embedImageFromUrl(pdfDoc, url, maxWidth = 200, maxHeight = 140) {
  if (!url) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    // naive format detection
    let image;
    if (url.toLowerCase().endsWith('.png')) {
      image = await pdfDoc.embedPng(buf);
    } else {
      image = await pdfDoc.embedJpg(buf);
    }
    const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
    return { image, width: image.width * scale, height: image.height * scale };
  } catch (e) {
    console.warn('Image embed failed', e);
    return null;
  }
}

/**
 * Summary Statistics Page (disease breakdown + confidence distribution)
 */
export async function createSummaryStatisticsPage(pdfDoc, stats, pageNumber, totalPages) {
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  await addPageHeader(page, 'Summary Statistics', pageNumber, totalPages, pdfDoc);

  let y = height - 110;
  page.drawText('Disease Breakdown', { x: 50, y, size: 16, font: boldFont, color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b) });
  y -= 26;

  const diseaseRows = [
    ['Healthy', String(stats.healthy)],
    ['Bacterial', String(stats.bacterial)],
    ['Fungal', String(stats.fungal)],
    ['Mosaic Virus', String(stats.mosaicVirus)],
    ['Nutrient Deficiency', String(stats.nutrientDeficiency)],
    ['Not Lettuce', String(stats.notLettuce)],
    ['Cannot Classify', String(stats.cannotClassify)]
  ];
  drawSimpleTable(page, 50, y, ['Disease', 'Count'], diseaseRows, [200, 100], regularFont, boldFont);
  y -= (diseaseRows.length + 2) * 20 + 20;

  page.drawText('Confidence Distribution', { x: 50, y, size: 16, font: boldFont, color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b) });
  y -= 26;
  const confRows = [
    ['Average (%)', String(stats.avgConfidence)],
    ['High (>=80%)', String(stats.highConfidence)],
    ['Medium (>=50%)', String(stats.mediumConfidence)],
    ['Low (<50%)', String(stats.lowConfidence)]
  ];
  drawSimpleTable(page, 50, y, ['Metric', 'Value'], confRows, [200, 100], regularFont, boldFont);
  y -= (confRows.length + 2) * 20 + 30;

  drawColorLegend(page, 50, y, regularFont, boldFont);

  await addPageFooter(page, pdfDoc);
  return page;
}

/**
 * Draw a very simple two-column table
 */
export function drawSimpleTable(page, startX, startY, headers, rows, colWidths, regularFont, boldFont) {
  const rowHeight = 20;
  // Header background
  page.drawRectangle({ x: startX, y: startY - rowHeight + 5, width: colWidths.reduce((a, b) => a + b, 0), height: rowHeight, color: rgb(0.93,0.94,0.95) });
  let xCursor = startX + 8;
  headers.forEach((h, i) => {
    page.drawText(h, { x: xCursor, y: startY - 10, size: 10, font: boldFont, color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b) });
    xCursor += colWidths[i];
  });
  let yCursor = startY - rowHeight - 5;
  rows.forEach(r => {
    xCursor = startX + 8;
    r.forEach((cell, i) => {
      page.drawText(cell, { x: xCursor, y: yCursor - 10, size: 10, font: regularFont, color: rgb(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b) });
      xCursor += colWidths[i];
    });
    // horizontal separator
    page.drawLine({ start: { x: startX, y: yCursor }, end: { x: startX + colWidths.reduce((a,b)=>a+b,0), y: yCursor }, thickness: 0.5, color: rgb(0.8,0.8,0.8) });
    yCursor -= rowHeight;
  });
}

/**
 * Draw legend for colors used for disease classes
 */
export function drawColorLegend(page, x, y, regularFont, boldFont) {
  page.drawText('Legend', { x, y, size: 14, font: boldFont, color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b) });
  y -= 24;
  const entries = [
    ['Healthy', getDiseaseColor('Healthy')],
    ['Bacterial', getDiseaseColor('Bacterial')],
    ['Fungal', getDiseaseColor('Fungal')],
    ['Mosaic Virus', getDiseaseColor('Mosaic Virus')],
    ['Nutrient Deficiency', getDiseaseColor('Nutrient Deficiency')]
  ];
  entries.forEach(([label, col]) => {
    page.drawRectangle({ x, y: y - 12, width: 14, height: 14, color: rgb(col.r, col.g, col.b) });
    page.drawText(label, { x: x + 22, y: y - 2, size: 10, font: regularFont, color: rgb(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b) });
    y -= 20;
  });
}

/**
 * Create Overview Page
 */
export async function createOverviewPage(pdfDoc, data, pageNumber, totalPages) {
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  await addPageHeader(page, 'Report Overview', pageNumber, totalPages, pdfDoc);

  let yPos = height - 100;

  // Report Information
  page.drawText('Report Information', {
    x: 50,
    y: yPos,
    size: 16,
    font: boldFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  yPos -= 35;

  const infoItems = [
    { label: 'Report Type:', value: data.reportType || 'Analysis Report' },
    { label: 'Analysis Mode:', value: data.analysisMode || 'Single Image' },
    { label: 'Model Used:', value: data.modelUsed || 'LettuceModel V3' },
    { label: 'Date Range:', value: data.dateRange || 'All Time' },
    { label: 'Total Records:', value: String(data.totalRecords || 0) },
    { label: 'Data Source:', value: data.dataSource || 'Firebase Database' }
  ];

  infoItems.forEach(item => {
    page.drawText(item.label, {
      x: 70,
      y: yPos,
      size: 11,
      font: boldFont,
      color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
    });

    page.drawText(item.value, {
      x: 220,
      y: yPos,
      size: 11,
      font: regularFont,
      color: rgb(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b)
    });

    yPos -= 25;
  });

  yPos -= 20;

  // Model Information
  if (data.modelInfo) {
    page.drawText('Model Details', {
      x: 50,
      y: yPos,
      size: 16,
      font: boldFont,
      color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
    });

    yPos -= 35;

    const modelDetails = [
      { label: 'Model Name:', value: data.modelInfo.model_name || 'N/A' },
      { label: 'Version:', value: data.modelInfo.version || 'N/A' },
      { label: 'Input Shape:', value: data.modelInfo.input_shape ? `[${data.modelInfo.input_shape.join(', ')}]` : 'N/A' },
      { label: 'Classes:', value: data.modelInfo.classes ? `${data.modelInfo.classes.length} disease types` : 'N/A' }
    ];

    modelDetails.forEach(item => {
      page.drawText(item.label, {
        x: 70,
        y: yPos,
        size: 11,
        font: boldFont,
        color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
      });

      page.drawText(item.value, {
        x: 220,
        y: yPos,
        size: 11,
        font: regularFont,
        color: rgb(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b)
      });

      yPos -= 25;
    });
  }

  yPos -= 20;

  // Report Scope
  page.drawText('Report Scope', {
    x: 50,
    y: yPos,
    size: 16,
    font: boldFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  yPos -= 30;

  const scopeText = data.scope || 'This report contains comprehensive analysis of crop disease detection results, including historical data, statistical insights, and actionable recommendations.';
  const scopeLines = wrapText(scopeText, width - 140, regularFont, 11);

  scopeLines.forEach(line => {
    page.drawText(line, {
      x: 70,
      y: yPos,
      size: 11,
      font: regularFont,
      color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
    });
    yPos -= 20;
  });

  await addPageFooter(page, pdfDoc);

  return page;
}

/**
 * Create Analysis Details Page
 */
export async function createAnalysisDetailsPage(pdfDoc, item, index, pageNumber, totalPages) {
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  await addPageHeader(page, `Analysis #${index + 1}`, pageNumber, totalPages, pdfDoc);

  let yPos = height - 100;

  // Analysis Info Box
  const boxWidth = width - 100;
  
  page.drawRectangle({
    x: 50,
    y: yPos - 100,
    width: boxWidth,
    height: 100,
    color: rgb(COLORS.background.r, COLORS.background.g, COLORS.background.b),
    borderColor: rgb(COLORS.primary.r, COLORS.primary.g, COLORS.primary.b),
    borderWidth: 1
  });

  // Prediction
  page.drawText('Prediction:', {
    x: 65,
    y: yPos - 30,
    size: 12,
    font: boldFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  const predictionColor = getDiseaseColor(item.prediction);
  page.drawText(item.prediction || 'N/A', {
    x: 160,
    y: yPos - 30,
    size: 14,
    font: boldFont,
    color: rgb(predictionColor.r, predictionColor.g, predictionColor.b)
  });

  // Confidence
  page.drawText('Confidence:', {
    x: 65,
    y: yPos - 55,
    size: 12,
    font: boldFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  const confidence = (item.confidence * 100).toFixed(2);
  page.drawText(`${confidence}%`, {
    x: 160,
    y: yPos - 55,
    size: 12,
    font: regularFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  // Date
  page.drawText('Date:', {
    x: 65,
    y: yPos - 80,
    size: 12,
    font: boldFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  page.drawText(formatDate(item.createdAt), {
    x: 160,
    y: yPos - 80,
    size: 12,
    font: regularFont,
    color: rgb(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b)
  });

  // Model
  page.drawText('Model:', {
    x: 340,
    y: yPos - 30,
    size: 12,
    font: boldFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  page.drawText((item.modelUsed || 'v2').toUpperCase(), {
    x: 400,
    y: yPos - 30,
    size: 12,
    font: regularFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  yPos -= 130;

  // Embed image if available
  if (item.imageUrl) {
    const imgInfo = await embedImageFromUrl(pdfDoc, item.imageUrl, 220, 160);
    if (imgInfo) {
      page.drawImage(imgInfo.image, {
        x: 50,
        y: yPos - imgInfo.height,
        width: imgInfo.width,
        height: imgInfo.height
      });
      // shift content area to right for probabilities if space permits
      const leftBlockBottom = yPos - imgInfo.height;
      const probStartX = 290;
      // Re-label section if image present
      page.drawText('Class Probabilities', {
        x: probStartX,
        y: yPos,
        size: 14,
        font: boldFont,
        color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
      });
      yPos -= 30;
      if (item.classProbabilities) {
        const probs = Object.entries(item.classProbabilities).sort((a, b) => b[1] - a[1]);
        probs.forEach(([className, prob]) => {
          const percentage = (prob * 100).toFixed(2);
          const barWidth = prob * 160;
          // bar bg
          page.drawRectangle({ x: probStartX, y: yPos - 12, width: 160, height: 14, color: rgb(0.95,0.95,0.95) });
          const barColor = getDiseaseColor(className);
          page.drawRectangle({ x: probStartX, y: yPos - 12, width: barWidth, height: 14, color: rgb(barColor.r, barColor.g, barColor.b), opacity: 0.7 });
          page.drawText(className, { x: probStartX + 4, y: yPos - 6, size: 9, font: regularFont, color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b) });
          page.drawText(`${percentage}%`, { x: probStartX + 130, y: yPos - 6, size: 9, font: boldFont, color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b) });
          yPos -= 20;
        });
      }
      // reset yPos below image if lower
      yPos = Math.min(yPos, leftBlockBottom - 20);
    }
  }

  // Class Probabilities
  page.drawText('Class Probabilities', {
    x: 50,
    y: yPos,
    size: 14,
    font: boldFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  yPos -= 30;

  if (item.classProbabilities) {
    const probs = Object.entries(item.classProbabilities).sort((a, b) => b[1] - a[1]);
    
    probs.forEach(([className, prob]) => {
      const percentage = (prob * 100).toFixed(2);
      const barWidth = (prob * (boxWidth - 200));
      
      // Bar background
      page.drawRectangle({
        x: 70,
        y: yPos - 15,
        width: boxWidth - 200,
        height: 18,
        color: rgb(0.95, 0.95, 0.95)
      });

      // Bar fill
      const barColor = getDiseaseColor(className);
      page.drawRectangle({
        x: 70,
        y: yPos - 15,
        width: barWidth,
        height: 18,
        color: rgb(barColor.r, barColor.g, barColor.b),
        opacity: 0.7
      });

      // Class name
      page.drawText(className, {
        x: 75,
        y: yPos - 11,
        size: 10,
        font: regularFont,
        color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
      });

      // Percentage
      page.drawText(`${percentage}%`, {
        x: boxWidth - 80,
        y: yPos - 11,
        size: 10,
        font: boldFont,
        color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
      });

      yPos -= 25;
    });
  }

  yPos -= 20;

  // Recommendations
  if (yPos > 150) {
    page.drawText('Recommendations', {
      x: 50,
      y: yPos,
      size: 14,
      font: boldFont,
      color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
    });

    yPos -= 25;

    let recommendations = [];
    
    if (Array.isArray(item.recommendations)) {
      recommendations = item.recommendations;
    } else if (item.recommendations?.diseases) {
      item.recommendations.diseases.forEach(disease => {
        recommendations.push(`${disease.name}: ${disease.description}`);
        disease.treatments?.forEach(treatment => {
          treatment.steps?.forEach(step => recommendations.push(`  • ${step}`));
        });
      });
    } else if (item.recommendations?.steps) {
      recommendations = item.recommendations.steps;
    }

    recommendations.slice(0, 5).forEach((rec, i) => {
      if (yPos < 80) return;
      
      const recLines = wrapText(`${i + 1}. ${rec}`, width - 140, regularFont, 10);
      recLines.forEach(line => {
        if (yPos < 80) return;
        page.drawText(line, {
          x: 70,
          y: yPos,
          size: 10,
          font: regularFont,
          color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
        });
        yPos -= 18;
      });
    });
  }

  await addPageFooter(page, pdfDoc);

  return page;
}

/**
 * Create Comparison Details Page
 */
export async function createComparisonDetailsPage(pdfDoc, item, index, pageNumber, totalPages) {
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  await addPageHeader(page, `Comparison #${index + 1}`, pageNumber, totalPages, pdfDoc);

  let yPos = height - 100;

  // Comparison Header
  page.drawText('Before & After Analysis', {
    x: 50,
    y: yPos,
    size: 16,
    font: boldFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  yPos -= 40;

  // Side-by-side comparison boxes
  const boxWidth = (width - 120) / 2;
  const boxHeight = 120;

  // Image 1 Box
  page.drawRectangle({
    x: 50,
    y: yPos - boxHeight,
    width: boxWidth,
    height: boxHeight,
    color: rgb(COLORS.background.r, COLORS.background.g, COLORS.background.b),
    borderColor: rgb(COLORS.secondary.r, COLORS.secondary.g, COLORS.secondary.b),
    borderWidth: 2
  });

  page.drawText('Image 1 (Before)', {
    x: 65,
    y: yPos - 25,
    size: 12,
    font: boldFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  const color1 = getDiseaseColor(item.prediction1);
  page.drawText(item.prediction1 || 'N/A', {
    x: 65,
    y: yPos - 50,
    size: 14,
    font: boldFont,
    color: rgb(color1.r, color1.g, color1.b)
  });

  page.drawText(`Confidence: ${(item.confidence1 * 100).toFixed(2)}%`, {
    x: 65,
    y: yPos - 75,
    size: 11,
    font: regularFont,
    color: rgb(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b)
  });

  // Image 2 Box
  page.drawRectangle({
    x: 70 + boxWidth,
    y: yPos - boxHeight,
    width: boxWidth,
    height: boxHeight,
    color: rgb(COLORS.background.r, COLORS.background.g, COLORS.background.b),
    borderColor: rgb(COLORS.secondary.r, COLORS.secondary.g, COLORS.secondary.b),
    borderWidth: 2
  });

  page.drawText('Image 2 (After)', {
    x: 85 + boxWidth,
    y: yPos - 25,
    size: 12,
    font: boldFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  const color2 = getDiseaseColor(item.prediction2);
  page.drawText(item.prediction2 || 'N/A', {
    x: 85 + boxWidth,
    y: yPos - 50,
    size: 14,
    font: boldFont,
    color: rgb(color2.r, color2.g, color2.b)
  });

  page.drawText(`Confidence: ${(item.confidence2 * 100).toFixed(2)}%`, {
    x: 85 + boxWidth,
    y: yPos - 75,
    size: 11,
    font: regularFont,
    color: rgb(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b)
  });

  yPos -= boxHeight + 40;

  // Embed before/after images below header if available
  if (item.imageUrl1 || item.imageUrl2) {
    const maxWidthEach = (width - 140) / 2;
    const maxHeight = 150;
    const img1 = await embedImageFromUrl(pdfDoc, item.imageUrl1, maxWidthEach, maxHeight);
    const img2 = await embedImageFromUrl(pdfDoc, item.imageUrl2, maxWidthEach, maxHeight);
    let imgY = yPos - 10;
    if (img1) {
      page.drawImage(img1.image, { x: 50, y: imgY - img1.height, width: img1.width, height: img1.height });
    }
    if (img2) {
      page.drawImage(img2.image, { x: 70 + maxWidthEach, y: imgY - (img2.height), width: img2.width, height: img2.height });
    }
    yPos = imgY - Math.max(img1?.height || 0, img2?.height || 0) - 30;
  }

  // Progression Analysis
  page.drawText('Progression Analysis', {
    x: 50,
    y: yPos,
    size: 14,
    font: boldFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  yPos -= 30;

  const confidenceChange = ((item.confidence2 - item.confidence1) * 100).toFixed(2);
  const changeColor = item.progressionDetected ? COLORS.warning : COLORS.success;

  page.drawRectangle({
    x: 50,
    y: yPos - 80,
    width: width - 100,
    height: 80,
    color: rgb(changeColor.r, changeColor.g, changeColor.b),
    opacity: 0.1,
    borderColor: rgb(changeColor.r, changeColor.g, changeColor.b),
    borderWidth: 1
  });

  const statusIcon = item.progressionDetected ? '[!]' : '[OK]';
  const statusText = item.progressionDetected ? 'Disease Progression Detected' : 'No Significant Change';
  
  page.drawText(statusIcon, {
    x: 65,
    y: yPos - 30,
    size: 14,
    font: boldFont,
    color: rgb(changeColor.r, changeColor.g, changeColor.b)
  });

  page.drawText(statusText, {
    x: 100,
    y: yPos - 28,
    size: 13,
    font: boldFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  page.drawText(`Confidence Change: ${confidenceChange > 0 ? '+' : ''}${confidenceChange}%`, {
    x: 65,
    y: yPos - 55,
    size: 11,
    font: regularFont,
    color: rgb(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b)
  });

  page.drawText(`Date: ${formatDate(item.createdAt)}`, {
    x: 65,
    y: yPos - 72,
    size: 10,
    font: regularFont,
    color: rgb(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b)
  });

  yPos -= 100;

  // Model Info
  page.drawText(`Model Used: ${(item.modelUsed || 'v2').toUpperCase()}`, {
    x: 50,
    y: yPos,
    size: 10,
    font: regularFont,
    color: rgb(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b)
  });

  await addPageFooter(page, pdfDoc);

  return page;
}

/**
 * Create Chart Page
 */
export async function createChartPage(pdfDoc, chartTitle, chartImageData, pageNumber, totalPages) {
  if (!chartImageData) return null;

  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  await addPageHeader(page, chartTitle, pageNumber, totalPages, pdfDoc);

  let yPos = height - 100;

  page.drawText(chartTitle, {
    x: 50,
    y: yPos,
    size: 16,
    font: boldFont,
    color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
  });

  yPos -= 40;

  try {
    // Embed chart image
    const chartImage = await pdfDoc.embedPng(chartImageData);
    const chartDims = chartImage.scale(0.8);

    const chartX = (width - chartDims.width) / 2;
    const chartY = yPos - chartDims.height - 20;

    page.drawImage(chartImage, {
      x: chartX,
      y: chartY,
      width: chartDims.width,
      height: chartDims.height
    });
  } catch (error) {
    console.error('Error embedding chart:', error);
    page.drawText('Chart could not be rendered', {
      x: width / 2 - 80,
      y: yPos - 200,
      size: 12,
      font: boldFont,
      color: rgb(COLORS.textLight.r, COLORS.textLight.g, COLORS.textLight.b)
    });
  }

  await addPageFooter(page, pdfDoc);

  return page;
}

/**
 * Create Disease Insights Page
 */
export async function createDiseaseInsightsPage(pdfDoc, diseaseInsights, pageNumber, totalPages) {
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  await addPageHeader(page, 'Disease-Specific Insights', pageNumber, totalPages, pdfDoc);

  let yPos = height - 100;

  Object.entries(diseaseInsights).forEach(([disease, info]) => {
    if (yPos < 150) return; // Stop if page is full

    const diseaseColor = getDiseaseColor(disease);

    // Disease header
    page.drawText(disease, {
      x: 50,
      y: yPos,
      size: 14,
      font: boldFont,
      color: rgb(diseaseColor.r, diseaseColor.g, diseaseColor.b)
    });

    yPos -= 25;

    // Stats
    const stats = [
      `Occurrences: ${info.count}`,
      `Avg Confidence: ${info.avgConfidence.toFixed(2)}%`,
      `Last Detected: ${info.latest}`
    ];

    stats.forEach(stat => {
      page.drawText(stat, {
        x: 70,
        y: yPos,
        size: 10,
        font: regularFont,
        color: rgb(COLORS.text.r, COLORS.text.g, COLORS.text.b)
      });
      yPos -= 18;
    });

    yPos -= 10;
  });

  await addPageFooter(page, pdfDoc);

  return page;
}
