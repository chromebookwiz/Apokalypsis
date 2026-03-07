import zipfile
import xml.etree.ElementTree as ET
import os
import sys

# Ensure stdout uses UTF-8
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        # Fallback for older python versions if needed, though they shouldn't hit this
        pass

docx_path = r'c:\code\PrimeCross\TheNullLine_2026_v5.docx'
output_path = r'c:\code\PrimeCross\extracted_theory.txt'

if not os.path.exists(docx_path):
    print(f"Error: {docx_path} does not exist.")
    exit(1)

with zipfile.ZipFile(docx_path, 'r') as zip_ref:
    xml_content = zip_ref.read('word/document.xml')
    tree = ET.fromstring(xml_content)
    
    # Namespaces
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    
    paragraphs = []
    for p in tree.findall('.//w:p', ns):
        texts = [t.text for t in p.findall('.//w:t', ns) if t.text]
        if texts:
            paragraphs.append("".join(texts))
    
    content = "\n".join(paragraphs)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Success: Content written to {output_path}")
