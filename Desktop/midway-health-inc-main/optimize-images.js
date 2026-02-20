import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Target directory
const assetsDir = path.resolve('src/assets');

// Configuration
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function optimizeImages() {
    console.log('Starting image optimization with Sharp...');

    try {
        const files = fs.readdirSync(assetsDir);

        for (const file of files) {
            if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

            const filePath = path.join(assetsDir, file);
            const stats = fs.statSync(filePath);
            const fileSizeMB = stats.size / (1024 * 1024);

            // Optimize if > 1MB
            if (fileSizeMB > 1.0) {
                console.log(`Optimizing: ${file} (${fileSizeMB.toFixed(2)} MB)`);

                const tempPath = path.join(assetsDir, `temp_${file}`);

                try {
                    const pipeline = sharp(filePath)
                        .resize({
                            width: MAX_WIDTH,
                            withoutEnlargement: true
                        });

                    if (file.toLowerCase().endsWith('.png')) {
                        await pipeline.png({ quality: QUALITY, compressionLevel: 9 }).toFile(tempPath);
                    } else {
                        await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tempPath);
                    }

                    // Replace original file
                    fs.unlinkSync(filePath);
                    fs.renameSync(tempPath, filePath);

                    const newStats = fs.statSync(filePath);
                    const newSizeMB = newStats.size / (1024 * 1024);
                    console.log(`  Done! New size: ${newSizeMB.toFixed(2)} MB`);

                } catch (err) {
                    console.error(`  Error processing ${file}:`, err.message);
                    if (fs.existsSync(tempPath)) {
                        fs.unlinkSync(tempPath);
                    }
                }
            }
        }

        console.log('Image optimization complete!');

    } catch (err) {
        console.error('Fatal error:', err);
    }
}

optimizeImages();
