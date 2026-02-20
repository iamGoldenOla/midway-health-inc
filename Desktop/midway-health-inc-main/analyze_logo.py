from PIL import Image
import collections

def analyze_image(path):
    try:
        img = Image.open(path).convert("RGBA")
        width, height = img.size
        print(f"Dimensions: {width}x{height}")
        
        pixels = img.load()
        
        # Analyze colors (simplified)
        colors = collections.Counter()
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                if a > 50: # Only visible pixels
                    # Quantize slightly to group similar colors
                    k = (r//10*10, g//10*10, b//10*10)
                    colors[k] += 1
        
        print("\nTop 10 Colors (R, G, B):")
        for c, count in colors.most_common(10):
            print(f"{c}: {count}")

        # Find vertical extents
        rows_with_pixels = []
        for y in range(height):
            has_pixel = False
            for x in range(width):
                if pixels[x, y][3] > 50:
                    has_pixel = True
                    break
            if has_pixel:
                rows_with_pixels.append(y)
        
        if rows_with_pixels:
            print(f"\nVisible Content range Y: {min(rows_with_pixels)} to {max(rows_with_pixels)}")
            
            # Detect gaps?
            last_y = min(rows_with_pixels)
            gaps = []
            current_gap_start = -1
            
            for y in range(min(rows_with_pixels), max(rows_with_pixels) + 1):
                has_pixel = y in rows_with_pixels
                
                if not has_pixel and current_gap_start == -1:
                    current_gap_start = y
                elif has_pixel and current_gap_start != -1:
                    gaps.append((current_gap_start, y - 1))
                    current_gap_start = -1
            
            print(f"Vertical Gaps found: {gaps}")

    except Exception as e:
        print(f"Error: {e}")

analyze_image("src/assets/MIDWAY_HEALTH_INC_LOGO_TRANSPARENT.png")
