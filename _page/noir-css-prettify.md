
<title>CSS Prettify Noir</title>
<style>
body {
  background: #0f0f0f;
  color: #e6e6e6;
  font-family: sans-serif;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h1 {
  font-size: 28px;
  letter-spacing: 2px;
  color: #ff3366;
  text-shadow: 0 0 12px #ff3366;
  margin-bottom: 25px;
}

textarea {
  width: 100%;
  height: 180px;
  background: #1a1a1a;
  color: #f8f8f8;
  border: 1px solid #333;
  padding: 12px;
  border-radius: 6px;
  font-size: 15px;
  line-height: 1.5;
  resize: vertical;
}

textarea:focus {
  outline: none;
  border: 1px solid #ff3366;
  box-shadow: 0 0 8px #ff3366;
}

/* OUTPUT AREA */
.output {
  margin-top: 20px;
}

.output textarea {
  height: 180px;
  background: #151515;
  border: 1px solid #444;
}

/* BUTTONS */
button {
  margin-top: 15px;
  background: #ff3366;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  display: inline-block;
  transition: all 0.4s ease;
}

button:hover {
  background: #ff4d80;
  box-shadow: 0 0 20px #ff3366;
}

.copy-btn, .minify-btn {
  margin-left: 10px;
  background: #222;
  box-shadow: none;
}

.copy-btn:hover, .minify-btn:hover {
  border-color: #ff3366;
}

</style>

<div class="container">
  <h1>CSS PRETTIFY — NOIR</h1>

  <textarea id="input" placeholder="Paste CSS here..."></textarea>

  <div class="output">
    <textarea id="output" readonly placeholder="Output..."></textarea>
  </div>

<button onclick="prettifyCSS()">Prettify</button>
<button class="minify-btn" onclick="minifyCSS()">Minify</button>
<button class="copy-btn" onclick="copyOutput(this)">Copy</button>
</div>

<script>
function prettifyCSS() {
  const css = document.getElementById("input").value;

  let formatted = css
    // Tambah spasi setelah ":" jika belum ada
    .replace(/:\s*/g, ": ")
    .replace(/;\s*/g, ";\n")
    .replace(/\s*{\s*/g, " {\n")
    .replace(/}\s*/g, "\n}\n")
    .replace(/\n\s*\n+/g, "\n")
    .trim();

  let indent = 0;
  let lines = formatted.split("\n");
  let output = [];

  for (let line of lines) {
    const trimmed = line.trim();

    if (trimmed.endsWith("}")) indent--;

    output.push("  ".repeat(Math.max(indent, 0)) + trimmed);

    if (trimmed.endsWith("{")) indent++;

    if (trimmed.endsWith("}")) output.push("");
  }

  if (output[output.length - 1] === "") output.pop();

  document.getElementById("output").value = output.join("\n");
}

function minifyCSS() {
  let css = document.getElementById("input").value;

  let min = css
    // hapus komentar  /* ... */
    .replace(/\/\*[\s\S]*?\*\//g, "")
    // hapus newline dan tab
    .replace(/\n|\r|\t/g, "")
    // hapus spasi berlebih
    .replace(/\s+/g, " ")
    // hilangkan spasi sebelum karakter penting
    .replace(/\s*{\s*/g, "{")
    .replace(/\s*}\s*/g, "}")
    .replace(/\s*:\s*/g, ":")
    .replace(/\s*;\s*/g, ";")
    .replace(/;}/g, "}") // hapus ; terakhir dalam block
    .trim();

  document.getElementById("output").value = min;
}

function copyOutput(btn) {
  const text = document.getElementById("output").value;

  navigator.clipboard.writeText(text).then(() => {

    const originalHTML = btn.innerHTML;

    btn.innerHTML = "Copied";

    // kembalikan setelah 2 detik
    setTimeout(() => {
      btn.innerHTML = originalHTML;
    }, 2000);

  }).catch(() => {
    const out = document.getElementById("output");
    out.select();
    document.execCommand("copy");
  });
}
</script>
