from pathlib import Path
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
import math
import random

ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "public" / "images"
OUT_DIR = IMAGE_DIR / "examples"
OUT_DIR.mkdir(parents=True, exist_ok=True)

W, H = 1200, 800

EXAMPLES = [
    ("Balcony Bird Netting", "balcony-netting-vancouver", "Vancouver", "balcony-netting-focused-installation-924.webp", "netting", "Service Example"),
    ("Pigeon Spikes", "pigeon-spikes-burnaby", "Burnaby", "pigeon-spikes-close-up-installation-904.webp", "spikes", "Service Example"),
    ("Balcony Cleaning", "balcony-cleaning-burnaby", "Burnaby", "balcony-cleaning-finished-space-960.webp", "cleaning", "Typical Transformation"),
    ("Pet Netting", "pet-netting-vancouver", "Vancouver", "pet-safe-balcony-cat-netting-960.webp", "netting", "Service Example"),
    ("Commercial Bird Control", "commercial-bird-control-richmond", "Richmond", "pigeon-spike-roofline-focused-802.webp", "spikes", "Bird-Proofing Example"),
    ("Condo Bird Proofing", "condo-bird-proofing-vancouver", "Vancouver", "condo-balcony-netting-focused-742.webp", "netting", "Service Example"),
    ("Warehouse Bird Netting", "warehouse-bird-netting-surrey", "Surrey", "pigeon-defenders-hero-desktop.webp", "netting", "Illustration"),
    ("Solar Panel Bird Protection", "solar-panel-bird-protection-coquitlam", "Coquitlam", "pigeon-spike-roofline-focused-802.webp", "spikes", "Illustration"),
    ("Rooftop Bird Control", "rooftop-bird-control-vancouver", "Vancouver", "pigeon-spike-roofline-focused-802.webp", "spikes", "Bird-Proofing Example"),
    ("High Rise Balcony Netting", "high-rise-balcony-netting-vancouver", "Vancouver", "condo-balcony-netting-focused-742.webp", "netting", "Service Example"),
    ("Window Ledge Spikes", "window-ledge-spikes-new-westminster", "New Westminster", "pigeon-spikes-close-up-installation-904.webp", "spikes", "Bird-Proofing Example"),
    ("Parking Garage Bird Control", "parking-garage-bird-control-delta", "Delta", "pigeon-proof-balcony-before-after-focused-960.webp", "spikes", "Illustration"),
    ("Apartment Bird Netting", "apartment-bird-netting-langley", "Langley", "balcony-netting-focused-installation-924.webp", "netting", "Service Example"),
    ("Commercial Building Protection", "commercial-building-protection-north-vancouver", "North Vancouver", "pigeon-defenders-hero-desktop.webp", "spikes", "Illustration"),
    ("Bird Dropping Cleanup", "bird-dropping-cleanup-vancouver", "Vancouver", "pigeon-proof-balcony-before-after-focused-960.webp", "cleaning", "Typical Transformation"),
]


def cover(path):
    img = Image.open(path).convert("RGB")
    sw, sh = img.size
    scale = max(W / sw, H / sh)
    nw, nh = int(sw * scale), int(sh * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - W) // 2
    top = (nh - H) // 2
    return img.crop((left, top, left + W, top + H))


def add_vignette(img, color=(15, 17, 16), alpha=88):
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    px = overlay.load()
    cx, cy = W / 2, H / 2
    max_d = math.sqrt(cx * cx + cy * cy)
    for y in range(H):
        for x in range(W):
            d = math.sqrt((x - cx) ** 2 + (y - cy) ** 2) / max_d
            a = int(max(0, (d - 0.35) / 0.65) * alpha)
            px[x, y] = (*color, a)
    return Image.alpha_composite(img.convert("RGBA"), overlay)


def draw_pigeon(draw, x, y, s=1.0):
    body = [(x, y), (x + 28 * s, y - 10 * s), (x + 58 * s, y + 3 * s), (x + 26 * s, y + 18 * s)]
    wing = [(x + 18 * s, y - 3 * s), (x + 4 * s, y - 30 * s), (x + 42 * s, y - 10 * s)]
    head = [x + 48 * s, y - 12 * s, x + 69 * s, y + 8 * s]
    draw.polygon(body, fill=(38, 42, 43, 220))
    draw.polygon(wing, fill=(22, 27, 29, 205))
    draw.ellipse(head, fill=(38, 42, 43, 220))
    draw.polygon([(x + 68 * s, y - 3 * s), (x + 82 * s, y + 2 * s), (x + 68 * s, y + 7 * s)], fill=(183, 90, 56, 220))


