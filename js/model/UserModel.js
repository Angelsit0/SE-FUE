/**
 * UserModel.js - User registration, login, and admin authentication with localStorage
 * Game: ¿SE FUE?
 * Layer: Model (MVC)
 */

const USERS_KEY = 'sefue_users';
const ADMIN_PASSWORD = 'ujap2025'; // Admin master password

export class UserModel {
  constructor() {
    this.users = this._load();
    this.currentUser = null;
  }

  _load() {
    try {
      const data = localStorage.getItem(USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  _save() {
    localStorage.setItem(USERS_KEY, JSON.stringify(this.users));
  }

  register(name, username, password) {
    // Validation
    if (!name || !username || !password) {
      return { success: false, error: 'Todos los campos son obligatorios' };
    }
    if (username.length < 3) {
      return { success: false, error: 'El usuario debe tener al menos 3 caracteres' };
    }
    if (password.length < 4) {
      return { success: false, error: 'La contraseña debe tener al menos 4 caracteres' };
    }
    if (this.users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, error: 'Este nombre de usuario ya está registrado' };
    }

    const user = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name,
      username,
      password, // In production use hashing, this is a client-side game
      registeredAt: new Date().toISOString(),
      gamesPlayed: 0,
      gamesWon: 0,
      coins: 50 // Te damos 50 coins de bienvenida
    };
    this.users.push(user);
    this._save();
    return { success: true, user };
  }

  login(username, password) {
    const user = this.users.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );
    if (!user) {
      return { success: false, error: 'Usuario o contraseña incorrectos' };
    }
    this.currentUser = user;
    return { success: true, user };
  }

  logout() {
    this.currentUser = null;
  }

  incrementGamesPlayed(userId) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.gamesPlayed++;
      this._save();
    }
  }

  incrementGamesWon(userId) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.gamesWon = (user.gamesWon || 0) + 1;
      this._save();
    }
  }

  updateCoins(userId, coins) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.coins = coins;
      this._save();
    }
  }

  getAllUsers() {
    return this.users.map(u => ({ ...u, password: undefined })); // Never expose passwords
  }

  removeUser(id) {
    this.users = this.users.filter(u => u.id !== id);
    this._save();
  }

  isAdminPassword(password) {
    return password === ADMIN_PASSWORD;
  }

  getUserCount() {
    return this.users.length;
  }
}
