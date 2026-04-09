/* ══════════════════════════════════════════════════════
   CONTACTO.JS — Form validation
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

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

  form.addEventListener('submit', (e) => {
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

    // Success state
    const formInner = form.querySelector('.form-fields');
    const successEl = form.querySelector('.form-success');
    if (formInner && successEl) {
      formInner.style.display = 'none';
      successEl.classList.add('show');

      setTimeout(() => {
        successEl.classList.remove('show');
        formInner.style.display = '';
        form.reset();
      }, 5000);
    }
  });
});
