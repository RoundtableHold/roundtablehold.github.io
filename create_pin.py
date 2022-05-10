from PIL import Image
import sys

pin = Image.open('docs/map/icons/edited/marker.png')
pin = pin.convert('RGBA')

pin_data = pin.getdata()
new_pin_data = []
for item in pin_data:
    if item[0] == 0 and item[1] == 0 and item[2] == 0 and item[3] == 255:
        new_pin_data.append((78, 0, 138, 255))
    else:
        new_pin_data.append(item)

pin.putdata(new_pin_data)

icon = Image.open(sys.argv[1])
bbox = icon.getbbox()
icon = icon.crop(bbox)

x = max(icon.size[0], icon.size[1])
scale = x / 321
print(scale)

pin.thumbnail([round(pin.size[0] * scale), round(pin.size[1] * scale)])
pin.paste(icon, (round(63 * scale), round(67 * scale)), icon)

pin.save(sys.argv[2])