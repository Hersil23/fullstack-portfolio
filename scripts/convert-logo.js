const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/images/logo-herasi.svg');
const pngPath = path.join(__dirname, '../public/images/logo-herasi.png');

// Leer el SVG
const svgBuffer = fs.readFileSync(svgPath);

// Convertir a PNG con fondo transparente
sharp(svgBuffer)
  .resize(512, 512)
  .png()
  .toFile(pngPath)
  .then(() => {
    console.log('Logo convertido exitosamente a PNG: public/images/logo-herasi.png');
  })
  .catch((err) => {
    console.error('Error al convertir:', err);
  });