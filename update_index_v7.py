
import re

with open('c:/code/PrimeCross/theory_v7_fragment.html', 'r', encoding='utf-8') as f:
    new_content = f.read()

index_path = 'c:/code/PrimeCross/index.html'
with open(index_path, 'r', encoding='utf-8') as f:
    index_content = f.read()

# Replace the content inside <article id="theory-article" ...> ... </article>
# We replace the content between the opening tag and the closing tag
pattern = r'(<article id="theory-article"[^>]*>).*?(</article>)'
new_index_content = re.sub(pattern, r'\1\n' + new_content + r'\n\2', index_content, flags=re.DOTALL)

# Update metadata/JSON-LD
new_index_content = new_index_content.replace('Apokalypsis: THE NULL LINE', 'Apokalypsis: THE NULL LINE v7')

# Update download links
new_index_content = new_index_content.replace('thenullline_2026_v5.docx', 'thenullline_2026_v7.docx')
new_index_content = new_index_content.replace('thenullline_2026_v5.pdf', 'thenullline_2026_v7.pdf')
new_index_content = new_index_content.replace('DOWNLOAD DOCX (V5)', 'DOWNLOAD DOCX (V7)')
new_index_content = new_index_content.replace('DOWNLOAD PDF (V5)', 'DOWNLOAD PDF (V7)')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(new_index_content)
