from docx import Document
import os

def extract_docx_to_html(docx_path, output_dir):
    doc = Document(docx_path)
    html = ['<html><body>']
    img_count = 0
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    for para in doc.paragraphs:
        html.append(f'<p>{para.text}</p>')
    # Extract images
    rels = doc.part.rels
    for rel in rels:
        rel = rels[rel]
        if "image" in rel.target_ref:
            img_count += 1
            img_data = rel.target_part.blob
            img_name = f"img_{img_count}.png"
            img_path = os.path.join(output_dir, img_name)
            with open(img_path, 'wb') as f:
                f.write(img_data)
            html.append(f'<img src="{img_name}" style="max-width:100%">')
    html.append('</body></html>')
    with open(os.path.join(output_dir, 'proof.html'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(html))

if __name__ == "__main__":
    extract_docx_to_html("TheNullLine_2026_v18_FINAL.docx", "public/v18_proof")
