/* =========================================================
   CHATBOT FUNCIONAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const chatPanel = document.getElementById("chatPanel");
  const chatBody = document.getElementById("chatBody");
  const chatInput = document.getElementById("chatInput");
  const chatFab = document.getElementById("chatFab");
  const chatCloseBtn = document.getElementById("chatCloseBtn");
  const chatSendBtn = document.getElementById("chatSendBtn");

  if (!chatPanel || !chatBody || !chatInput) {
    console.error("Faltan elementos del chat en el HTML.");
    return;
  }

  function openChat() {
    chatPanel.classList.add("open");
    setTimeout(() => {
      chatInput.focus();
    }, 100);
  }

  function closeChat() {
    chatPanel.classList.remove("open");
  }

  function toggleChat() {
    chatPanel.classList.toggle("open");

    if (chatPanel.classList.contains("open")) {
      setTimeout(() => {
        chatInput.focus();
      }, 100);
    }
  }

  function addMessage(text, type = "bot") {
    const div = document.createElement("div");
    div.className = `chat-message ${type}`;
    div.textContent = text;
    chatBody.appendChild(div);

    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function normalizeText(input) {
    return input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function getBotResponse(input) {
    const t = normalizeText(input);

    if (
      t.includes("hola") ||
      t.includes("buenos dias") ||
      t.includes("buenas tardes") ||
      t.includes("buenas noches")
    ) {
      return "¡Hola! Soy el asistente virtual institucional. Puedo ayudarte con horarios, admisiones, matrículas, requisitos, contacto y consultas académicas.";
    }

    if (
      t.includes("horario") ||
      t.includes("atencion") ||
      t.includes("hora")
    ) {
      return "El horario de atención institucional es de lunes a viernes durante la jornada académica. Para un horario exacto, se recomienda confirmar directamente con secretaría.";
    }

    if (
      t.includes("admision") ||
      t.includes("matricula") ||
      t.includes("requisito") ||
      t.includes("inscripcion")
    ) {
      return "Para admisiones o matrículas normalmente se solicita copia de cédula del estudiante y representante, certificado de promoción o matrícula, fotos tamaño carné y otros documentos institucionales.";
    }

    if (
      t.includes("contacto") ||
      t.includes("telefono") ||
      t.includes("correo") ||
      t.includes("direccion")
    ) {
      return "Puedes comunicarte con la institución mediante secretaría, correo institucional o acercándote directamente al plantel.";
    }

    if (
      t.includes("tarea") ||
      t.includes("recurso") ||
      t.includes("academico") ||
      t.includes("calendario") ||
      t.includes("comunicado")
    ) {
      return "Los recursos académicos pueden incluir tareas, comunicados, cronogramas, actividades y material de apoyo. Indícame el curso o asignatura para orientarte mejor.";
    }

    if (t.includes("uniforme")) {
      return "Sobre uniformes, lo recomendable es confirmar con inspección o secretaría, ya que puede variar según el nivel educativo y la jornada.";
    }

    if (
      t.includes("gracias") ||
      t.includes("muchas gracias")
    ) {
      return "¡Con gusto! Estoy aquí para ayudarte con tus consultas académicas.";
    }

    return "Gracias por tu consulta. Puedo ayudarte con información sobre admisiones, requisitos, horarios, contacto, tareas, recursos académicos y servicios institucionales. ¿Sobre qué tema deseas saber más?";
  }

  function sendMessage() {
    const text = chatInput.value.trim();

    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => {
      const response = getBotResponse(text);
      addMessage(response, "bot");
    }, 450);
  }

  function askQuick(text) {
    openChat();
    chatInput.value = text;
    sendMessage();
  }

  if (chatFab) {
    chatFab.addEventListener("click", toggleChat);
  }

  if (chatCloseBtn) {
    chatCloseBtn.addEventListener("click", closeChat);
  }

  if (chatSendBtn) {
    chatSendBtn.addEventListener("click", sendMessage);
  }

  chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

  window.openChat = openChat;
  window.closeChat = closeChat;
  window.toggleChat = toggleChat;
  window.askQuick = askQuick;
});