
import os

index_path = 'c:/code/PrimeCross/index.html'
with open(index_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the last line that looks like a reference or end of theory
# Or just find where </body> is and fix it.
# We want to insert before </body>

article_content = """
  <div style="margin-top: 3em; padding-top: 2em; border-top: 1px solid rgba(212, 175, 55, 0.3); text-align: center;">
    <h3 style="color:#d4af37; margin-bottom: 1em;">DOWNLOAD THE FULL PAPER</h3>
    <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
      <a href="./thenullline_2026_v5.docx" download="thenullline_2026_v5.docx" style="color: #d4af37; text-decoration: none; border: 1px solid #d4af37; padding: 10px 20px; border-radius: 5px; background: rgba(212, 175, 55, 0.1); transition: all 0.3s ease;">DOWNLOAD DOCX (V5)</a>
      <a href="./thenullline_2026_v5.pdf" download="thenullline_2026_v5.pdf" style="color: #d4af37; text-decoration: none; border: 1px solid #d4af37; padding: 10px 20px; border-radius: 5px; background: rgba(212, 175, 55, 0.1); transition: all 0.3s ease;">DOWNLOAD PDF (V5)</a>
    </div>
  </div>
"""

# Re-construct the file from the article start if possible, or just fix the end.
# Since I know the article content was mostly correct until the end.

new_lines = []
for line in lines:
    if '</body>' in line:
        # Before body, ensure article is closed and links are added
        # Check if </article> is missing
        article_found = False
        for l in new_lines[-50:]:
            if '</article>' in l:
                article_found = True
                break
        
        if not article_found:
            new_lines.append(article_content + "\n</article>\n")
        new_lines.append(line)
    else:
        new_lines.append(line)

with open(index_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
