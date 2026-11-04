// Número de WhatsApp: 52 (México) + 10 dígitos, sin signos ni espacios
var WA_NUMBER = "523322040054";

/* WhatsApp */
(function () {
  var form = document.getElementById("wa-form");
  var link = document.getElementById("wa-link");
  function fmt(v) {
    if (!v) return "por definir";
    var p = v.split("-");
    return p[2] + "/" + p[1] + "/" + p[0];
  }
  function update() {
    var nombre = document.getElementById("nombre").value.trim();
    var msg = "Hola, soy " + (nombre || "un visitante") +
      ". Me interesa La Manguita en Mazamitla. Llegada: " + fmt(document.getElementById("llegada").value) +
      ", salida: " + fmt(document.getElementById("salida").value) +
      ", personas: " + (document.getElementById("personas").value || "por definir") +
      ". ¿Tienen disponibilidad?";
    link.href = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
  }
  form.addEventListener("input", update);
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  update();
})();

/* Filtros de galería */
(function () {
  var chips = document.querySelectorAll(".chip");
  var figs = document.querySelectorAll(".gallery figure");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var cat = chip.getAttribute("data-cat");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
      figs.forEach(function (f) { f.hidden = !(cat === "all" || f.getAttribute("data-cat") === cat); });
    });
  });
})();

/* Visor de fotos */
(function () {
  var dlg = document.getElementById("lb");
  var img = document.getElementById("lb-img");
  var cap = document.getElementById("lb-cap");
  var shown = [], idx = 0;

  function visible() {
    return Array.prototype.filter.call(document.querySelectorAll(".gallery figure"), function (f) { return !f.hidden; });
  }
  function show(i) {
    idx = (i + shown.length) % shown.length;
    var b = shown[idx].querySelector("button");
    img.src = b.getAttribute("data-full");
    img.alt = b.getAttribute("data-alt");
    cap.textContent = b.getAttribute("data-alt") + "  (" + (idx + 1) + " de " + shown.length + ")";
  }
  document.querySelectorAll(".gallery button").forEach(function (b) {
    b.addEventListener("click", function () {
      shown = visible();
      var i = shown.indexOf(b.parentNode);
      show(i < 0 ? 0 : i);
      dlg.showModal();
    });
  });
  document.getElementById("lb-prev").addEventListener("click", function () { show(idx - 1); });
  document.getElementById("lb-next").addEventListener("click", function () { show(idx + 1); });
  document.getElementById("lb-close").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });
})();

/* Fondo que cambia con la sección */
(function () {
  var layers = document.querySelectorAll(".bg-layer");
  var secs = document.querySelectorAll("section[data-bg]");
  if (!layers.length || !("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var i = parseInt(e.target.getAttribute("data-bg"), 10);
      layers.forEach(function (l, k) { l.classList.toggle("is-on", k === i); });
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  secs.forEach(function (s) { io.observe(s); });
})();
