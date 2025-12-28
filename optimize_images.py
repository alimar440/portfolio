import os
from PIL import Image

def optimize_images(root_dir, max_width=1200):
    print(f"Scanning {root_dir}...")
    
    extensions = ('.png', '.jpg', '.jpeg')
    
    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            if file.lower().endswith(extensions):
                file_path = os.path.join(subdir, file)
                try:
                    with Image.open(file_path) as img:
                        # Resize if too large
                        width, height = img.size
                        if width > max_width:
                            print(f"[RESIZING] {file}: {width}px -> {max_width}px")
                            ratio = max_width / width
                            new_height = int(height * ratio)
                            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                            
                            # Save back the resized original
                            img.save(file_path, optimize=True, quality=85)
                            print(f"[SAVED] {file} optimized.")
                        
                        # Convert to WebP
                        webp_path = os.path.splitext(file_path)[0] + '.webp'
                        if not os.path.exists(webp_path):
                            print(f"[CONVERTING] {file} -> .webp")
                            img.save(webp_path, 'WEBP', quality=80)
                        
                except Exception as e:
                    print(f"[ERROR] Could not process {file}: {e}")

if __name__ == "__main__":
    optimize_images("images/projects")
