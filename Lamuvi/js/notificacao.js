window.mostrarNotificacao = function(mensagem, tipo = 'info') {

  const notifAnterior = document.querySelector('.notificacao-custom');
  if (notifAnterior) {
    notifAnterior.remove();
  }
  const notif = document.createElement('div');
  notif.className = `notificacao-custom notificacao-${tipo}`;

  const icones = {
    sucesso: '✓',
    erro: '✕',
    info: 'ℹ',
    aviso: '⚠'
  };

  notif.innerHTML = `
        <span class="notif-icone">${icones[tipo] || icones.info}</span>
        <span class="notif-mensagem">${mensagem}</span>
    `;

  document.body.appendChild(notif);

  setTimeout(() => notif.classList.add('mostrar'), 10);

  setTimeout(() => {
    notif.classList.remove('mostrar');
    setTimeout(() => notif.remove(), 300);
  }, 2000);
};
window.confirmarAcao = function(mensagem, callback) {
  const modalAnterior = document.querySelector('.modal-confirmacao');
  if (modalAnterior) {
    modalAnterior.remove();
  }

  const modal = document.createElement('div');
  modal.className = 'modal-confirmacao';
  modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-box">
            <p class="modal-mensagem">${mensagem}</p>
            <div class="modal-botoes">
                <button class="btn-cancelar">Cancelar</button>
                <button class="btn-confirmar">Confirmar</button>
            </div>
        </div>
    `;

  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add('mostrar'), 10);

  modal.querySelector('.btn-confirmar').onclick = () => {
    modal.remove();
    callback(true);
  };

  modal.querySelector('.btn-cancelar').onclick = () => {
    modal.remove();
    callback(false);
  };

  modal.querySelector('.modal-overlay').onclick = () => {
    modal.remove();
    callback(false);
  };
};
