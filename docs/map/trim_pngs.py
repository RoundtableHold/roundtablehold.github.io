from PIL import Image
import sys
import os

for root, dirs, files in os.walk(sys.argv[1]):
    for name in files:
        if name.endswith('.png'):
            # Open the icon
            icon = Image.open(os.path.join(root, name))
            icon = icon.convert('RGBA')

            # Replace anything with alpha < 200 with full transparency for a tighter crop coming up
            icon_data = icon.getdata()
            new_icon_data = []
            for item in icon_data:
                if item[3] < 20:
                    new_icon_data.append((0, 0, 0, 0))
                else:
                    # new_icon_data.append((item[0], item[1], item[2], 255))
                    new_icon_data.append(item)
            icon.putdata(new_icon_data)

            # Crop to content
            # bbox = icon.getbbox()
            # icon = icon.crop(bbox)
            os.makedirs(os.path.join('temp', root), 511, True)
            icon.save(os.path.join('temp', root, name))