from io import BytesIO
from pathlib import Path
from urllib.request import urlopen

from PIL import Image, ImageOps

ASSETS = [
    ("https://i.postimg.cc/6pX9sbrq/imagem-2026-08-09-134241000.png", "product-mockup.webp", 1200),
    ("https://i.postimg.cc/brszvv8B/imagem-2026-08-09-190742535.png", "carousel/page-01.webp", 520),
    ("https://i.postimg.cc/jSVssK1F/imagem-2026-08-09-190831820.png", "carousel/page-02.webp", 520),
    ("https://i.postimg.cc/0jMssH0g/imagem-2026-08-09-190922753.png", "carousel/page-03.webp", 520),
    ("https://i.postimg.cc/pdWMTdJ5/imagem-2026-08-09-191014374.png", "carousel/page-04.webp", 520),
    ("https://i.postimg.cc/2js654bF/imagem-2026-08-09-191112279.png", "carousel/page-05.webp", 520),
    ("https://i.postimg.cc/X7KV7t6H/imagem-2026-08-09-191304973.png", "carousel/page-06.webp", 520),
    ("https://i.postimg.cc/2yQfyLMW/imagem-2026-08-09-191424358.png", "carousel/page-07.webp", 520),
    ("https://i.postimg.cc/5tDcmmMC/imagem-2026-08-09-191645610.png", "carousel/page-08.webp", 520),
    ("https://i.postimg.cc/90Vnx8gp/imagem-2026-08-09-192007445.png", "carousel/page-09.webp", 520),
    ("https://i.postimg.cc/28kthtBt/imagem-2026-08-09-192049629.png", "carousel/page-10.webp", 520),
    ("https://i.postimg.cc/CxWJPrzS/imagem-2026-08-09-192430121.png", "bonus-01.webp", 640),
    ("https://i.postimg.cc/V6stDXBc/imagem-2026-08-09-192742900.png", "bonus-02.webp", 640),
    ("https://i.postimg.cc/Y2GZtPWL/imagem-2026-08-09-195504993.png", "bonus-03.webp", 640),
    ("https://i.postimg.cc/9fkbSW1z/imagem-2026-08-09-195732014.png", "bonus-04.webp", 640),
    ("https://i.postimg.cc/8Cxd4Zzg/imagem-2026-08-09-200011582.png", "bonus-05.webp", 640),
]

output_root = Path(__file__).resolve().parents[1] / "public" / "assets"

for url, relative_output, max_width in ASSETS:
    with urlopen(url, timeout=30) as response:
        source = response.read()
    image = ImageOps.exif_transpose(Image.open(BytesIO(source)))
    image.thumbnail((max_width, 10000), Image.Resampling.LANCZOS)
    if image.mode not in ("RGB", "RGBA"):
        image = image.convert("RGBA" if "transparency" in image.info else "RGB")
    output = output_root / relative_output
    output.parent.mkdir(parents=True, exist_ok=True)
    image.save(output, "WEBP", quality=78, method=6)
    print(f"{relative_output}: {image.width}x{image.height}")
