import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toPng, toJpeg } from 'html-to-image';

export interface PDFExportOptions {
  filename?: string;
  quality?: number;
}

// Simple PDF export that captures exactly what you see in the preview
export const exportToPDF = async (
  element: HTMLElement,
  options: PDFExportOptions = {}
): Promise<void> => {
  const { filename = 'resume.pdf' } = options;

  let originalZoom = '';

  // Show loading
  const loadingElement = document.createElement('div');
  loadingElement.innerHTML = `
    <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
                z-index: 9999; text-align: center;">
      <div style="font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">
        Generating PDF...
      </div>
      <div style="font-size: 0.875rem; color: #6b7280;">
        Capturing your resume exactly as shown
      </div>
    </div>
  `;
  document.body.appendChild(loadingElement);

  try {
    console.log('PDF export: Starting capture process');
    console.log('Element passed to function:', element, {
      tagName: element?.tagName,
      className: element?.className,
      offsetWidth: element?.offsetWidth,
      offsetHeight: element?.offsetHeight
    });
    
    // Debug: Log available elements
    console.log('Available resume elements:', {
      container: document.getElementById('resume-preview-container'),
      dataResumeTemplate: document.querySelector('[data-resume-template]'),
      resumeTemplate: document.querySelector('.resume-template'),
      allDivs: document.querySelectorAll('#resume-preview-container div').length
    });
    
    // Wait for fonts
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    // Find the container and temporarily remove zoom
    const container = document.getElementById('resume-preview-container');
    originalZoom = container?.style.zoom || '';
    
    console.log('Container found:', {
      exists: !!container,
      zoom: originalZoom,
      offsetWidth: container?.offsetWidth,
      offsetHeight: container?.offsetHeight,
      childrenCount: container?.children.length,
      firstChildTagName: container?.firstElementChild?.tagName,
      firstChildClassName: container?.firstElementChild?.className
    });
    
    if (container) {
      console.log('Removing zoom from container, original zoom:', originalZoom);
      container.style.zoom = '1';
    }

    // Wait for zoom change to apply
    await new Promise(resolve => setTimeout(resolve, 200));

    // Always use the element passed in and capture a cloned, off-screen copy
    const sourceElement = element || (container?.firstElementChild as HTMLElement | null);
    if (!sourceElement) {
      throw new Error('Resume content not found in the page.');
    }

    // Create an off-screen sandbox to ensure measurable dimensions
    const sandbox = document.createElement('div');
    sandbox.id = 'pdf-capture-sandbox';
    sandbox.style.position = 'fixed';
    sandbox.style.left = '-10000px';
    sandbox.style.top = '0';
    sandbox.style.width = '210mm'; // A4 width
    sandbox.style.minHeight = '297mm';
    sandbox.style.background = '#ffffff';
    sandbox.style.zIndex = '-1';
    sandbox.style.padding = '0';
    sandbox.style.margin = '0';

    // Normalize text spacing and rendering for snapshot fidelity
    const style = document.createElement('style');
    style.textContent = `
      #pdf-capture-sandbox, #pdf-capture-sandbox * {
        letter-spacing: normal !important;
        word-spacing: normal !important;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `;
    sandbox.appendChild(style);

    const clone = sourceElement.cloneNode(true) as HTMLElement;
    sandbox.appendChild(clone);
    document.body.appendChild(sandbox);

    // Wait two animation frames to ensure layout
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

    // Compute dimensions with robust fallbacks
    let width = Math.max(clone.scrollWidth, clone.offsetWidth, clone.clientWidth);
    let height = Math.max(clone.scrollHeight, clone.offsetHeight, clone.clientHeight);

    // If still zero, use A4 defaults at ~96 DPI (approx.)
    if (!width || width <= 0) width = 794; // ~210mm
    if (!height || height <= 0) height = Math.max(1123, width * 1.414); // ~297mm or A4 ratio

    console.log('Using off-screen clone for capture with dimensions:', { width, height });

    // Try html2canvas with primary configuration against the clone
    let canvas;
    try {
      canvas = await html2canvas(clone, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width,
        height,
        scrollX: 0,
        scrollY: 0,
        windowWidth: width,
        windowHeight: height,
        foreignObjectRendering: true,
        imageTimeout: 0,
        ignoreElements: (el) => {
          return (el as HTMLElement).tagName === 'SCRIPT' || (el as HTMLElement).tagName === 'STYLE';
        }
      });
    } catch (canvasError) {
      console.warn('Primary canvas generation failed, trying fallback...', canvasError);
      // Fallback with simpler configuration
      canvas = await html2canvas(clone, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        foreignObjectRendering: true,
        imageTimeout: 0
      });
    } finally {
      // Cleanup the sandbox regardless of success or failure after canvas is created/attempted
      if (sandbox && document.body.contains(sandbox)) {
        document.body.removeChild(sandbox);
      }
    }

    // Restore zoom
    if (container) {
      console.log('Restoring zoom to:', originalZoom);
      container.style.zoom = originalZoom;
    }

    console.log('Canvas created:', {
      width: canvas.width,
      height: canvas.height
    });

    // Validate canvas dimensions
    if (!canvas.width || !canvas.height || canvas.width === 0 || canvas.height === 0) {
      throw new Error('Invalid canvas dimensions');
    }

    // Convert to image
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    
    // Create PDF with proper dimensions
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Validate calculated dimensions
    if (!imgWidth || !imgHeight || imgWidth <= 0 || imgHeight <= 0 || 
        !isFinite(imgWidth) || !isFinite(imgHeight)) {
      throw new Error('Invalid PDF dimensions calculated');
    }
    
    console.log('PDF dimensions:', { imgWidth, imgHeight });
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: imgHeight > 297 ? [imgWidth, imgHeight] : 'a4'
    });
    
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    pdf.save(filename);

    // Remove loading
    document.body.removeChild(loadingElement);

    // Show success
    const successElement = document.createElement('div');
    successElement.innerHTML = `
      <div style="position: fixed; bottom: 2rem; right: 2rem; 
                  background: #10b981; color: white; padding: 1rem 1.5rem; 
                  border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
                  z-index: 9999; font-weight: 500; animation: slideIn 0.3s ease-out;">
        ✓ PDF downloaded successfully!
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      </style>
    `;
    document.body.appendChild(successElement);
    setTimeout(() => {
      if (document.body.contains(successElement)) {
        document.body.removeChild(successElement);
      }
    }, 3000);

  } catch (error) {
    // Always restore zoom first
    const container = document.getElementById('resume-preview-container');
    if (container && container.style.zoom !== originalZoom) {
      container.style.zoom = originalZoom;
    }

    // Remove loading
    if (document.body.contains(loadingElement)) {
      document.body.removeChild(loadingElement);
    }

    console.error('PDF export failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Handle specific error types
    if (errorMessage.includes('oklab')) {
      alert('PDF generation failed due to browser compatibility. Please use your browser\'s Print function (Ctrl+P) and select "Save as PDF" instead.');
      window.print();
      return;
    }
    
    if (errorMessage.includes('jsPDF') || errorMessage.includes('scale') || errorMessage.includes('Invalid argument')) {
      alert('PDF generation failed due to invalid dimensions. Please try resizing your browser window or use Print (Ctrl+P) → Save as PDF.');
      window.print();
      return;
    }
    
    if (errorMessage.includes('canvas') || errorMessage.includes('Invalid dimensions')) {
      alert('PDF generation failed due to capture issues. Please ensure your resume is fully visible and try again, or use Print (Ctrl+P) → Save as PDF.');
      window.print();
      return;
    }

    const errorElement = document.createElement('div');
    errorElement.innerHTML = `
      <div style="position: fixed; bottom: 2rem; right: 2rem; 
                  background: #ef4444; color: white; padding: 1rem 1.5rem; 
                  border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
                  z-index: 9999; font-weight: 500; max-width: 400px;">
        <div style="font-weight: 600; margin-bottom: 0.25rem;">❌ PDF Export Failed</div>
        <div style="font-size: 0.875rem; opacity: 0.9;">${errorMessage}</div>
        <div style="font-size: 0.75rem; opacity: 0.8; margin-top: 0.5rem;">Try using browser Print (Ctrl+P) → Save as PDF</div>
      </div>
    `;
    document.body.appendChild(errorElement);
    setTimeout(() => {
      if (document.body.contains(errorElement)) {
        document.body.removeChild(errorElement);
      }
    }, 8000);
  }
};

