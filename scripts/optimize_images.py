import os
import shutil
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARDS_DIR = os.path.join(BASE_DIR, 'frontend', 'public', 'cards')
TOPICS_DIR = os.path.join(BASE_DIR, 'frontend', 'public', 'topics')
BACKUP_DIR = os.path.join(BASE_DIR, '.image_backups')

os.makedirs(BACKUP_DIR, exist_ok=True)

def optimize_directory(directory, label):
    print(f"\n=== Optimizando {label} ({directory}) ===")
    total_orig = 0
    total_opt = 0
    count = 0

    for fname in sorted(os.listdir(directory)):
        if not fname.lower().endswith(('.jpg', '.jpeg')):
            continue

        fpath = os.path.join(directory, fname)
        orig_size = os.path.getsize(fpath)
        total_orig += orig_size

        # Backup original
        backup_path = os.path.join(BACKUP_DIR, f"{label}_{fname}")
        if not os.path.exists(backup_path):
            shutil.copy2(fpath, backup_path)

        try:
            with Image.open(fpath) as img:
                # Convert RGBA or Palette to RGB if needed
                if img.mode in ('RGBA', 'P', 'LA'):
                    img = img.convert('RGB')

                # Resize if larger than 800x800
                w, h = img.size
                max_dim = 800
                if w > max_dim or h > max_dim:
                    if w > h:
                        new_w = max_dim
                        new_h = int(h * (max_dim / w))
                    else:
                        new_h = max_dim
                        new_w = int(w * (max_dim / h))
                    img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

                # Save progressive optimized JPEG
                img.save(fpath, 'JPEG', quality=82, optimize=True, progressive=True)

            opt_size = os.path.getsize(fpath)
            total_opt += opt_size
            count += 1
            savings = round((1 - opt_size / orig_size) * 100)
            if orig_size > 150_000:
                print(f"  ✓ {fname:25}: {orig_size//1024} KB -> {opt_size//1024} KB (-{savings}%)")
        except Exception as e:
            print(f"  ✗ Error con {fname}: {e}")

    saved_mb = round((total_orig - total_opt) / (1024 * 1024), 2)
    pct = round((1 - total_opt / total_orig) * 100) if total_orig > 0 else 0
    print(f"\nResumen {label}: {count} imágenes")
    print(f"  Original: {round(total_orig/(1024*1024), 2)} MB")
    print(f"  Optimizado: {round(total_opt/(1024*1024), 2)} MB")
    print(f"  Ahorro: {saved_mb} MB ({pct}% de reducción)")

if __name__ == '__main__':
    optimize_directory(CARDS_DIR, 'cards')
    optimize_directory(TOPICS_DIR, 'topics')
