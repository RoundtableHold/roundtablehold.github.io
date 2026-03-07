import os
import re

theme_dir = "docs/css/themes"
themes = {}

for root, _, files in os.walk(theme_dir):
    for file in files:
        if file == "bootstrap.min.css":
            theme_name = os.path.basename(root)
            filepath = os.path.join(root, file)
            with open(filepath, "r") as f:
                content = f.read()
                # Find body background and color
                bg_match = re.search(r'--bs-body-bg:(.*?);', content)
                color_match = re.search(r'--bs-body-color:(.*?);', content)
                
                # Some themes might define body{} directly instead of vars
                if not bg_match:
                    bg_match = re.search(r'body\{[^\}]*background-color:(.*?)[;\}]', content)
                if not color_match:
                    color_match = re.search(r'body\{[^\}]*color:(.*?)[;\}]', content)

                bg = bg_match.group(1).split('}')[0] if bg_match else "#ffffff"
                color = color_match.group(1).split('}')[0] if color_match else "#212529"
                
                themes[theme_name] = {"bg": bg, "color": color}

print("theme_colors = {")
for theme, colors in sorted(themes.items()):
    # Capitalize appropriately to match generate.py keys
    key = theme.capitalize()
    if key == "Lightmode": key = "LightMode"
    print(f'        "{key}": {{"bg": "{colors["bg"]}", "color": "{colors["color"]}"}},')
print('        "Standard": {"bg": "#ffffff", "color": "#212529"}')
print("}")