// One-click auto-download, high-quality PNG -> PDF (color preserved)
export const exportToPDFAuto = async (
  element: HTMLElement,
  options: PDFExportOptions = {}
): Promise<void> => {
  const { filename = 'resume.pdf' } = options;

  // Visual feedback overlay
  const overlay = document.createElement('div');
  overlay.id = 'pdf-export-overlay';
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.zIndex = '999999';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.background = 'rgba(0,0,0,0.35)';
  overlay.innerHTML = `<div style="background:#111827;color:#fff;padding:16px 20px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,.4);font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif;">
    <div id="pdf-export-msg" style="font-weight:600">Preparing PDF…</div>
  </div>`;
  document.body.appendChild(overlay);
  const setMsg = (m: string) => {
    const el = document.getElementById('pdf-export-msg');
    if (el) el.textContent = m;
  };

  try {
    // Ensure fonts are loaded
    if (document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch {}
    }

    setMsg('Measuring content…');

    // Build off-screen container and clone
    const sandbox = document.createElement('div');
    sandbox.id = 'pdf-auto-sandbox';
    sandbox.style.position = 'fixed';
    sandbox.style.left = '-10000px';
    sandbox.style.top = '0';
    sandbox.style.background = '#ffffff';
    sandbox.style.zIndex = '-1';
    sandbox.style.padding = '0';
    sandbox.style.margin = '0';

    // Performance overrides (remove heavy effects)
    const perfStyle = document.createElement('style');
    perfStyle.textContent = `#pdf-auto-sandbox, #pdf-auto-sandbox * {animation: none !important; transition: none !important; box-shadow: none !important; filter: none !important;}`;
    sandbox.appendChild(perfStyle);

    const clone = element.cloneNode(true) as HTMLElement;
    // Force A4 width; height flows naturally
    clone.style.width = '210mm';
    clone.style.backgroundColor = '#ffffff';
    clone.style.transform = 'none';
    clone.style.boxShadow = 'none';

    sandbox.appendChild(clone);
    document.body.appendChild(sandbox);

    // Wait for layout
    await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())));

    // Measure
    const widthPx = Math.max(clone.scrollWidth, clone.offsetWidth, clone.clientWidth);
    const heightPx = Math.max(clone.scrollHeight, clone.offsetHeight, clone.clientHeight);
    if (!widthPx || !heightPx) {
      // Cleanup and fail back to caller
      document.body.removeChild(sandbox);
      throw new Error('Could not measure resume size for export');
    }

    // Compute per-page viewport (A4 aspect)
    const a4WidthMM = 210;
    const a4HeightMM = 297;
    const pageHeightPx = Math.floor((a4HeightMM / a4WidthMM) * widthPx);
    const totalPages = Math.max(1, Math.ceil(heightPx / pageHeightPx));

    // Always fit to a single A4 page
    {
      setMsg('Rendering (single page)…');

      // Choose a high but safe pixel ratio for single-page export
      const deviceMemSP = (navigator as any).deviceMemory || 8;
      let pr = Math.min(3, Math.max(2, window.devicePixelRatio || 2));
      if (deviceMemSP < 6) pr = Math.min(pr, 2);

      let singleUrl: string; let singleFormat: 'PNG' | 'JPEG' = 'PNG';
      try {
        singleUrl = await toPng(clone, { pixelRatio: pr, cacheBust: true, backgroundColor: '#ffffff', skipFonts: false });
        singleFormat = 'PNG';
      } catch {
        singleUrl = await toJpeg(clone, { pixelRatio: pr, cacheBust: true, backgroundColor: '#ffffff', quality: 0.95 });
        singleFormat = 'JPEG';
      }

      const imgSP = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = reject;
        i.src = singleUrl!;
      });

      // Use a custom page height so content isn't shrunk. Keep A4 width.
      const imgHeightMM = (imgSP.height * a4WidthMM) / imgSP.width;
      const pdfSP = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [a4WidthMM, imgHeightMM] });
      pdfSP.addImage(singleUrl, singleFormat, 0, 0, a4WidthMM, imgHeightMM);

      setMsg('Saving…');
      pdfSP.save(filename);

      // Cleanup sandbox
      if (document.body.contains(sandbox)) {
        document.body.removeChild(sandbox);
      }
      return;
    }

    // Adaptive quality to improve responsiveness
    const deviceMem = (navigator as any).deviceMemory || 8;
    const basePR = Math.min(3, Math.max(1.5, window.devicePixelRatio || 2));
    let pixelRatio = basePR;
    const megaPixels = (widthPx * Math.min(heightPx, pageHeightPx)) / 1_000_000 * totalPages;
    if (deviceMem < 6) pixelRatio = Math.min(pixelRatio, 2);
    if (megaPixels > 24) pixelRatio = Math.min(pixelRatio, 1.6);
    else if (megaPixels > 12) pixelRatio = Math.min(pixelRatio, 2);

    // Prepare PDF
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    // Create a fixed viewport to capture page by page
    const viewport = document.createElement('div');
    viewport.style.width = `${widthPx}px`;
    viewport.style.height = `${pageHeightPx}px`;
    viewport.style.overflow = 'hidden';
    viewport.style.position = 'relative';
    viewport.appendChild(clone);
    sandbox.appendChild(viewport);

    let y = 0;
    const overlapPx = Math.max(16, Math.round(widthPx * 0.012)); // small overlap to avoid cutting lines
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      setMsg(`Rendering page ${pageIndex + 1} of ${totalPages}…`);

      // Translate clone to show current slice with overlap for seamless page break
      const offsetY = pageIndex === 0 ? 0 : Math.max(0, y - overlapPx);
      clone.style.transform = `translateY(-${offsetY}px)`;

      // Adjust viewport height to avoid blank areas on final page
      const captureHeightPx = Math.min(pageHeightPx, heightPx - offsetY);
      viewport.style.height = `${captureHeightPx}px`;

      // Wait a frame for transform/height to apply
      await new Promise<void>(r => requestAnimationFrame(() => r()));

      // Try PNG first, fallback to JPEG if memory errors
      let sliceUrl: string;
      let imgFormat: 'PNG' | 'JPEG' = 'PNG';
      try {
        sliceUrl = await toPng(viewport, { pixelRatio, cacheBust: true, backgroundColor: '#ffffff', skipFonts: false });
        imgFormat = 'PNG';
      } catch (pngErr) {
        sliceUrl = await toJpeg(viewport, { pixelRatio, cacheBust: true, backgroundColor: '#ffffff', quality: 0.95 });
        imgFormat = 'JPEG';
      }

      const sliceHeight = Math.min(pageHeightPx, heightPx - y);
      const sliceHeightMM = (captureHeightPx * a4WidthMM) / widthPx;
      if (pageIndex > 0) pdf.addPage('a4', 'portrait');
      pdf.addImage(sliceUrl, imgFormat, 0, 0, a4WidthMM, sliceHeightMM);

      // Move to next slice with overlap to avoid cut-off text at page boundary
      y += sliceHeight;
    }

    setMsg('Saving…');
    pdf.save(filename);

    // Cleanup
    if (document.body.contains(sandbox)) {
      document.body.removeChild(sandbox);
    }
  } finally {
    // Remove overlay
    const o = document.getElementById('pdf-export-overlay');
    if (o && o.parentElement) o.parentElement.removeChild(o);
  }
};

