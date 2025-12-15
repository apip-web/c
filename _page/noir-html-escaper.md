---
layout: default
title: HTML ESCAPER — NOIR
---
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
  margin: 25px auto;
  font-variation-settings: "wght" 750, "opsz" 72;
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

.output {
  margin-top: 20px;
}

.output textarea {
  height: 180px;
  background: #151515;
  border: 1px solid #444;
}

.copy-btn, .unescapeHTML-btn {
  margin-left: 10px;
  background: #222;
  box-shadow: none;
}

.copy-btn:hover, .unescapeHTML-btn:hover {
  border-color: #ff3366;
}
</style>

<div class="container">
  <h1>HTML ESCAPER</h1>

  <textarea id="input" placeholder="Paste HTML here..."></textarea>

  <div class="output">
    <textarea id="output" readonly placeholder="Output..."></textarea>
  </div>

  <button onclick="escapeHTML()">Escape</button>
  <button class="unescapeHTML-btn" onclick="unescapeHTML()">UnEscape</button>
  <button class="copy-btn" onclick="copyOutput(this)">Copy</button>
</div>

<script>
function escapeHTML() {
  const text = document.getElementById("input").value;
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
  document.getElementById("output").value = escaped;
}

function unescapeHTML() {
  let text = document.getElementById("input").value;

  // urutan penting! decode yang paling spesifik dulu
  const unescaped = text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");

  document.getElementById("output").value = unescaped;
}

function copyOutput(btn) {
  const output = document.getElementById("output");
  const text = output.value;

  navigator.clipboard.writeText(text).then(() => {
    // buat toast
    const toast = document.createElement("div");
    toast.innerText = "Copied!";
    Object.assign(toast.style, {
      position: "absolute",
      top: (output.offsetTop + output.offsetHeight / 2) + "px",
      left: (output.offsetLeft + output.offsetWidth / 2) + "px",
      transform: "translate(-50%, -50%)",
      color: "#ff3366",
      fontSize: "32px",
      fontWeight: "bold",
      background: "rgba(0,0,0,0.5)",
      padding: "20px 40px",
      borderRadius: "8px",
      pointerEvents: "none",
      opacity: "0",
      transition: "opacity 0.2s, transform 0.2s",
      zIndex: 9
    });

    document.body.appendChild(toast);

    // muncul dengan animasi
    setTimeout(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translate(-50%, -50%) scale(1.1)";
    }, 10);

    // hilang setelah 2 detik
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translate(-50%, -50%) scale(0.9)";
      setTimeout(() => document.body.removeChild(toast), 200);
    }, 2000);

  }).catch(() => {
    output.select();
    document.execCommand("copy");
  });
}
</script>
