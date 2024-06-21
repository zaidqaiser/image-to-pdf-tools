document.getElementById('convertBtn').addEventListener('click', function() {
  const fileInput = document.getElementById('fileInput');
  const imagePreview = document.getElementById('imagePreview');
  const pdfContainer = document.getElementById('pdfContainer');
  
  if (fileInput.files.length === 0) {
    alert('Please select an image file.');
    return;
  }
  
  const file = fileInput.files[0];
  const reader = new FileReader();
  
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      imagePreview.innerHTML = '';
      imagePreview.appendChild(img);
      
      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL('image/jpeg');
      
      // Use html2pdf to generate PDF
      html2pdf()
        .from(canvas)
        .set({
          margin: 1,
          filename: 'image_to_pdf.pdf',
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save()
        .then(() => {
          // Show conversion message
          pdfContainer.innerHTML = '';
          const conversionMessage = document.createElement('p');
          conversionMessage.textContent = 'File is converted and downloaded as PDF.';
          pdfContainer.appendChild(conversionMessage);
        });
    };
    
    img.src = e.target.result;
  };
  
  reader.readAsDataURL(file);
});
