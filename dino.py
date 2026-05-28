import urllib.request
import base64
url = "https://raw.githubusercontent.com/chromium/chromium/main/components/neterror/resources/images/default_100_percent/offline/100-offline-sprite.png"
try:
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as response:
        img_data = response.read()
        b64 = base64.b64encode(img_data).decode('utf-8')
        print(f"data:image/png;base64,{b64[:100]}...")
        with open('dino_b64.txt', 'w') as f:
            f.write(f"data:image/png;base64,{b64}")
except Exception as e:
    print(e)
