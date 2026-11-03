  // Cambia aquí el número (lada país + 10 dígitos, sin signos): ejemplo 5233XXXXXXXX
  var WA_NUMBER = "523300000000";
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
