const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});

mainNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Abrir menú');
  });
});

document.querySelectorAll('.expand-card').forEach(button => {
  const card = button.closest('.interactive-card');
  button.addEventListener('click', () => {
    const open = card.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
    button.innerHTML = open ? 'Ocultar consejo <span>−</span>' : 'Ver consejo <span>＋</span>';
  });
});

const caseFeedback = document.getElementById('caseFeedback');
document.querySelectorAll('.answer-option').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.answer-option').forEach(option => option.classList.remove('selected'));
    button.classList.add('selected');
    const answer = button.dataset.answer;
    if (answer === 'safe') {
      caseFeedback.textContent = 'Bien pensado. No transfieras dinero. Verifica por canales oficiales y consulta con un adulto de confianza. Las promesas de ganancias garantizadas, la urgencia y el pago a una cuenta personal son señales de alerta.';
      caseFeedback.style.color = 'var(--mint)';
    } else if (answer === 'unsafe') {
      caseFeedback.textContent = 'Alto ahí: la presión para actuar ya es una señal de alerta. No envíes dinero; comprueba quién ofrece el producto y consulta fuentes oficiales.';
      caseFeedback.style.color = 'var(--coral)';
    } else {
      caseFeedback.textContent = 'Una captura de pantalla se puede falsificar y no demuestra que una oferta sea legítima. Verifica la empresa y sus autorizaciones por canales independientes.';
      caseFeedback.style.color = 'var(--coral)';
    }
  });
});

const quizForm = document.getElementById('quizForm');
const quizResult = document.getElementById('quizResult');
quizForm?.addEventListener('submit', event => {
  event.preventDefault();
  const answers = { q1: 'b', q2: 'c', q3: 'a' };
  let score = 0;
  let unanswered = 0;
  Object.entries(answers).forEach(([question, correct]) => {
    const selected = quizForm.querySelector(`input[name="${question}"]:checked`);
    if (!selected) unanswered++;
    else if (selected.value === correct) score++;
  });
  if (unanswered > 0) {
    quizResult.textContent = `Te faltan ${unanswered} pregunta(s). Responde todas para revisar tu resultado.`;
    quizResult.style.color = 'var(--coral)';
    return;
  }
  const messages = [
    'Buen comienzo: repasa las secciones y vuelve a intentarlo.',
    'Vas por buen camino. Recuerda verificar antes de actuar.',
    '¡Muy bien! Tienes claras varias bases para tomar decisiones informadas.',
    '¡Excelente! Reconoces señales importantes de prevención y educación financiera.'
  ];
  quizResult.textContent = `Resultado: ${score}/3. ${messages[score]}`;
  quizResult.style.color = score >= 2 ? 'var(--mint)' : 'var(--coral)';
});
quizForm?.addEventListener('reset', () => {
  quizResult.textContent = '';
  quizResult.style.color = 'var(--mint)';
});
