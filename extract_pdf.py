import sys

try:
    import pypdf
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])
    import pypdf

def extract_pdf(filepath):
    try:
        reader = pypdf.PdfReader(filepath)
        text = ''
        for page in reader.pages:
            text += page.extract_text() + '\n'
        return text
    except Exception as e:
        return f"Error reading PDF: {e}"

print("=== MOBILE PERFORMANCE ===")
print(extract_pdf(r"C:\Users\WELCOME\Downloads\performance_mobile.pdf"))
print("\n\n=== DESKTOP PERFORMANCE ===")
print(extract_pdf(r"C:\Users\WELCOME\Downloads\performance_Desktop.pdf"))
