import os
import sys
import zipfile
import shutil

SOURCE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
LOCAL_ZIP = os.path.join(SOURCE_DIR, "SMART-VOTING-SYSTEM(PROJECT-3).zip")
DESKTOP_ZIP = r"C:\Users\shaik\OneDrive\Desktop\SMART-VOTING-SYSTEM(PROJECT-3).zip"

EXCLUDE_DIRS = {
    'node_modules',
    '.vscode',
    '.idea',
    'coverage',
    'dist'
}

EXCLUDE_EXTENSIONS = {
    '.log',
    '.DS_Store'
}

def should_exclude(rel_path):
    parts = rel_path.replace('\\', '/').split('/')
    for part in parts:
        if part in EXCLUDE_DIRS:
            return True
    filename = parts[-1]
    if filename.startswith('.env'):
        return True
    if filename.endswith('.zip'):
        return True
    ext = os.path.splitext(filename)[1].lower()
    if ext in EXCLUDE_EXTENSIONS:
        return True
    return False

def package_zip():
    print("==================================================")
    print("  VoteSphere Packaging Distribution ZIP")
    print("==================================================")
    print(f"Source Directory: {SOURCE_DIR}")
    print(f"Local Target:     {LOCAL_ZIP}")
    print(f"Desktop Target:   {DESKTOP_ZIP}")

    if os.path.exists(LOCAL_ZIP):
        try:
            os.remove(LOCAL_ZIP)
        except Exception:
            pass

    file_count = 0
    git_count = 0

    with zipfile.ZipFile(LOCAL_ZIP, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        for dirpath, dirnames, filenames in os.walk(SOURCE_DIR):
            rel_dir = os.path.relpath(dirpath, SOURCE_DIR)
            if rel_dir != '.':
                if should_exclude(rel_dir):
                    dirnames[:] = []
                    continue

            for f in filenames:
                full_path = os.path.join(dirpath, f)
                rel_path = os.path.relpath(full_path, SOURCE_DIR)
                if should_exclude(rel_path):
                    continue

                # POSIX '/' separator
                arcname = rel_path.replace('\\', '/')
                zf.write(full_path, arcname)
                file_count += 1
                if arcname.startswith('.git/'):
                    git_count += 1

    size_mb = os.path.getsize(LOCAL_ZIP) / (1024 * 1024)
    print(f"Local ZIP generated: {size_mb:.2f} MB ({file_count} files, {git_count} git files)")

    # Also copy to Desktop target for maximum convenience
    try:
        shutil.copy2(LOCAL_ZIP, DESKTOP_ZIP)
        print(f"Desktop ZIP generated: {DESKTOP_ZIP}")
    except Exception as e:
        print(f"Note copying to Desktop: {e}")

    print("==================================================")
    print("  Packaging Complete!")
    print("==================================================")

if __name__ == '__main__':
    package_zip()
