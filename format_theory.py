
with open('c:/code/PrimeCross/extracted_theory.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

html_content = ""
for line in lines:
    line = line.strip()
    if not line:
        html_content += "<br />\n"
        continue
    
    # Handle headers
    if line.startswith('I.') or line.startswith('II.') or line.startswith('III.') or line.startswith('IV.') or line.startswith('V.') or line.startswith('VI.') or line.startswith('VII.') or line.startswith('VIII.') or line.startswith('IX.'):
        html_content += f'<h3 style="color:#d4af37;margin-top:1.5em;margin-bottom:0.5em">{line}</h3>\n'
    elif line.isupper() and len(line) > 5:
        # Probable header if all caps and long enough
        html_content += f'<h2 style="color:#d4af37;text-align:center;font-size:1.8rem;margin-top:2em;margin-bottom:1em">{line}</h2>\n'
    else:
        # Escape HTML entities
        line = line.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        html_content += f'<p style="margin-bottom:1em;line-height:1.6;color:rgba(255,255,255,0.9)">{line}</p>\n'

with open('c:/code/PrimeCross/theory_html_fragment.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
