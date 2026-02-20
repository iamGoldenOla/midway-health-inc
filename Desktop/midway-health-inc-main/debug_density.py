from PIL import Image

def debug_density(path):
    img = Image.open(path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    print(f"Height: {height}")
    print("Row Density (Y: PixelCount):")
    
    # Only print bottom half where the split likely is
    for y in range(int(height * 0.5), height):
        count = 0
        for x in range(width):
            if pixels[x, y][3] > 10:
                count += 1
        print(f"{y}: {count}")

debug_density("src/assets/MIDWAY_HEALTH_INC_LOGO_TRANSPARENT.png")
