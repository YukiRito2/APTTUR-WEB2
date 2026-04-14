/* ══════════════════════════════════════════════════════
   CONTACTO.JS — Form validation + Web3Forms envío
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const WEB3FORMS_KEY = '849d5fea-4893-49bc-bb36-2086c454bd3d';

  /* ── Motivo Chips ─────────────────────────────────── */
  const motivoChips = document.querySelectorAll('.motivo-chip');
  const motivoInput = document.getElementById('field-motivo');

  motivoChips.forEach(chip => {
    chip.addEventListener('click', () => {
      motivoChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (motivoInput) motivoInput.value = chip.dataset.motivo;
      updateProgress();
    });
  });

  /* ── Progress Bar ─────────────────────────────────── */
  const progressBar = document.getElementById('form-progress-bar');
  const trackedInputs = ['#field-name', '#field-email', '#field-message'];
  const optionalInputs = ['#field-phone', '#field-company'];

  function updateProgress() {
    let filled = 0;
    let total = trackedInputs.length + 1; // +1 for motivo

    // Motivo always selected
    if (document.querySelector('.motivo-chip.active')) filled++;

    trackedInputs.forEach(sel => {
      const el = form.querySelector(sel);
      if (el && el.value.trim().length > 0) filled++;
    });

    // Optional fields add bonus
    optionalInputs.forEach(sel => {
      const el = form.querySelector(sel);
      if (el && el.value.trim().length > 0) {
        filled += 0.5;
        total += 0.5;
      }
    });

    const pct = Math.min(Math.round((filled / total) * 100), 100);
    if (progressBar) progressBar.style.width = pct + '%';
  }

  /* ── Input Check Marks ────────────────────────────── */
  function updateCheckMark(input) {
    const check = input.parentElement.querySelector('.input-check');
    if (!check) return;
    if (input.value.trim().length > 0) {
      check.classList.add('visible');
    } else {
      check.classList.remove('visible');
    }
  }

  const allInputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
  allInputs.forEach(input => {
    input.addEventListener('input', () => {
      updateCheckMark(input);
      updateProgress();
    });
  });

  /* ── Field Validation Config ──────────────────────── */
  const fields = {
    name: {
      el: form.querySelector('#field-name'),
      error: form.querySelector('#error-name'),
      validate: (v) => v.trim().length > 0 ? '' : 'El nombre es obligatorio.',
    },
    email: {
      el: form.querySelector('#field-email'),
      error: form.querySelector('#error-email'),
      validate: (v) => {
        if (!v.trim()) return 'El email es obligatorio.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Ingresa un email válido.';
        return '';
      },
    },
    message: {
      el: form.querySelector('#field-message'),
      error: form.querySelector('#error-message'),
      validate: (v) => {
        if (!v.trim()) return 'El mensaje es obligatorio.';
        if (v.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
        return '';
      },
    },
  };

  // Clear error on input
  Object.values(fields).forEach(f => {
    if (!f.el) return;
    f.el.addEventListener('input', () => {
      f.el.classList.remove('error');
      if (f.error) f.error.classList.remove('show');
    });
  });

  /* ── New Message Button ───────────────────────────── */
  const btnNewMessage = document.getElementById('btn-new-message');
  if (btnNewMessage) {
    btnNewMessage.addEventListener('click', () => {
      const formInner = form.querySelector('.form-fields');
      const successEl = form.querySelector('.form-success');
      if (successEl) successEl.classList.remove('show');
      if (formInner) formInner.style.display = '';
      form.reset();
      // Reset chips
      motivoChips.forEach(c => c.classList.remove('active'));
      if (motivoChips[0]) motivoChips[0].classList.add('active');
      if (motivoInput) motivoInput.value = motivoChips[0]?.dataset.motivo || '';
      // Reset checks
      form.querySelectorAll('.input-check').forEach(c => c.classList.remove('visible'));
      updateProgress();
    });
  }

  /* ── Form Submit ──────────────────────────────────── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let isValid = true;

    Object.values(fields).forEach(f => {
      if (!f.el) return;
      const msg = f.validate(f.el.value);
      if (msg) {
        isValid = false;
        f.el.classList.add('error');
        if (f.error) {
          f.error.querySelector('span').textContent = msg;
          f.error.classList.add('show');
        }
      } else {
        f.el.classList.remove('error');
        if (f.error) f.error.classList.remove('show');
      }
    });

    if (!isValid) return;

    const submitBtn = form.querySelector('.btn-submit');
    const formInner = form.querySelector('.form-fields');
    const successEl = form.querySelector('.form-success');

    // Disable button while sending
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;animation:spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-dasharray="31.4 31.4" stroke-dashoffset="10"/>
        </svg>
        Enviando...`;
    }

    // Gather optional fields
    const phoneEl = form.querySelector('#field-phone');
    const companyEl = form.querySelector('#field-company');
    const activeMotivo = document.querySelector('.motivo-chip.active');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Nuevo mensaje desde APTTUR Web — ' + (activeMotivo ? activeMotivo.dataset.motivo : 'Contáctenos'),
          from_name: 'APTTUR Web',
          name: fields.name.el.value.trim(),
          email: fields.email.el.value.trim(),
          phone: phoneEl ? phoneEl.value.trim() : '',
          company: companyEl ? companyEl.value.trim() : '',
          motivo: activeMotivo ? activeMotivo.dataset.motivo : '',
          message: fields.message.el.value.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Success state
        if (formInner && successEl) {
          formInner.style.display = 'none';
          successEl.classList.add('show');
          if (progressBar) progressBar.style.width = '100%';
        }
      } else {
        throw new Error(data.message || 'Error al enviar el mensaje.');
      }
    } catch (err) {
      // Show a general error
      const msgField = fields.message;
      if (msgField.error) {
        msgField.error.querySelector('span').textContent =
          'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.';
        msgField.error.classList.add('show');
      }
    } finally {
      // Restore button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px;">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
          Enviar mensaje`;
      }
    }
  });

  // Init progress
  updateProgress();
});
