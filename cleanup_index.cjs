const fs = require('fs');

// Read the original index.html
const indexContent = fs.readFileSync('index.html', 'utf8');
const lines = indexContent.split('\n');

// Read the detailed theory text
const theoryText = fs.readFileSync('detailed_theory.txt', 'utf8');

// Format the theory text into HTML
const formattedTheory = theoryText.split('\n').map(l => {
  l = l.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
  if (l === '') return '<br/>';

  // Headers
  if (l.match(/^[\d\.]+\s[A-Z]/) || l.match(/^(Abstract|References|End of Paper|Figure 1|Conjecture|Theorem|Corollary|Lemma|Remark)/)) {
    return `<h3 style="color:#d4af37;margin-top:1.5em;margin-bottom:0.5em">${l}</h3>`;
  }

  // Regular text
  return `<p style="margin-bottom:1em;line-height:1.6;color:rgba(255,255,255,0.9)">${l}</p>`;
}).join('\n');

// Construct the new article
const newArticle = `
  <article id="theory-article" style="display:none;padding:40px;background:#000;color:#fff;font-family:'Times New Roman', serif;max-width:900px;margin:0 auto;box-shadow:0 0 50px rgba(0,0,0,0.8);border:1px solid rgba(212,175,55,0.2)">
    <h1 style="color:#d4af37;text-align:center;margin-bottom:0.5em;font-size:2.4rem;text-transform:uppercase;letter-spacing:1px">Curvature Semipositivity of the Twisted Euler Product Connection</h1>
    <h2 style="color:#d4af37;text-align:center;font-size:1.2rem;opacity:0.8;margin-bottom:3em;font-style:italic">A Unified Geometric Framework for the Millennium Problems<br />Nathan Noll — 2026</h2>
    
    ${formattedTheory}
    
    <div style="margin-top:4em;border-top:2px solid #d4af37;padding-top:2em;text-align:center">
        <h3 style="color:#d4af37;margin-bottom:1.5em;text-transform:uppercase;letter-spacing:2px">Official Document Downloads</h3>
        <div style="display:flex;justify-content:center;gap:20px;flex-wrap:wrap">
            <a href="./unified_v7.docx" download style="color:#000;background:#d4af37;text-decoration:none;font-weight:bold;padding:15px 30px;border-radius:2px;display:inline-block;transition:all 0.3s ease;box-shadow:0 4px 15px rgba(212,175,55,0.3)">DOWNLOAD UNIFIED_V7.DOCX</a>
            <a href="./unified_v7.zip" download style="color:#d4af37;background:transparent;text-decoration:none;font-weight:bold;padding:15px 30px;border-radius:2px;border:2px solid #d4af37;display:inline-block;transition:all 0.3s ease">DOWNLOAD UNIFIED_V7.ZIP</a>
        </div>
        <p style="color:rgba(212,175,55,0.6);font-size:0.8rem;margin-top:2em">© 2026 Nathan Noll. All rights reserved.</p>
    </div>
  </article>
`;

// Insert the new article into the original index.html structure
// We keep everything before line 193
const header = lines.slice(0, 192).join('\n');
const footer = '\n</body>\n</html>';

const finalContent = header + '\n' + newArticle + footer;

fs.writeFileSync('index.html', finalContent);
console.log('Successfully updated index.html');
