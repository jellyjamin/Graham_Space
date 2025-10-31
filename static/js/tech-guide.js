/**
 * Programming Language Guide Sidebar Widget
 * Handles dropdown functionality, animations, state persistence, and accessibility
 */

(function() {
    'use strict';

    // Configuration constants
    const CONFIG = {
        STORAGE_KEY: 'techGuideState',
        ANIMATION_DURATION: 300,
        EASING: 'ease-in-out',
        DEBOUNCE_DELAY: 150
    };

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeTechGuide();
    });

    /**
     * Main initialization function
     */
    function initializeTechGuide() {
        const container = document.querySelector('.tech-guide-container');
        if (!container) return;

        // Parse configuration from data attributes
        const config = {
            duration: parseInt(container.dataset.duration) || CONFIG.ANIMATION_DURATION,
            easing: container.dataset.easing || CONFIG.EASING,
            persistState: container.dataset.persistState === 'true',
            deepLinking: container.dataset.deepLinking === 'true',
            keyboardNavigation: container.dataset.keyboardNav === 'true'
        };

        const techGuide = new TechGuideWidget(container, config);
        techGuide.init();
    }

    /**
     * Main TechGuide Widget Class
     */
    class TechGuideWidget {
        constructor(container, config) {
            this.container = container;
            this.config = config;
            this.languages = new Map();
            this.currentOpenLanguage = null;
            this.isAnimating = false;
            
            this.initializeLanguages();
        }

        /**
         * Initialize language data
         */
        initializeLanguages() {
            const languageElements = this.container.querySelectorAll('.tech-guide-language');
            languageElements.forEach(langElement => {
                const languageId = langElement.dataset.languageId;
                const sections = langElement.querySelector('.tech-guide-sections');
                const toggle = langElement.querySelector('.tech-guide-dropdown-toggle');
                
                this.languages.set(languageId, {
                    element: langElement,
                    sections: sections,
                    toggle: toggle,
                    isOpen: false
                });
            });
        }

        /**
         * Initialize the widget
         */
        init() {
            this.bindEventListeners();
            this.handleInitialState();
            this.setupKeyboardNavigation();
            this.handleHashNavigation();
        }

        /**
         * Bind event listeners
         */
        bindEventListeners() {
            // Toggle buttons
            this.languages.forEach((language, id) => {
                language.toggle.addEventListener('click', () => {
                    this.toggleLanguage(id);
                });
            });

            // Section links
            this.container.addEventListener('click', (e) => {
                if (e.target.closest('.tech-guide-section-link')) {
                    this.handleSectionClick(e);
                }
            });

            // Handle outside clicks
            document.addEventListener('click', (e) => {
                if (!this.container.contains(e.target)) {
                    this.closeAllLanguages();
                }
            });

            // Handle window resize
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    this.handleResize();
                }, CONFIG.DEBOUNCE_DELAY);
            });

            // Handle hash changes for deep linking
            if (this.config.deepLinking) {
                window.addEventListener('hashchange', () => {
                    this.handleHashChange();
                });
            }
        }

        /**
         * Handle initial state (from URL hash or localStorage)
         */
        handleInitialState() {
            // Restore from localStorage if enabled
            if (this.config.persistState) {
                const savedState = this.getSavedState();
                if (savedState && savedState.openLanguages) {
                    savedState.openLanguages.forEach(langId => {
                        if (this.languages.has(langId)) {
                            this.openLanguage(langId, false);
                        }
                    });
                }
            }

            // Handle URL hash for deep linking
            if (this.config.deepLinking) {
                this.handleHashChange();
            }
        }

        /**
         * Toggle language dropdown
         */
        toggleLanguage(languageId) {
            const language = this.languages.get(languageId);
            if (!language || this.isAnimating) return;

            if (language.isOpen) {
                this.closeLanguage(languageId);
            } else {
                this.openLanguage(languageId);
            }
        }

        /**
         * Open language dropdown
         */
        openLanguage(languageId, animate = true) {
            const language = this.languages.get(languageId);
            if (!language || language.isOpen || this.isAnimating) return;

            this.isAnimating = true;
            language.isOpen = true;
            this.currentOpenLanguage = languageId;

            // Update ARIA attributes
            language.toggle.setAttribute('aria-expanded', 'true');
            language.sections.hidden = false;

            // Animate opening
            if (animate && this.config.duration > 0) {
                this.animateDropdown(language.sections, true);
            }

            // Save state
            if (this.config.persistState) {
                this.saveState();
            }

            this.isAnimating = false;
        }

        /**
         * Close language dropdown
         */
        closeLanguage(languageId, animate = true) {
            const language = this.languages.get(languageId);
            if (!language || !language.isOpen || this.isAnimating) return;

            this.isAnimating = true;
            language.isOpen = false;

            if (this.currentOpenLanguage === languageId) {
                this.currentOpenLanguage = null;
            }

            // Update ARIA attributes
            language.toggle.setAttribute('aria-expanded', 'false');

            // Animate closing
            if (animate && this.config.duration > 0) {
                this.animateDropdown(language.sections, false);
            } else {
                language.sections.hidden = true;
            }

            // Save state
            if (this.config.persistState) {
                this.saveState();
            }

            this.isAnimating = false;
        }

        /**
         * Close all language dropdowns
         */
        closeAllLanguages() {
            this.languages.forEach((language, id) => {
                if (language.isOpen) {
                    this.closeLanguage(id);
                }
            });
        }

        /**
         * Animate dropdown open/close
         */
        animateDropdown(element, isOpening) {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                // Respect user's motion preferences
                element.hidden = !isOpening;
                this.isAnimating = false;
                return;
            }

            const maxHeight = element.scrollHeight;
            
            if (isOpening) {
                // Opening animation
                element.style.maxHeight = '0px';
                element.style.overflow = 'hidden';
                element.style.transition = `max-height ${this.config.duration}ms ${this.config.easing}`;
                
                requestAnimationFrame(() => {
                    element.style.maxHeight = maxHeight + 'px';
                });

                setTimeout(() => {
                    element.style.maxHeight = 'none';
                    element.style.overflow = 'visible';
                    element.style.transition = '';
                    this.isAnimating = false;
                }, this.config.duration);
            } else {
                // Closing animation
                element.style.maxHeight = maxHeight + 'px';
                element.style.overflow = 'hidden';
                element.style.transition = `max-height ${this.config.duration}ms ${this.config.easing}`;
                
                requestAnimationFrame(() => {
                    element.style.maxHeight = '0px';
                });

                setTimeout(() => {
                    element.hidden = true;
                    element.style.maxHeight = '';
                    element.style.overflow = '';
                    element.style.transition = '';
                    this.isAnimating = false;
                }, this.config.duration);
            }
        }

        /**
         * Handle section link clicks
         */
        handleSectionClick(event) {
            const link = event.target.closest('.tech-guide-section-link');
            if (!link) return;

            const sectionId = link.dataset.sectionId;
            const languageId = link.closest('.tech-guide-language').dataset.languageId;
            
            // Save current state for navigation
            if (this.config.persistState) {
                this.saveState();
            }

            // Update URL hash for deep linking
            if (this.config.deepLinking) {
                const url = new URL(link.href);
                const hash = url.hash || `#${sectionId}`;
                history.pushState(null, '', hash);
            }
        }

        /**
         * Setup keyboard navigation
         */
        setupKeyboardNavigation() {
            if (!this.config.keyboardNavigation) return;

            this.container.addEventListener('keydown', (e) => {
                this.handleKeyboardNavigation(e);
            });
        }

        /**
         * Handle keyboard navigation
         */
        handleKeyboardNavigation(event) {
            const focusableElements = this.container.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );
            const focusableArray = Array.from(focusableElements);
            const currentIndex = focusableArray.indexOf(document.activeElement);

            switch (event.key) {
                case 'Escape':
                    this.closeAllLanguages();
                    event.preventDefault();
                    break;
                    
                case 'ArrowDown':
                    if (currentIndex < focusableArray.length - 1) {
                        focusableArray[currentIndex + 1].focus();
                        event.preventDefault();
                    }
                    break;
                    
                case 'ArrowUp':
                    if (currentIndex > 0) {
                        focusableArray[currentIndex - 1].focus();
                        event.preventDefault();
                    }
                    break;
                    
                case 'Enter':
                case ' ':
                    if (document.activeElement.classList.contains('tech-guide-dropdown-toggle')) {
                        const languageId = document.activeElement.closest('.tech-guide-language').dataset.languageId;
                        this.toggleLanguage(languageId);
                        event.preventDefault();
                    }
                    break;
            }
        }

        /**
         * Handle hash navigation for deep linking
         */
        handleHashNavigation() {
            if (!this.config.deepLinking) return;

            // Handle initial hash
            this.handleHashChange();

            // Listen for hash changes
            window.addEventListener('hashchange', () => {
                this.handleHashChange();
            });
        }

        /**
         * Handle hash change
         */
        handleHashChange() {
            const hash = window.location.hash.substring(1);
            if (!hash) return;

            // Find section and open corresponding language
            const sectionLink = this.container.querySelector(`[data-section-id="${hash}"]`);
            if (sectionLink) {
                const languageId = sectionLink.closest('.tech-guide-language').dataset.languageId;
                this.openLanguage(languageId);
                
                // Scroll section into view
                setTimeout(() => {
                    sectionLink.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, this.config.duration);
            }
        }

        /**
         * Handle window resize
         */
        handleResize() {
            // Recalculate animations if needed
            if (this.currentOpenLanguage) {
                const language = this.languages.get(this.currentOpenLanguage);
                if (language && language.isOpen) {
                    // Reset max-height to accommodate new content size
                    language.sections.style.maxHeight = 'none';
                }
            }
        }

        /**
         * Save state to localStorage
         */
        saveState() {
            if (!this.config.persistState) return;

            const openLanguages = Array.from(this.languages.entries())
                .filter(([id, lang]) => lang.isOpen)
                .map(([id]) => id);

            const state = {
                openLanguages: openLanguages,
                timestamp: Date.now()
            };

            try {
                localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state));
            } catch (e) {
                console.warn('Could not save tech guide state:', e);
            }
        }

        /**
         * Get saved state from localStorage
         */
        getSavedState() {
            if (!this.config.persistState) return null;

            try {
                const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
                return saved ? JSON.parse(saved) : null;
            } catch (e) {
                console.warn('Could not load tech guide state:', e);
                return null;
            }
        }

        /**
         * Clear saved state
         */
        clearState() {
            try {
                localStorage.removeItem(CONFIG.STORAGE_KEY);
            } catch (e) {
                console.warn('Could not clear tech guide state:', e);
            }
        }
    }

    // Export for testing (if needed)
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = TechGuideWidget;
    }

})();