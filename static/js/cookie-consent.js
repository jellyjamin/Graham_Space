// Cookie Consent Management - Simplified Function-Based
(function() {
  'use strict';

  // Consent Manager Object
  const consentManager = {
    consentKey: 'cookie_consent',
    preferencesKey: 'cookie_preferences',
    consentData: null,
    preferences: null,
    banner: null,
    modal: null,
    settingsBtn: null,

    init: function() {
      this.banner = document.getElementById('consent-banner');
      this.modal = document.getElementById('cookie-settings-modal');
      this.settingsBtn = document.getElementById('cookie-settings-btn');

      this.consentData = window.consentData || { items: [] };
      this.loadPreferences();
      this.checkConsent();
      this.bindEvents();
      this.loadScripts();
      console.log('Consent manager initialized');
    },

    loadPreferences: function() {
      const saved = localStorage.getItem(this.preferencesKey);
      if (saved) {
        try {
          this.preferences = JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing preferences:', e);
          this.preferences = this.getDefaultPreferences();
        }
      } else {
        this.preferences = this.getDefaultPreferences();
      }
    },

    getDefaultPreferences: function() {
      const defaults = {};
      this.consentData.items.forEach(item => {
        if (item.script_file) {
          defaults[item.script_file] = !!item.is_functional;
        }
      });
      return defaults;
    },

    checkConsent: function() {
      const consent = localStorage.getItem(this.consentKey);
      if (consent === 'accepted') {
        this.hideBanner();
        this.enableAllScripts();
      } else if (consent === 'rejected') {
        this.hideBanner();
        this.enableEssentialScripts();
      } else {
        this.showBanner();
      }
    },

    showBanner: function() {
      if (this.banner) {
        this.banner.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    },

    hideBanner: function() {
      console.log('hideBanner called');
      if (this.banner) {
        this.banner.style.display = 'none';
        document.body.style.overflow = '';
        console.log('Banner hidden');
      }
    },

    showSettings: function() {
      if (this.modal) {
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        if (this.settingsBtn) {
          this.settingsBtn.setAttribute('aria-expanded', 'true');
        }
      }
    },

    hideSettings: function() {
      if (this.modal) {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
        if (this.settingsBtn) {
          this.settingsBtn.setAttribute('aria-expanded', 'false');
        }
      }
    },

    acceptAll: function() {
      console.log('Accept All clicked');
      this.setConsent('accepted');
      this.preferences = { ...this.getDefaultPreferences(), ...Object.fromEntries(this.consentData.items.map(item => [item.script_file, true])) };
      this.savePreferences();
      this.hideBanner();
      this.enableAllScripts();
      this.updateUI();
    },

    acceptEssential: function() {
      console.log('Accept Essential clicked');
      this.setConsent('accepted');
      this.preferences = this.getDefaultPreferences();
      this.savePreferences();
      this.hideBanner();
      this.enableEssentialScripts();
      this.updateUI();
    },

    rejectAll: function() {
      console.log('Reject All clicked');
      this.setConsent('rejected');
      this.preferences = this.getDefaultPreferences();
      this.savePreferences();
      this.hideBanner();
      this.enableEssentialScripts();
      this.updateUI();
    },

    setConsent: function(status) {
      localStorage.setItem(this.consentKey, status);
    },

    savePreferences: function() {
      if (this.preferences) {
        localStorage.setItem(this.preferencesKey, JSON.stringify(this.preferences));
      }
      this.updateScripts();
    },

    updatePreferences: function(category, enabled) {
      this.consentData.items.forEach(item => {
        if (this.getItemCategory(item) === category) {
          this.preferences[item.script_file] = enabled;
        }
      });
      this.savePreferences();
    },

    updateItemPreference: function(scriptFile, enabled) {
      if (this.preferences && scriptFile) {
        this.preferences[scriptFile] = enabled;
        this.savePreferences();
      }
    },

    getItemCategory: function(item) {
      if (item.is_functional) return 'essential';
      if (['google-analytics.js', 'google-tag-manager.js', 'hotjar.js', 'cloudflare-analytics.js', 'microsoft-clarity.js'].includes(item.script_file)) return 'analytics';
      if (['facebook-pixel.js', 'linkedin-insight.js', 'google-ads-tracking.js'].includes(item.script_file)) return 'marketing';
      if (['twitter.js', 'facebook-social.js', 'youtube-embeds.js', 'crisp-chat.js', 'intercom.js', 'zendesk.js'].includes(item.script_file)) return 'social';
      if (item.script_file === 'recaptcha.js') return 'essential';
      return 'other';
    },

    updateUI: function() {
      // Update banner toggles
      const categoryToggles = this.banner ? this.banner.querySelectorAll('.consent-category__toggle') : [];
      categoryToggles.forEach(toggle => {
        const category = toggle.dataset.category;
        toggle.checked = this.isCategoryEnabled(category);
      });

      const itemToggles = this.banner ? this.banner.querySelectorAll('.consent-item__toggle') : [];
      itemToggles.forEach(toggle => {
        const scriptFile = toggle.dataset.script;
        toggle.checked = this.preferences[scriptFile] || false;
      });

      // Update modal toggles
      const settingsCategoryToggles = this.modal ? this.modal.querySelectorAll('.settings-category__toggle') : [];
      settingsCategoryToggles.forEach(toggle => {
        const category = toggle.dataset.category;
        toggle.checked = this.isCategoryEnabled(category);
      });

      const settingsItemToggles = this.modal ? this.modal.querySelectorAll('.settings-item__toggle') : [];
      settingsItemToggles.forEach(toggle => {
        const scriptFile = toggle.dataset.script;
        toggle.checked = this.preferences[scriptFile] || false;
      });
    },

    isCategoryEnabled: function(category) {
      return this.consentData.items.every(item => {
        if (this.getItemCategory(item) === category) {
          return this.preferences[item.script_file] || false;
        }
        return true;
      });
    },

    updateScripts: function() {
      this.consentData.items.forEach(item => {
        if (item.script_file) {
          const enabled = this.preferences[item.script_file] || false;
          if (enabled) {
            this.enableScript(item.script_file);
          } else {
            this.disableScript(item.script_file);
          }
        }
      });
    },

    enableAllScripts: function() {
      this.consentData.items.forEach(item => {
        if (item.script_file && item.script_file !== 'cookie-consent.js') {
          this.enableScript(item.script_file);
        }
      });
    },

    enableEssentialScripts: function() {
      this.consentData.items.forEach(item => {
        if (item.is_functional && item.script_file && item.script_file !== 'cookie-consent.js') {
          this.enableScript(item.script_file);
        }
      });
    },

    loadScripts: function() {
      this.enableEssentialScripts();
    },

    enableScript: function(scriptFile) {
      const existing = document.querySelector(`script[data-consent="${scriptFile}"]`);
      if (existing) existing.remove();

      const script = document.createElement('script');
      script.src = `/js/${scriptFile}`;
      script.async = true;
      script.setAttribute('data-consent', scriptFile);
      document.head.appendChild(script);
    },

    disableScript: function(scriptFile) {
      const script = document.querySelector(`script[data-consent="${scriptFile}"]`);
      if (script) script.remove();
    },

    bindEvents: function() {
      // Button clicks with delegation
      document.addEventListener('click', (e) => {
        if (e.target.id === 'accept-all') {
          e.preventDefault();
          this.acceptAll();
        } else if (e.target.id === 'accept-essential') {
          e.preventDefault();
          this.acceptEssential();
        } else if (e.target.id === 'reject-all') {
          e.preventDefault();
          this.rejectAll();
        } else if (e.target.id === 'close-consent') {
          e.preventDefault();
          console.log('Close consent clicked');
          this.hideBanner();
        } else if (e.target.id === 'cookie-settings-btn') {
          e.preventDefault();
          this.showSettings();
        } else if (e.target.id === 'close-settings') {
          e.preventDefault();
          this.hideSettings();
        } else if (e.target.id === 'save-settings') {
          e.preventDefault();
          this.savePreferences();
          this.hideSettings();
        } else if (e.target.id === 'reset-settings') {
          e.preventDefault();
          this.preferences = this.getDefaultPreferences();
          this.savePreferences();
          this.updateUI();
        } else if (e.target.closest('.consent-category__header, .settings-category__header')) {
          const header = e.target.closest('.consent-category__header, .settings-category__header');
          if (e.target.type !== 'checkbox' && header) {
            const category = header.dataset.category;
            const details = document.getElementById(`details-${category}`) || document.getElementById(`settings-details-${category}`);
            const toggle = header.querySelector('input[type="checkbox"]');
            if (details && toggle) {
              details.classList.toggle('show');
              toggle.checked = !toggle.checked;
              this.updatePreferences(category, toggle.checked);
            }
          }
        }
      });

      // Toggle changes
      document.addEventListener('change', (e) => {
        if (e.target.matches('.consent-category__toggle, .settings-category__toggle')) {
          const category = e.target.dataset.category;
          this.updatePreferences(category, e.target.checked);
        } else if (e.target.matches('.consent-item__toggle, .settings-item__toggle')) {
          const scriptFile = e.target.dataset.script;
          this.updateItemPreference(scriptFile, e.target.checked);
        }
      });

      // Modal outside click
      if (this.modal) {
        this.modal.addEventListener('click', (e) => {
          if (e.target === this.modal) {
            this.hideSettings();
          }
        });
      }

      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (this.modal && this.modal.classList.contains('show')) {
            this.hideSettings();
          } else if (this.banner && this.banner.style.display === 'block') {
            this.hideBanner();
          }
        }
      });
    }
  };

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      consentManager.init();
    });
  } else {
    consentManager.init();
  }
})();
