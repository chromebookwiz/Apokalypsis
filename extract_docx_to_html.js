import mammoth from "mammoth";
import fs from "fs";

// Usage: node extract_docx_to_html.js <input.docx> <output.html>
const [,, inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
    console.error("Usage: node extract_docx_to_html.js <input.docx> <output.html>");
    process.exit(1);
}

mammoth.convertToHtml({path: inputPath})
    .then(function(result){
        fs.writeFileSync(outputPath, result.value, "utf8");
        console.log("HTML extracted to " + outputPath);
    })
    .catch(function(err){
        console.error("Error extracting docx:", err);
        process.exit(1);
    });