def draw_droppings(draw, rng, count=36):
    for _ in range(count):
        x = rng.randint(40, W - 70)
        y = rng.randint(int(H * 0.48), H - 50)
        r = rng.randint(3, 11)
        draw.ellipse((x, y, x + r * 2, y + r), fill=(236, 232, 220, rng.randint(130, 220)))
        draw.ellipse((x + r, y + 2, x + r * 3, y + r + 5), fill=(70, 73, 65, rng.randint(50, 105)))


def draw_nesting(draw, rng):
    cx, cy = rng.randint(120, W - 180), rng.randint(int(H * 0.58), H - 130)
    for i in range(22):
        ang = rng.random() * math.tau
        length = rng.randint(34, 92)
        x1 = cx + math.cos(ang) * rng.randint(8, 36)
        y1 = cy + math.sin(ang) * rng.randint(4, 18)
        x2 = x1 + math.cos(ang) * length
        y2 = y1 + math.sin(ang) * length * 0.35
        draw.line((x1, y1, x2, y2), fill=(98, 70, 41, 170), width=rng.randint(2, 5))


def draw_netting(draw):
    spacing = 64
    for x in range(-H, W + H, spacing):
        draw.line((x, 0, x + H, H), fill=(11, 17, 20, 118), width=3)
        draw.line((x, H, x + H, 0), fill=(11, 17, 20, 105), width=3)
    for x in range(-H, W + H, spacing):
        draw.line((x, 0, x + H, H), fill=(255, 255, 255, 46), width=1)


def draw_spikes(draw):
    base_y = int(H * 0.58)
    draw.line((60, base_y, W - 60, base_y), fill=(220, 225, 220, 220), width=9)
    for x in range(80, W - 80, 30):
        lean = 18 if (x // 30) % 2 else -18
        draw.line((x, base_y, x + lean, base_y - 135), fill=(232, 236, 234, 230), width=4)
        draw.line((x, base_y, x - lean, base_y - 110), fill=(232, 236, 234, 210), width=3)


def draw_clean_highlight(draw):
    draw.rounded_rectangle((70, int(H * 0.64), W - 70, H - 72), radius=36, fill=(244, 240, 231, 64), outline=(255, 255, 255, 80), width=2)


def badge(draw, text, side):
    fill = (17, 17, 15, 218) if side == "before" else (183, 90, 56, 225)
    x, y = 36, 36
    draw.rounded_rectangle((x, y, x + 210, y + 54), radius=27, fill=fill)
    draw.text((x + 24, y + 16), text.upper(), fill=(244, 240, 231, 255))


def create_pair(topic, slug, city, base_file, after_type, label):
    rng = random.Random(slug)
    base = cover(IMAGE_DIR / base_file)
    before = ImageEnhance.Color(base).enhance(0.72)
    before = ImageEnhance.Brightness(before).enhance(0.82)
    before = add_vignette(before, alpha=112)
    bd = ImageDraw.Draw(before, "RGBA")
    for i in range(3):
        draw_pigeon(bd, rng.randint(80, W - 180), rng.randint(130, int(H * 0.58)), rng.uniform(0.65, 1.2))
    draw_droppings(bd, rng, 44)
    draw_nesting(bd, rng)
    badge(bd, "Before", "before")
    bd.rounded_rectangle((36, H - 84, min(W - 36, 560), H - 32), radius=26, fill=(17, 17, 15, 190))
    bd.text((58, H - 68), f"{label}: {topic} in {city}", fill=(244, 240, 231, 255))

    after = ImageEnhance.Color(base).enhance(1.04)
    after = ImageEnhance.Contrast(after).enhance(1.05)
    after = ImageEnhance.Brightness(after).enhance(1.06).convert("RGBA")
    ad = ImageDraw.Draw(after, "RGBA")
    if after_type == "netting":
        draw_netting(ad)
    elif after_type == "spikes":
        draw_spikes(ad)
    else:
        draw_clean_highlight(ad)
    badge(ad, "After", "after")
    ad.rounded_rectangle((36, H - 84, min(W - 36, 600), H - 32), radius=26, fill=(17, 17, 15, 170))
    ad.text((58, H - 68), f"{label}: clean protected area", fill=(244, 240, 231, 255))

    before = before.convert("RGB").filter(ImageFilter.UnsharpMask(radius=1.0, percent=70, threshold=3))
    after = after.convert("RGB").filter(ImageFilter.UnsharpMask(radius=1.0, percent=70, threshold=3))
    before.save(OUT_DIR / f"before-{slug}.webp", "WEBP", quality=82, method=6)
    after.save(OUT_DIR / f"after-{slug}.webp", "WEBP", quality=82, method=6)


for example in EXAMPLES:
    create_pair(*example)

print(f"Generated {len(EXAMPLES) * 2} before/after images in {OUT_DIR}")