export const generatePDFFilename = (
  firstName: string,
  lastName: string
): string => {
  const name = `${firstName}_${lastName}`.replace(/\s+/g, '_');
  const date = new Date().toISOString().split('T')[0];
  return `CV_${name}_${date}.pdf`;
};

// High-fidelity export using the browser's print engine
// This preserves layout (Grid/Flex), fonts, and text spacing
export const exportToPDFPrint = async (
  element: HTMLElement,
  _options: PDFExportOptions = {}
): Promise<void> => {
  // Build print container
  const printRoot = document.createElement('div');
  printRoot.id = 'pdf-print-root';
  printRoot.setAttribute('aria-hidden', 'true');
  printRoot.style.position = 'fixed';
  printRoot.style.inset = '0';
  printRoot.style.zIndex = '999999';
  printRoot.style.background = 'white';
  printRoot.style.display = 'block';
  printRoot.style.padding = '0';
  printRoot.style.margin = '0 auto';

  // Clone the element so we don't disturb the live UI
  const clone = element.cloneNode(true) as HTMLElement;
  // Force A4 width; height will expand naturally and paginate
  clone.style.width = '210mm';
  clone.style.minHeight = '297mm';
  clone.style.margin = '0 auto';
  clone.style.backgroundColor = '#ffffff';
  clone.style.boxShadow = 'none';
  clone.style.transform = 'none';

  printRoot.appendChild(clone);

  // Print CSS
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.textContent = `
    @page { size: A4; margin: 0; }
    @media print {
      html, body { height: auto; }
      body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      body > *:not(#pdf-print-root) { display: none !important; }
      #pdf-print-root { display: block !important; width: 210mm !important; margin: 0 auto !important; }
      #pdf-print-root * { box-shadow: none !important; filter: none !important; }
      /* Avoid element splits */
      *, *::before, *::after { page-break-inside: avoid; break-inside: avoid; }
    }
    @media screen { #pdf-print-root { display: none; } }
  `;

  document.body.appendChild(style);
  document.body.appendChild(printRoot);

  // Wait a tick for layout
  await new Promise<void>(resolve => setTimeout(resolve, 50));

  // Use afterprint to clean up
  await new Promise<void>((resolve) => {
    const cleanup = () => {
      try {
        if (printRoot && document.body.contains(printRoot)) {
          document.body.removeChild(printRoot);
        }
        if (style && document.head.contains(style)) {
          document.head.removeChild(style);
        }
      } catch {}
      window.removeEventListener('afterprint', cleanup);
      resolve();
    };

    window.addEventListener('afterprint', cleanup);
    window.print();

    // Fallback cleanup in case afterprint doesn't fire
    setTimeout(cleanup, 2000);
  });
};
