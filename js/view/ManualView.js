/**
 * ManualView.js
 * Handles manual page navigation (6 pages of game instructions).
 */
export class ManualView {
  constructor() {
    this.pages = document.querySelectorAll('.manual-page');
    this.prevBtn = document.getElementById('manual-prev');
    this.nextBtn = document.getElementById('manual-next');
    this.pageNum = document.getElementById('manual-page-num');
    this.closeBtn = document.getElementById('btn-manual-close');
    this.currentPage = 0;
    this.totalPages = this.pages.length;
  }

  /**
   * Initialize navigation buttons and close handler.
   * @param {function} onClose - Callback when the close button is pressed.
   */
  init(onClose) {
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevPage());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextPage());
    if (this.closeBtn && onClose) this.closeBtn.addEventListener('click', onClose);
    this._updateNav();
  }

  /**
   * Show a specific page by index.
   * @param {number} index - 0-based page index.
   */
  showPage(index) {
    this.pages.forEach(p => p.classList.remove('active'));
    if (this.pages[index]) this.pages[index].classList.add('active');
    this.currentPage = index;
    this._updateNav();
  }

  /** Navigate to the next page. */
  nextPage() {
    if (this.currentPage < this.totalPages - 1) this.showPage(this.currentPage + 1);
  }

  /** Navigate to the previous page. */
  prevPage() {
    if (this.currentPage > 0) this.showPage(this.currentPage - 1);
  }

  /** Reset to the first page. */
  reset() {
    this.showPage(0);
  }

  /**
   * @private Update the page counter and button visibility.
   */
  _updateNav() {
    if (this.pageNum) this.pageNum.textContent = `${this.currentPage + 1} / ${this.totalPages}`;
    if (this.prevBtn) this.prevBtn.style.visibility = this.currentPage === 0 ? 'hidden' : 'visible';
    if (this.nextBtn) this.nextBtn.style.visibility = this.currentPage === this.totalPages - 1 ? 'hidden' : 'visible';
  }
}
