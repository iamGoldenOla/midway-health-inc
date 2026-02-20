from PIL import Image

def create_final_logo(input_path, output_path):
    try:
        # Load the TRANSPARENT original image
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        pixels = img.load()
        
        # Based on density analysis, the slogan starts around Y=219.
        SPLIT_Y = 219
        GAP_START = 200
        GAP_END = 218
        
        print(f"Processing image {width}x{height}. Gap: {GAP_START}-{GAP_END}. Split: {SPLIT_Y}")

        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                
                if a == 0: continue # Skip transparent

                if GAP_START <= y <= GAP_END:
                    # GAP AREA: Erase (Make Transparent) to remove shadows/traces
                    pixels[x, y] = (0, 0, 0, 0)
                elif y >= SPLIT_Y:
                    # SLOGAN AREA: Force White
                    pixels[x, y] = (255, 255, 255, a)
                else:
                    # MAIN LOGO AREA: Keep Original
                    pass

        img.save(output_path, "PNG")
        print(f"Successfully saved final logo to {output_path}")

    except Exception as e:
        print(f"Error processing image: {e}")

input_file = "src/assets/MIDWAY_HEALTH_INC_LOGO_TRANSPARENT.png" 
output_file = "src/assets/MIDWAY_LOGO_LIGHT.png" # Overwrite with correct version

create_final_logo(input_file, output_file)
