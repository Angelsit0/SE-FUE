/**
 * AdminView.js
 * Admin panel for managing users and scores with double confirmation modal.
 * Includes admin login, tab switching, user/score tables, and delete actions.
 */
export class AdminView {
  constructor() {
    // Login section
    this.loginSection = document.getElementById('admin-login');
    this.panelSection = document.getElementById('admin-panel');
    this.passwordInput = document.getElementById('admin-password');
    this.loginBtn = document.getElementById('btn-admin-login');
    this.loginError = document.getElementById('admin-login-error');
    this.backLoginBtn = document.getElementById('btn-admin-back-login');
    this.backBtn = document.getElementById('btn-admin-back');

    // Tables
    this.usersListEl = document.getElementById('admin-users-list');
    this.scoresListEl = document.getElementById('admin-scores-list');
    this.clearScoresBtn = document.getElementById('btn-clear-scores');

    // Confirmation Modal
    this.modal = document.getElementById('confirm-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalMessage = document.getElementById('modal-message');
    this.modalStep1 = document.getElementById('modal-step-1');
    this.modalStep2 = document.getElementById('modal-step-2');
    this.modalConfirm1 = document.getElementById('btn-modal-confirm1');
    this.modalCancel = document.getElementById('btn-modal-cancel');
    this.modalConfirm2 = document.getElementById('btn-modal-confirm2');
    this.modalCancel2 = document.getElementById('btn-modal-cancel2');
    this.modalInput = document.getElementById('modal-confirm-input');
    this._pendingAction = null;

    // Admin tabs
    this.adminTabs = document.querySelectorAll('.admin-tab');
    this.adminTabContents = document.querySelectorAll('.admin-tab-content');
  }

  /**
   * Initialize all event handlers.
   * @param {function} onAdminLogin - Callback(password).
   * @param {function} onBack - Callback for back/logout buttons.
   * @param {function} onDeleteUser - Callback(userId).
   * @param {function} onDeleteScore - Callback(scoreId).
   * @param {function} onClearScores - Callback to clear all scores.
   */
  init(onAdminLogin, onBack, onDeleteUser, onDeleteScore, onClearScores) {
    // Admin login
    if (this.loginBtn) this.loginBtn.addEventListener('click', () => {
      const pw = this.passwordInput?.value || '';
      if (onAdminLogin) onAdminLogin(pw);
    });

    if (this.backLoginBtn && onBack) this.backLoginBtn.addEventListener('click', onBack);
    if (this.backBtn && onBack) this.backBtn.addEventListener('click', () => {
      this.showLogin();
      onBack();
    });

    // Tab switching
    this.adminTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.adminTabs.forEach(t => t.classList.remove('active'));
        this.adminTabContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const tabName = tab.dataset.adminTab;
        const content = document.getElementById(`admin-${tabName}-tab`);
        if (content) content.classList.add('active');
      });
    });

    // Store callbacks
    this._onDeleteUser = onDeleteUser;
    this._onDeleteScore = onDeleteScore;
    this._onClearScores = onClearScores;

    // Clear scores button
    if (this.clearScoresBtn) {
      this.clearScoresBtn.addEventListener('click', () => {
        this._showDoubleConfirm(
          'BORRAR TODAS LAS PUNTUACIONES',
          'Se eliminarán permanentemente TODAS las puntuaciones registradas.',
          () => { if (this._onClearScores) this._onClearScores(); }
        );
      });
    }

    // Modal buttons
    if (this.modalCancel) this.modalCancel.addEventListener('click', () => this._hideModal());
    if (this.modalCancel2) this.modalCancel2.addEventListener('click', () => this._hideModal());
    if (this.modalConfirm1) this.modalConfirm1.addEventListener('click', () => this._showStep2());
    if (this.modalConfirm2) this.modalConfirm2.addEventListener('click', () => {
      const input = this.modalInput?.value?.trim().toUpperCase();
      if (input === 'CONFIRMAR') {
        if (this._pendingAction) this._pendingAction();
        this._hideModal();
      } else {
        if (this.modalInput) this.modalInput.style.borderColor = '#ff3333';
      }
    });
  }

  /** Show the admin login section (hide the panel). */
  showLogin() {
    if (this.loginSection) this.loginSection.style.display = '';
    if (this.panelSection) this.panelSection.style.display = 'none';
    if (this.passwordInput) this.passwordInput.value = '';
    if (this.loginError) this.loginError.textContent = '';
  }

  /** Show the admin panel (hide the login section). */
  showPanel() {
    if (this.loginSection) this.loginSection.style.display = 'none';
    if (this.panelSection) this.panelSection.style.display = '';
  }

  /**
   * Show an error message on the admin login form.
   * @param {string} msg
   */
  showLoginError(msg) {
    if (this.loginError) this.loginError.textContent = msg;
  }

  /**
   * Render the users table.
   * @param {Array<{id: string, name: string, username: string, registeredAt: string, gamesPlayed: number}>} users
   */
  renderUsers(users) {
    if (!this.usersListEl) return;

    if (users.length === 0) {
      this.usersListEl.innerHTML = '<tr><td colspan="6" style="text-align:center;opacity:0.5">No hay operarios registrados</td></tr>';
      return;
    }

    this.usersListEl.innerHTML = users.map((u, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${u.name}</td>
        <td>${u.username}</td>
        <td>${new Date(u.registeredAt).toLocaleDateString('es-VE')}</td>
        <td>${u.gamesPlayed || 0}</td>
        <td><button class="btn-industrial btn-danger btn-small btn-delete-user" data-id="${u.id}" data-name="${u.name}">🗑️</button></td>
      </tr>
    `).join('');

    // Bind delete buttons
    this.usersListEl.querySelectorAll('.btn-delete-user').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const name = btn.dataset.name;
        this._showDoubleConfirm(
          `ELIMINAR OPERARIO: ${name}`,
          `Se eliminará permanentemente al operario "${name}" y no podrá acceder al sistema.`,
          () => { if (this._onDeleteUser) this._onDeleteUser(id); }
        );
      });
    });
  }

  /**
   * Render the scores table.
   * @param {Array<{id: string, name: string, score: number, levelReached: number, date: string}>} scores
   */
  renderScores(scores) {
    if (!this.scoresListEl) return;

    if (scores.length === 0) {
      this.scoresListEl.innerHTML = '<tr><td colspan="6" style="text-align:center;opacity:0.5">No hay puntuaciones registradas</td></tr>';
      return;
    }

    this.scoresListEl.innerHTML = scores.map((s, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${s.name}</td>
        <td>${s.score} pts</td>
        <td>Nivel ${s.levelReached || '?'}</td>
        <td>${new Date(s.date).toLocaleDateString('es-VE')}</td>
        <td><button class="btn-industrial btn-danger btn-small btn-delete-score" data-id="${s.id}" data-name="${s.name}">🗑️</button></td>
      </tr>
    `).join('');

    // Bind delete buttons
    this.scoresListEl.querySelectorAll('.btn-delete-score').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const name = btn.dataset.name;
        this._showDoubleConfirm(
          `ELIMINAR PUNTUACIÓN`,
          `Se eliminará la puntuación de "${name}".`,
          () => { if (this._onDeleteScore) this._onDeleteScore(id); }
        );
      });
    });
  }

  /**
   * @private Show the double-confirmation modal.
   */
  _showDoubleConfirm(title, message, action) {
    this._pendingAction = action;
    if (this.modalTitle) this.modalTitle.textContent = title;
    if (this.modalMessage) this.modalMessage.textContent = message;
    if (this.modalStep1) this.modalStep1.style.display = '';
    if (this.modalStep2) this.modalStep2.style.display = 'none';
    if (this.modalInput) { this.modalInput.value = ''; this.modalInput.style.borderColor = ''; }
    if (this.modal) this.modal.classList.add('active');
  }

  /**
   * @private Show step 2 of the confirmation (type "CONFIRMAR").
   */
  _showStep2() {
    if (this.modalStep1) this.modalStep1.style.display = 'none';
    if (this.modalStep2) this.modalStep2.style.display = '';
    if (this.modalInput) this.modalInput.focus();
  }

  /**
   * @private Hide the confirmation modal.
   */
  _hideModal() {
    if (this.modal) this.modal.classList.remove('active');
    this._pendingAction = null;
  }
}
