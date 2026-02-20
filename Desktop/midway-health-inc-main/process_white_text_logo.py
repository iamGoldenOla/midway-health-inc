from PIL import Image
import numpy as np

def refine_light_logo(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        pixels = img.load()

        # 1. Analyze Vertical Density to find the Slogan
        # We look for a gap of transparent pixels separating the main logo (top) from the slogan (bottom).
        
        row_density = []
        for y in range(height):
            non_transparent_count = 0
            for x in range(width):
                if pixels[x, y][3] > 10:  # Check alpha
                    non_transparent_count += 1
            row_density.append(non_transparent_count)

        # Heuristic:
        # Find the last "block" of text.
        # Iterate backwards from bottom. Find first non-empty block (slogan).
        # Then find the empty gap above it.
        
        split_y = height  # Default to no split
        
        # Scan from bottom up
        in_slogan = False
        for y in range(height - 1, 0, -1):
            has_pixels = row_density[y] > 5 # Noise threshold
            
            if not in_slogan:
                if has_pixels:
                    in_slogan = True # Found bottom of slogan
            else:
                if not has_pixels:
                    # Found the gap above slogan!
                    split_y = y + 1 # Start of slogan block
                    break
        
        print(f"Detected Slogan starting at row: {split_y} (Image Height: {height})")

        # 2. Process Pixels
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                
                if a == 0: continue # Skip transparent

                if y >= split_y:
                    # IN SLOGAN AREA: Make it White
                    # Only affect visible pixels
                    pixels[x, y] = (255, 255, 255, a)
                else:
                    # IN MAIN LOGO AREA: Preserve EXACTLY
                    # This ensures "Midway", "Health", "Inc", Icon and their shadows remain sharp and colored.
                    pass 

        img.save(output_path, "PNG")
        print(f"Successfully saved refined light logo to {output_path}")

    except Exception as e:
        print(f"Error processing image: {e}")

# Use the TRANSPARENT version as input source to keep edges clean
input_file = "src/assets/MIDWAY_HEALTH_INC_LOGO_TRANSPARENT.png" 
output_file = "src/assets/MIDWAY_LOGO_LIGHT.png" # Overwrite correctly

refine_light_logo(input_file, output_file)
