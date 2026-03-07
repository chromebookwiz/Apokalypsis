
import re

with open('c:/code/PrimeCross/theory_html_fragment.html', 'r', encoding='utf-8') as f:
    new_content = f.read()

index_path = 'c:/code/PrimeCross/index.html'
with open(index_path, 'r', encoding='utf-8') as f:
    index_content = f.read()

# Replace the content inside <article id="theory-article" ...> ... </article>
# We need to be careful with the opening tag attributes
pattern = r'(<article id="theory-article"[^>]*>).*?(</article>)'
# Use re.DOTALL to match across multiple lines
new_index_content = re.sub(pattern, r'\1\n' + new_content + r'\n\2', index_content, flags=re.DOTALL)

# Also update the download links in the rest of the file
new_index_content = new_index_content.replace('./unified_v15_definitive.docx', './thenullline_2026_v5.docx')
new_index_content = new_index_content.replace('DOWNLOAD UNIFIED_V15.DOCX', 'DOWNLOAD THENULLLINE_2026_V5.DOCX')
new_index_content = new_index_content.replace('./revision_notes_v16.txt', './thenullline_2026_v5.pdf') # User mentioned pdf/docx usually
new_index_content = new_index_content.replace('DOWNLOAD V16_REVISIONS.TXT', 'DOWNLOAD THE_NULL_LINE.PDF')

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(new_index_content)
