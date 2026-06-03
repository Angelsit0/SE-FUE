/**
 * RegisterView.js
 * Handles user registration and login forms with tab switching.
 */
export class RegisterView {
  constructor() {
    this.tabLogin = document.getElementById('tab-login');
    this.tabRegister = document.getElementById('tab-register');
    this.loginForm = document.getElementById('login-form');
    this.registerForm = document.getElementById('register-form');
    this.loginError = document.getElementById('login-error');
    this.registerError = document.getElementById('register-error');
    this.adminBtn = document.getElementById('btn-admin-access');
  }

  /**
   * Initialize form handlers and tab switching.
   * @param {function} onLogin - Callback(username, password).
   * @param {function} onRegister - Callback(name, username, password).
   * @param {function} onAdminAccess - Callback for admin access button.
   */
  init(onLogin, onRegister, onAdminAccess) {
    // Tab switching
    if (this.tabLogin) this.tabLogin.addEventListener('click', () => this._showTab('login'));
    if (this.tabRegister) this.tabRegister.addEventListener('click', () => this._showTab('register'));

    // Form submissions
    if (this.loginForm) {
      this.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        if (onLogin) onLogin(username, password);
      });
    }

    if (this.registerForm) {
      this.registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value.trim();
        const username = document.getElementById('register-username').value.trim();
        const password = document.getElementById('register-password').value;
        if (onRegister) onRegister(name, username, password);
      });
    }

    if (this.adminBtn && onAdminAccess) {
      this.adminBtn.addEventListener('click', onAdminAccess);
    }
  }

  /**
   * @private Switch between login and register tabs.
   */
  _showTab(tab) {
    if (tab === 'login') {
      this.tabLogin?.classList.add('active');
      this.tabRegister?.classList.remove('active');
      this.loginForm?.classList.add('active');
      this.registerForm?.classList.remove('active');
    } else {
      this.tabLogin?.classList.remove('active');
      this.tabRegister?.classList.add('active');
      this.loginForm?.classList.remove('active');
      this.registerForm?.classList.add('active');
    }
    this.clearErrors();
  }

  /**
   * Display an error message on the login form.
   * @param {string} msg
   */
  showLoginError(msg) {
    if (this.loginError) { this.loginError.textContent = msg; }
  }

  /**
   * Display an error message on the register form.
   * @param {string} msg
   */
  showRegisterError(msg) {
    if (this.registerError) { this.registerError.textContent = msg; }
  }

  /**
   * Show a success message and auto-switch to login tab.
   */
  showRegisterSuccess() {
    if (this.registerError) {
      this.registerError.style.color = '#00ff66';
      this.registerError.textContent = '✓ Registro exitoso. Inicie sesión.';
      setTimeout(() => {
        this.registerError.style.color = '';
        this._showTab('login');
      }, 1500);
    }
  }

  /** Clear all error messages. */
  clearErrors() {
    if (this.loginError) this.loginError.textContent = '';
    if (this.registerError) this.registerError.textContent = '';
  }

  /** Clear all form inputs and error messages. */
  clearForms() {
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('register-name').value = '';
    document.getElementById('register-username').value = '';
    document.getElementById('register-password').value = '';
    this.clearErrors();
  }
}
