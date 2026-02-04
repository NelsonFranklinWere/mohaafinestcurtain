const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/images';

async function compressImages() {
  try {
    console.log('Starting image compression...');

    const files = fs.readdirSync(inputDir);
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png)$/i.test(file) &&
      !file.includes('compressed') &&
      file !== 'logo.jpeg' // Skip logo to preserve quality
    );

    console.log(`Found ${imageFiles.length} images to compress`);

    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const tempPath = path.join(inputDir, `temp_${file}`);

      try {
        // Get original file stats
        const originalStats = fs.statSync(inputPath);
        const originalSize = originalStats.size;

        // Compress based on file type
        if (/\.(jpg|jpeg)$/i.test(file)) {
          // Compress JPEG
          await sharp(inputPath)
            .jpeg({ quality: 80, progressive: true })
            .toFile(tempPath);
        } else if (/\.png$/i.test(file)) {
          // Compress PNG
          await sharp(inputPath)
            .png({ quality: 80, compressionLevel: 9 })
            .toFile(tempPath);
        }

        // Get compressed file stats
        const compressedStats = fs.statSync(tempPath);
        const compressedSize = compressedStats.size;

        // Calculate compression ratio
        const ratio = Math.round((compressedSize / originalSize) * 100);

        // Only replace if compression was successful (file got smaller)
        if (compressedSize < originalSize) {
          fs.renameSync(tempPath, inputPath);
          console.log(`${file}: ${originalSize} bytes -> ${compressedSize} bytes (${ratio}%)`);
        } else {
          // Remove temp file if no compression achieved
          fs.unlinkSync(tempPath);
          console.log(`${file}: No compression needed (${originalSize} bytes)`);
        }

      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
        // Clean up temp file if it exists
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      }
    }

    console.log('Image compression completed successfully!');

  } catch (error) {
    console.error('Error compressing images:', error);
  }
}

compressImages();
