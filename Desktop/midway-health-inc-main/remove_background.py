from PIL import Image
import os

def remove_background(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()

        newData = []
        for item in datas:
            # Check if pixel is white (or close to white)
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully saved transparent logo to {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")

input_file = "src/assets/MIDWAY_HEALTH_INC_LOGO.png"
output_file = "src/assets/MIDWAY_HEALTH_INC_LOGO_TRANSPARENT.png"

if os.path.exists(input_file):
    remove_background(input_file, output_file)
else:
    print(f"Input file not found: {input_file}")
