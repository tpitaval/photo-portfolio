import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const inputPath = join(rootDir, 'public', 'images', 'mini filligranne PIT black.png');
const outputPath = join(rootDir, 'public', 'favicon.png');

async function createSquareFavicon() {
  try {
    if (!existsSync(inputPath)) {
      console.error(`Input file not found: ${inputPath}`);
      process.exit(1);
    }

    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    const { width, height } = metadata;
    
    console.log(`Original dimensions: ${width}x${height}`);
    
    // Determine the size of the square (use the larger dimension)
    const size = Math.max(width, height);
    
    // Calculate padding to center the logo
    const paddingX = Math.floor((size - width) / 2);
    const paddingY = Math.floor((size - height) / 2);
    
    // Create square canvas with transparent background
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([
        {
          input: inputPath,
          top: paddingY,
          left: paddingX
        }
      ])
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Created square favicon: ${size}x${size} pixels`);
    console.log(`   Output: ${outputPath}`);
    
    // Also create common favicon sizes
    const sizes = [16, 32, 48, 64];
    for (const favSize of sizes) {
      const favPath = join(rootDir, 'public', `favicon-${favSize}x${favSize}.png`);
      await sharp(outputPath)
        .resize(favSize, favSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toFile(favPath);
      console.log(`   Created favicon-${favSize}x${favSize}.png`);
    }
    
  } catch (error) {
    console.error('Error creating square favicon:', error);
    process.exit(1);
  }
}

createSquareFavicon();

