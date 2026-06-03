/**
 * LeaderboardModel.js - Top 3 leaderboard with localStorage persistence
 * Game: ¿SE FUE?
 * Layer: Model (MVC)
 */

const STORAGE_KEY = 'sefue_leaderboard';
const RANKS = ['Ingeniero Jefe', 'Técnico Especialista', 'Operario Novato'];

export class LeaderboardModel {
  constructor() {
    this.entries = this._load();
  }

  _load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  _save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries));
  }

  addEntry(name, score, levelReached) {
    this.entries.push({
      name,
      score,
      levelReached,
      date: new Date().toISOString(),
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
    });
    this.entries.sort((a, b) => b.score - a.score);
    this._save();
  }

  getTop3() {
    return this.entries.slice(0, 3).map((entry, i) => ({
      ...entry,
      rank: RANKS[i] || 'Operario',
      position: i + 1
    }));
  }

  getAll() {
    return this.entries.map((entry, i) => ({
      ...entry,
      rank: i < 3 ? RANKS[i] : 'Operario',
      position: i + 1
    }));
  }

  removeEntry(id) {
    this.entries = this.entries.filter(e => e.id !== id);
    this._save();
  }

  clearAll() {
    this.entries = [];
    this._save();
  }
}
