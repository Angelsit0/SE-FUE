/**
 * VennDiagramView.js
 * Renders interactive SVG Venn diagrams for 2 and 3 sets.
 * Regions are clickable and toggle a 'selected' visual state.
 */
export class VennDiagramView {
  constructor() {
    this.svg = document.getElementById('venn-svg');
    this.selectedRegions = new Set();
    this._onRegionClick = null;
  }

  /**
   * Render a 2-set Venn diagram (A, B) with 3 clickable regions.
   */
  render2Sets() {
    if (!this.svg) return;
    this.selectedRegions.clear();
    this.svg.setAttribute('viewBox', '0 0 500 350');

    this.svg.innerHTML = `
      <defs>
        <mask id="mask-A-only-2">
          <rect width="500" height="350" fill="white"/>
          <circle cx="320" cy="175" r="120" fill="black"/>
        </mask>
        <mask id="mask-B-only-2">
          <rect width="500" height="350" fill="white"/>
          <circle cx="180" cy="175" r="120" fill="black"/>
        </mask>
        <clipPath id="clip-AB-2">
          <circle cx="320" cy="175" r="120"/>
        </clipPath>
      </defs>
      
      <!-- A only region -->
      <circle cx="180" cy="175" r="120" class="venn-region" data-region="A_only" mask="url(#mask-A-only-2)"/>
      
      <!-- B only region -->
      <circle cx="320" cy="175" r="120" class="venn-region" data-region="B_only" mask="url(#mask-B-only-2)"/>
      
      <!-- AB intersection -->
      <circle cx="180" cy="175" r="120" class="venn-region" data-region="AB" clip-path="url(#clip-AB-2)"/>
      
      <!-- Circle outlines -->
      <circle cx="180" cy="175" r="120" fill="none" stroke="#00f0ff" stroke-width="2" style="pointer-events:none"/>
      <circle cx="320" cy="175" r="120" fill="none" stroke="#00f0ff" stroke-width="2" style="pointer-events:none"/>
      
      <!-- Labels -->
      <text x="130" y="175" class="venn-label" text-anchor="middle" dominant-baseline="middle">A</text>
      <text x="370" y="175" class="venn-label" text-anchor="middle" dominant-baseline="middle">B</text>
    `;

    this._bindRegionClicks();
  }

