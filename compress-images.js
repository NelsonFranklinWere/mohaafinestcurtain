const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/images';
const compressedDir = path.join(inputDir, 'compressed');

// Create compressed directory if it doesn't exist
if (!fs.existsSync(compressedDir)) {
  fs.mkdirSync(compressedDir, { recursive: true });
}

// Super aggressive compression settings for fastest loading
const compressionSettings = {
  // For web display - much more aggressive
  web: {
    jpeg: { quality: 65, progressive: true, mozjpeg: true },
    png: { quality: 70, compressionLevel: 9, palette: true },
    webp: { quality: 60, effort: 4 },
    avif: { quality: 50, effort: 4 }
  },
  // For thumbnails
  thumbnail: {
    width: 400,
    height: 300,
    fit: 'cover',
    jpeg: { quality: 70, progressive: true },
    webp: { quality: 65, effort: 4 }
  },
  // For medium images
  medium: {
    width: 800,
    height: 600,
    fit: 'cover',
    jpeg: { quality: 75, progressive: true },
    webp: { quality: 70, effort: 4 }
  }
};

async function compressImage(inputPath, outputPath, settings) {
  const image = sharp(inputPath);

  if (settings.width) {
    image.resize(settings.width, settings.height, { fit: settings.fit });
  }

  if (outputPath.endsWith('.webp')) {
    return image.webp(settings.webp).toFile(outputPath);
  } else if (outputPath.endsWith('.avif')) {
    return image.avif(settings.avif).toFile(outputPath);
  } else if (outputPath.endsWith('.jpg') || outputPath.endsWith('.jpeg')) {
    return image.jpeg(settings.jpeg).toFile(outputPath);
  } else if (outputPath.endsWith('.png')) {
    return image.png(settings.png).toFile(outputPath);
  }
}

async function generateResponsiveImages(inputPath, filename) {
  const baseName = path.parse(filename).name;
  const compressedBasePath = path.join(compressedDir, baseName);

  try {
    // Generate ultra-compressed web versions
    await compressImage(inputPath, `${compressedBasePath}_web.jpg`, compressionSettings.web);
    await compressImage(inputPath, `${compressedBasePath}_web.webp`, compressionSettings.web);
    await compressImage(inputPath, `${compressedBasePath}_web.avif`, compressionSettings.web);

    // Generate responsive sizes
    await compressImage(inputPath, `${compressedBasePath}_thumb.webp`, {
      ...compressionSettings.thumbnail,
      webp: compressionSettings.thumbnail.webp
    });

    await compressImage(inputPath, `${compressedBasePath}_medium.webp`, {
      ...compressionSettings.medium,
      webp: compressionSettings.medium.webp
    });

    console.log(`✓ Generated responsive versions for ${filename}`);
  } catch (error) {
    console.error(`Error generating responsive images for ${filename}:`, error.message);
  }
}

async function ultraCompressImages() {
  try {
    console.log('🚀 Starting ULTRA FAST image compression for web...');

    const files = fs.readdirSync(inputDir);
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png)$/i.test(file) &&
      !file.includes('compressed') &&
      !file.includes('temp_') &&
      file !== 'logo.jpeg' // Skip logo to preserve quality
    );

    console.log(`📸 Found ${imageFiles.length} images to compress`);

    let totalOriginalSize = 0;
    let totalCompressedSize = 0;

    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);

      try {
        const originalStats = fs.statSync(inputPath);
        const originalSize = originalStats.size;
        totalOriginalSize += originalSize;

        // Generate all compressed versions
        await generateResponsiveImages(inputPath, file);

        // Also create an ultra-compressed version to replace original
        const ultraCompressedPath = path.join(compressedDir, `${path.parse(file).name}_ultra.jpg`);
        await compressImage(inputPath, ultraCompressedPath, compressionSettings.web);

        const ultraStats = fs.statSync(ultraCompressedPath);
        const ultraSize = ultraStats.size;
        totalCompressedSize += ultraSize;

        const savings = ((originalSize - ultraSize) / originalSize * 100).toFixed(1);
        console.log(`💾 ${file}: ${originalSize} → ${ultraSize} bytes (${savings}% smaller)`);

      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
      }
    }

    const totalSavings = ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1);
    console.log(`\n🎉 Compression complete!`);
    console.log(`📊 Total savings: ${totalSavings}% (${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB → ${(totalCompressedSize / 1024 / 1024).toFixed(2)}MB)`);
    console.log(`⚡ Images are now optimized for LIGHTNING FAST loading!`);

  } catch (error) {
    console.error('💥 Error in ultra compression:', error);
  }
}

ultraCompressImages();
