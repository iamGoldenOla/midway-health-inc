from PIL import Image

def process_slogan_final(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        pixels = img.load()
        
        # calculate row density (number of non-transparent pixels per row)
        densities = []
        for y in range(height):
            count = 0
            for x in range(width):
                if pixels[x, y][3] > 0:
                    count += 1
            densities.append(count)
            
        # Debug: print densities for visual inspection (condensed)
        # We expect a pattern like: [Logo High Density] -> [Dip/Gap] -> [Slogan Medium Density]
        
        # heuristic: finding the split point
        # The slogan is at the bottom.
        # It's likely separated from the main logo by a row with FEWER pixels (not necessarily zero).
        
        # Look at the bottom 40% of the image
        search_start = int(height * 0.6)
        min_density = width
        split_y = height
        
        # Find the local minimum in the bottom section
        # But we need to find the "valley" between two "peaks" (Logo and Slogan)
        
        # Simple approach: Find the row with the minimum pixel count in the range [60% -> 90% height]
        # visible_rows = [y for y, d in enumerate(densities) if d > 0]
        # if not visible_rows: return
        
        # Scan from search_start down to find the separation
        # We are looking for a minimum that is significantly lower than the slogan average
        
        # Let's try to find the "start" of the slogan block from the bottom up.
        # Go from bottom up until we hit a "gap" (low density)
        
        slogan_bottom = -1
        slogan_top = -1
        
        # 1. Find bottom of slogan (last visible row)
        for y in range(height - 1, int(height * 0.5), -1):
            if densities[y] > 5:
                slogan_bottom = y
                break
                
        if slogan_bottom == -1:
            print("Could not find bottom of slogan")
            return

        # 2. Find top of slogan (go up until density drops significantly)
        # We expect a gap/dip before the main logo starts
        
        # Check standard gap
        for y in range(slogan_bottom, int(height * 0.5), -1):
             if densities[y] < 5: # Almost empty row
                 slogan_top = y + 1
                 break
        
        # If no hard gap found, look for local minimum
        if slogan_top == -1:
             print("No hard gap found, looking for density dip...")
             min_d = width
             min_y = -1
             for y in range(slogan_bottom, int(height * 0.5), -1):
                 if densities[y] < min_d:
                     min_d = densities[y]
                     min_y = y
                 # If we see density spike up again (moving into main logo), we passed the valley
                 if densities[y] > min_d + 20: 
                     slogan_top = min_y + 1
                     break
        
        if slogan_top == -1:
             # Fallback: Assume slogan is bottom 20% if clear separation failed
             slogan_top = int(height * 0.75)
             print(f"Fallback split at {slogan_top}")
        else:
             print(f"Detected Slogan range: Y={slogan_top} to Y={slogan_bottom}")

        # Apply whitening only to slogan range
        for y in range(slogan_top, height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                if a > 0:
                    # Make it white
                    pixels[x, y] = (255, 255, 255, a)
                    
        img.save(output_path, "PNG")
        print(f"Saved to {output_path}")

    except Exception as e:
        print(f"Error: {e}")

input_file = "src/assets/MIDWAY_HEALTH_INC_LOGO_TRANSPARENT.png" 
output_file = "src/assets/MIDWAY_LOGO_LIGHT.png" # Overwrite

process_slogan_final(input_file, output_file)