  /**
   * Render a 3-set Venn diagram (A, B, C) with 7 clickable regions.
   */
  render3Sets() {
    if (!this.svg) return;
    this.selectedRegions.clear();
    this.svg.setAttribute('viewBox', '0 0 500 450');

    // 3-circle Venn diagram with 7 clickable regions
    // Centers: A(185,165), B(315,165), C(250,280)
    const r = 110;
    const ax = 185, ay = 165, bx = 315, by = 165, cx = 250, cy = 280;

    this.svg.innerHTML = `
      <defs>
        <mask id="mask-A-only-3">
          <rect width="500" height="450" fill="white"/>
          <circle cx="${bx}" cy="${by}" r="${r}" fill="black"/>
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="black"/>
        </mask>
        <mask id="mask-B-only-3">
          <rect width="500" height="450" fill="white"/>
          <circle cx="${ax}" cy="${ay}" r="${r}" fill="black"/>
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="black"/>
        </mask>
        <mask id="mask-C-only-3">
          <rect width="500" height="450" fill="white"/>
          <circle cx="${ax}" cy="${ay}" r="${r}" fill="black"/>
          <circle cx="${bx}" cy="${by}" r="${r}" fill="black"/>
        </mask>
        
        <mask id="mask-AB-only-3">
          <rect width="500" height="450" fill="white"/>
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="black"/>
        </mask>
        <mask id="mask-AC-only-3">
          <rect width="500" height="450" fill="white"/>
          <circle cx="${bx}" cy="${by}" r="${r}" fill="black"/>
        </mask>
        <mask id="mask-BC-only-3">
          <rect width="500" height="450" fill="white"/>
          <circle cx="${ax}" cy="${ay}" r="${r}" fill="black"/>
        </mask>

        <clipPath id="clip-A-3"><circle cx="${ax}" cy="${ay}" r="${r}"/></clipPath>
        <clipPath id="clip-B-3"><circle cx="${bx}" cy="${by}" r="${r}"/></clipPath>
        <clipPath id="clip-C-3"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
      </defs>
      
      <!-- 'only' regions -->
      <circle cx="${ax}" cy="${ay}" r="${r}" class="venn-region" data-region="A_only" mask="url(#mask-A-only-3)"/>
      <circle cx="${bx}" cy="${by}" r="${r}" class="venn-region" data-region="B_only" mask="url(#mask-B-only-3)"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" class="venn-region" data-region="C_only" mask="url(#mask-C-only-3)"/>
      
      <!-- 2-way intersections -->
      <circle cx="${ax}" cy="${ay}" r="${r}" class="venn-region" data-region="AB_only" clip-path="url(#clip-B-3)" mask="url(#mask-AB-only-3)"/>
      <circle cx="${ax}" cy="${ay}" r="${r}" class="venn-region" data-region="AC_only" clip-path="url(#clip-C-3)" mask="url(#mask-AC-only-3)"/>
      <circle cx="${bx}" cy="${by}" r="${r}" class="venn-region" data-region="BC_only" clip-path="url(#clip-C-3)" mask="url(#mask-BC-only-3)"/>
      
      <!-- 3-way intersection (ABC) -->
      <g clip-path="url(#clip-C-3)">
        <circle cx="${ax}" cy="${ay}" r="${r}" class="venn-region" data-region="ABC" clip-path="url(#clip-B-3)"/>
      </g>
      
      <!-- Circle outlines -->
      <circle cx="${ax}" cy="${ay}" r="${r}" fill="none" stroke="#00f0ff" stroke-width="2" style="pointer-events:none"/>
      <circle cx="${bx}" cy="${by}" r="${r}" fill="none" stroke="#00f0ff" stroke-width="2" style="pointer-events:none"/>
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#00f0ff" stroke-width="2" style="pointer-events:none"/>
      
      <!-- Labels -->
      <text x="${ax - 60}" y="${ay - 50}" class="venn-label" text-anchor="middle">A</text>
      <text x="${bx + 60}" y="${by - 50}" class="venn-label" text-anchor="middle">B</text>
      <text x="${cx}" y="${cy + 80}" class="venn-label" text-anchor="middle">C</text>
    `;

    this._bindRegionClicks();
  }

  /**
   * @private Bind click events to all .venn-region elements.
   */
  _bindRegionClicks() {
    const regions = this.svg.querySelectorAll('.venn-region');
    regions.forEach(region => {
      region.addEventListener('click', (e) => {
        e.stopPropagation();
        const regionName = region.dataset.region;

        // Toggle selection for ALL elements with this region
        if (this.selectedRegions.has(regionName)) {
          this.selectedRegions.delete(regionName);
          this._updateRegionVisual(regionName, false);
        } else {
          this.selectedRegions.add(regionName);
          this._updateRegionVisual(regionName, true);
        }

        if (this._onRegionClick) this._onRegionClick([...this.selectedRegions]);
      });
    });
  }

  /**
   * @private Update the visual state of all elements matching a region name.
   */
  _updateRegionVisual(regionName, selected) {
    const elements = this.svg.querySelectorAll(`[data-region="${regionName}"]`);
    elements.forEach(el => {
      if (selected) {
        el.classList.add('selected');
      } else {
        el.classList.remove('selected');
      }
    });
  }

  /**
   * Clear all selected regions and reset visuals.
   */
  resetSelection() {
    this.selectedRegions.clear();
    const regions = this.svg.querySelectorAll('.venn-region');
    regions.forEach(r => r.classList.remove('selected'));
  }

  /**
   * Get the currently selected region names.
   * @returns {string[]}
   */
  getSelectedRegions() {
    return [...this.selectedRegions];
  }

  /**
   * Register a callback for region click events.
   * @param {function} callback - Receives an array of selected region names.
   */
  onRegionClick(callback) {
    this._onRegionClick = callback;
  }
}
