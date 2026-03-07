
import sys
try:
    from docx import Document
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "python-docx"])
    from docx import Document

def extract_theory_v7(docx_path, output_txt, output_html):
    doc = Document(docx_path)
    full_text = []
    html_fragments = []
    
    for para in doc.paragraphs:
        text = para.text.strip()
        if not text:
            continue
            
        full_text.append(text)
        
        # Safe style access
        style_name = para.style.name if para.style else ""
        
        # Simple HTML mapping
        if style_name.startswith('Heading 1'):
            html_fragments.append(f'<h1 style="color:#d4af37;text-align:center;font-size:2.5rem;margin-top:2em;margin-bottom:1em">{text}</h1>')
        elif style_name.startswith('Heading 2'):
            html_fragments.append(f'<h2 style="color:#d4af37;text-align:center;font-size:1.8rem;margin-top:2em;margin-bottom:1em">{text}</h2>')
        elif style_name.startswith('Heading 3'):
            html_fragments.append(f'<h3 style="color:#d4af37;margin-top:1.5em;margin-bottom:0.5em">{text}</h3>')
        else:
            html_fragments.append(f'<p style="margin-bottom:1em;line-height:1.6;color:rgba(255,255,255,0.9)">{text}</p>')
            
    with open(output_txt, 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(full_text))
        
    with open(output_html, 'w', encoding='utf-8') as f:
        f.write('\n'.join(html_fragments))

if __name__ == "__main__":
    extract_theory_v7(
        'c:/code/PrimeCross/TheNullLine_2026_v7_FinalEvaluation.docx',
        'c:/code/PrimeCross/theory_v7.txt',
        'c:/code/PrimeCross/theory_v7_fragment.html'
    )
