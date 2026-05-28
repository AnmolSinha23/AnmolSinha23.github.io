import urllib.request
from PIL import Image
import io
import base64

url = "https://raw.githubusercontent.com/wayou/t-rex-runner/master/assets/default_100_percent/100-offline-sprite.png"
req = urllib.request.Request(url)
with urllib.request.urlopen(req) as response:
    img_data = response.read()

img = Image.open(io.BytesIO(img_data))
# The standard standing dino is at x=848, y=2, w=44, h=47
dino = img.crop((848, 2, 848+44, 2+47))
# running frame 1: 936, 2
# running frame 2: 980, 2
dino_run1 = img.crop((936, 2, 936+44, 2+47))
dino_run2 = img.crop((980, 2, 980+44, 2+47))
cactus1 = img.crop((332, 2, 332+25, 2+50))

def to_b64(i):
    buf = io.BytesIO()
    i.save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode('utf-8')

with open("dino_assets.json", "w") as f:
    import json
    json.dump({
        "stand": to_b64(dino),
        "run1": to_b64(dino_run1),
        "run2": to_b64(dino_run2),
        "cactus": to_b64(cactus1)
    }, f)

print("Assets generated.")
