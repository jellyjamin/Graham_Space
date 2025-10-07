// Cookie Consent Management
(function() {
  'use strict';

  // Only define if not already defined
  if (typeof CookieConsent !== 'undefined') {
    return;
  }

  class CookieConsent {
    constructor() {
      this.consentKey = 'cookie_consent';
      this.preferencesKey = 'cookie_preferences';
      this.consentData = null;
      this.preferences = null;
      this.banner = null;
      this.modal = null;
      this.settingsBtn = null;
      
      this.init();
    }

    init() {
      this.banner = document.getElementById('consent-banner');
      this.modal = document.getElementById('cookie-settings-modal');
      this.settingsBtn = document.getElementById('cookie-settings-btn');
      
      this.loadConsentData();
      this.loadPreferences();
      this.checkConsent();
      this.bindEvents();
      this.loadScripts();
    }

    loadConsentData() {
      // Load consent configuration from global variable set by Hugo template
      if (window.consentData && window.consentData.items && Array.isArray(window.consentData.items)) {
        this.consentData = window.consentData;
      } else {
        // Fallback to hardcoded data if API fails
        this.consentData = this.getFallbackConsentData();
      }
      // Removed loadScripts() call from here to ensure preferences are loaded first
    }

    getFallbackConsentData() {
      return {
        items: [
          {
            title: "Essential Website Functionality",
            description: "These scripts are essential for the basic functionality of our website, including navigation, user authentication, and core features. They do not collect personal data and are required for the website to operate properly.",
            is_functional: true,
            script_file: "essential.js"
          },
          {
            title: "Cookie Consent Management",
            description: "This script manages the cookie consent banner and user preferences. It stores your consent choices to ensure we respect your privacy preferences across your visits.",
            is_functional: true,
            script_file: "cookie-consent.js"
          },
          {
            title: "Search Functionality",
            description: "Enables the search feature on our website, allowing you to find content quickly. This script processes your search queries to provide relevant results.",
            is_functional: true,
            script_file: "search.js"
          },
          {
            title: "Google Analytics",
            description: "Google Analytics helps us understand how visitors interact with our website by collecting anonymous information such as pages visited, time spent on site, and traffic sources. This data helps us improve our website and user experience.",
            is_functional: false,
            script_file: "google-analytics.js"
          },
          {
            title: "Google Tag Manager",
            description: "Google Tag Manager helps us manage and deploy marketing tags on our website without modifying the code. It allows us to track various user interactions and events.",
            is_functional: false,
            script_file: "google-tag-manager.js"
          },
          {
            title: "Hotjar Analytics",
            description: "Hotjar provides heatmaps, session recordings, and user feedback tools to help us understand how users interact with our website. This helps us identify areas for improvement.",
            is_functional: false,
            script_file: "hotjar.js"
          },
          {
            title: "Facebook Pixel",
            description: "The Facebook Pixel helps us track conversions from Facebook ads and build targeted audiences for our marketing campaigns. It collects data about your interactions with our site.",
            is_functional: false,
            script_file: "facebook-pixel.js"
          },
          {
            title: "LinkedIn Insight Tag",
            description: "The LinkedIn Insight Tag helps us track conversions from LinkedIn ads and understand how you interact with our website through LinkedIn marketing efforts.",
            is_functional: false,
            script_file: "linkedin-insight.js"
          },
          {
            title: "Google Ads Conversion Tracking",
            description: "This script tracks conversions from Google Ads campaigns, helping us measure the effectiveness of our advertising spend and optimize our marketing strategies.",
            is_functional: false,
            script_file: "google-ads-tracking.js"
          },
          {
            title: "Twitter (X) Integration",
            description: "Twitter integration allows you to share content on Twitter and view embedded tweets. This script may collect data about your interactions with Twitter content on our site.",
            is_functional: false,
            script_file: "twitter.js"
          },
          {
            title: "Facebook Social Plugins",
            description: "Facebook social plugins (like, share, comment buttons) allow you to interact with Facebook directly from our website. This may collect information about your social media activity.",
            is_functional: false,
            script_file: "facebook-social.js"
          },
          {
            title: "YouTube Embeds",
            description: "YouTube embeds allow us to display videos on our website. This script may collect data about your video viewing behavior and interactions with YouTube content.",
            is_functional: false,
            script_file: "youtube-embeds.js"
          },
          {
            title: "Crisp Chat Support",
            description: "Crisp provides live chat support directly on our website. This script enables real-time communication with our support team and may collect data about your chat interactions.",
            is_functional: false,
            script_file: "crisp-chat.js"
          },
          {
            title: "Intercom Customer Support",
            description: "Intercom helps us provide customer support and engage with visitors through in-app messaging. This script may collect data about your support interactions and browsing behavior.",
            is_functional: false,
            script_file: "intercom.js"
          },
          {
            title: "Zendesk Support Widget",
            description: "Zendesk provides customer support services and help desk functionality. This script enables support ticket creation and may collect data about your support requests.",
            is_functional: false,
            script_file: "zendesk.js"
          },
          {
            title: "Google reCAPTCHA",
            description: "Google reCAPTCHA helps protect our website from spam and abuse by verifying that you are human. This script may collect data about your interactions to provide security.",
            is_functional: false,
            script_file: "recaptcha.js"
          },
          {
            title: "Cloudflare Web Analytics",
            description: "Cloudflare Web Analytics provides insights into website traffic and performance while respecting user privacy. It collects anonymous data about visitor behavior.",
            is_functional: false,
            script_file: "cloudflare-analytics.js"
          },
          {
            title: "Microsoft Clarity",
            description: "Microsoft Clarity provides user behavior analytics through heatmaps and session recordings to help us improve website usability and user experience.",
            is_functional: false,
            script_file: "microsoft-clarity.js"
          }
        ]
      };
    }

    loadPreferences() {
      const saved = localStorage.getItem(this.preferencesKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Validate the parsed preferences
          if (typeof parsed === 'object' && parsed !== null) {
            this.preferences = parsed;
          } else {
            throw new Error('Invalid preferences format');
          }
        } catch (e) {
          console.error('Error parsing cookie preferences:', e);
          this.preferences = this.getDefaultPreferences();
        }
      } else {
        this.preferences = this.getDefaultPreferences();
      }
    }

    getDefaultPreferences() {
      const defaultPrefs = {};
      if (this.consentData && this.consentData.items && Array.isArray(this.consentData.items)) {
        this.consentData.items.forEach(item => {
          if (item && item.script_file && typeof item.is_functional === 'boolean') {
            defaultPrefs[item.script_file] = item.is_functional;
          }
        });
      }
      return defaultPrefs;
    }

    checkConsent() {
      const consent = localStorage.getItem(this.consentKey);
      
      if (consent === 'accepted') {
        this.hideBanner();
        this.enableAllScripts();
      } else if (consent === 'rejected') {
        this.hideBanner();
        this.disableAllScripts();
      } else {
        this.showBanner();
      }
    }

    showBanner() {
      if (this.banner) {
        this.banner.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    }

    hideBanner() {
      console.log('hideBanner called');
      if (this.banner) {
        this.banner.remove();
        document.body.style.overflow = '';
        console.log('Banner removed');
      } else {
        console.log('Banner element not found');
      }
    }

    showSettings() {
      if (this.modal) {
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        if (this.settingsBtn) {
          this.settingsBtn.setAttribute('aria-expanded', 'true');
        }
      }
    }

    hideSettings() {
      if (this.modal) {
        this.modal.classList.remove('show');
        document.body.style.overflow = '';
        if (this.settingsBtn) {
          this.settingsBtn.setAttribute('aria-expanded', 'false');
        }
      }
    }

    acceptAll() {
      this.saveConsent('accepted');
      this.preferences = this.getDefaultPreferences();
      if (this.consentData && this.consentData.items && Array.isArray(this.consentData.items)) {
        this.consentData.items.forEach(item => {
          if (item && item.script_file) {
            this.preferences[item.script_file] = true;
          }
        });
      }
      this.savePreferences();
      this.hideBanner();
      this.enableAllScripts();
      this.updateUI();
    }

    acceptEssential() {
      this.saveConsent('accepted');
      this.preferences = this.getDefaultPreferences();
      if (this.consentData && this.consentData.items && Array.isArray(this.consentData.items)) {
        this.consentData.items.forEach(item => {
          if (item && item.script_file && typeof item.is_functional === 'boolean') {
            this.preferences[item.script_file] = item.is_functional;
          }
        });
      }
      this.savePreferences();
      this.hideBanner();
      this.enableEssentialScripts();
      this.updateUI();
    }

    rejectAll() {
      this.saveConsent('rejected');
      this.preferences = this.getDefaultPreferences();
      if (this.consentData && this.consentData.items && Array.isArray(this.consentData.items)) {
        this.consentData.items.forEach(item => {
          if (item && item.script_file && typeof item.is_functional === 'boolean') {
            this.preferences[item.script_file] = item.is_functional;
          }
        });
      }
      this.savePreferences();
      this.hideBanner();
      this.disableAllScripts();
      this.updateUI();
    }

    savePreferences() {
      if (this.preferences) {
        localStorage.setItem(this.preferencesKey, JSON.stringify(this.preferences));
        this.updateUI();
      }
    }

    saveConsent(status) {
      localStorage.setItem(this.consentKey, status);
    }

    updatePreferences(category, enabled) {
      if (!this.consentData || !this.consentData.items || !Array.isArray(this.consentData.items)) {
        return;
      }
      this.consentData.items.forEach(item => {
        if (item && this.getItemCategory(item) === category) {
          this.preferences[item.script_file] = enabled;
        }
      });
      this.savePreferences();
      this.updateScripts();
    }

    updateItemPreference(scriptFile, enabled) {
      if (this.preferences && scriptFile) {
        this.preferences[scriptFile] = enabled;
        this.savePreferences();
        this.updateScripts();
      }
    }

    getItemCategory(item) {
      if (!item || !item.script_file || typeof item.is_functional !== 'boolean') {
        return 'other';
      }
      
      if (item.is_functional) return 'essential';
      if (['google-analytics.js', 'google-tag-manager.js', 'hotjar.js', 'cloudflare-analytics.js', 'microsoft-clarity.js'].includes(item.script_file)) return 'analytics';
      if (['facebook-pixel.js', 'linkedin-insight.js', 'google-ads-tracking.js'].includes(item.script_file)) return 'marketing';
      if (['twitter.js', 'facebook-social.js', 'youtube-embeds.js', 'crisp-chat.js', 'intercom.js', 'zendesk.js'].includes(item.script_file)) return 'social';
      if (item.script_file === 'recaptcha.js') return 'essential';
      return 'other';
    }

    updateUI() {
      // Update banner UI
      const categoryToggles = this.banner ? this.banner.querySelectorAll('.consent-category__toggle') : [];
      const itemToggles = this.banner ? this.banner.querySelectorAll('.consent-item__toggle') : [];
      
      categoryToggles.forEach(toggle => {
        const category = toggle.dataset.category;
        const enabled = this.isCategoryEnabled(category);
        toggle.checked = enabled;
      });

      itemToggles.forEach(toggle => {
        const scriptFile = toggle.dataset.script;
        const enabled = this.preferences && this.preferences[scriptFile] || false;
        toggle.checked = enabled;
      });

      // Update settings modal UI
      const settingsCategoryToggles = this.modal ? this.modal.querySelectorAll('.settings-category__toggle') : [];
      const settingsItemToggles = this.modal ? this.modal.querySelectorAll('.settings-item__toggle') : [];
      
      settingsCategoryToggles.forEach(toggle => {
        const category = toggle.dataset.category;
        const enabled = this.isCategoryEnabled(category);
        toggle.checked = enabled;
      });

      settingsItemToggles.forEach(toggle => {
        const scriptFile = toggle.dataset.script;
        const enabled = this.preferences && this.preferences[scriptFile] || false;
        toggle.checked = enabled;
      });
    }

    isCategoryEnabled(category) {
      if (!this.consentData || !this.consentData.items || !Array.isArray(this.consentData.items) || !this.preferences) {
        return false;
      }
      
      return this.consentData.items.every(item => {
        if (item && this.getItemCategory(item) === category) {
          return this.preferences[item.script_file] || false;
        }
        return true;
      });
    }

    updateScripts() {
      if (!this.consentData || !this.consentData.items || !Array.isArray(this.consentData.items) || !this.preferences) {
        return;
      }
      
      this.consentData.items.forEach(item => {
        if (item && item.script_file) {
          const enabled = this.preferences[item.script_file] || false;
          if (enabled) {
            this.enableScript(item.script_file);
          } else {
            this.disableScript(item.script_file);
          }
        }
      });
    }

    enableAllScripts() {
      if (!this.consentData || !this.consentData.items || !Array.isArray(this.consentData.items)) {
        return;
      }
      
      this.consentData.items.forEach(item => {
        if (item && item.script_file) {
          this.enableScript(item.script_file);
        }
      });
    }

    enableEssentialScripts() {
      if (!this.consentData || !this.consentData.items || !Array.isArray(this.consentData.items)) {
        return;
      }
      
      this.consentData.items.forEach(item => {
        if (item && item.is_functional && item.script_file) {
          this.enableScript(item.script_file);
        }
      });
    }

    disableAllScripts() {
      if (!this.consentData || !this.consentData.items || !Array.isArray(this.consentData.items)) {
        return;
      }
      
      this.consentData.items.forEach(item => {
        if (item && item.script_file) {
          this.disableScript(item.script_file);
        }
      });
    }

    enableScript(scriptFile) {
      if (scriptFile === 'cookie-consent.js' || scriptFile === 'consent-api.js') {
        return; // Avoid self-loading
      }
      // Remove existing script if present
      const existingScript = document.querySelector(`script[data-consent-script="${scriptFile}"]`);
      if (existingScript) {
        existingScript.remove();
      }

      // Add script to head
      const script = document.createElement('script');
      script.src = `/js/${scriptFile}`;
      script.async = true;
      script.setAttribute('data-consent-script', scriptFile);
      document.head.appendChild(script);
    }

    disableScript(scriptFile) {
      const script = document.querySelector(`script[data-consent-script="${scriptFile}"]`);
      if (script) {
        script.remove();
      }
    }

    loadScripts() {
      // Load essential scripts immediately
      if (!this.consentData || !this.consentData.items || !Array.isArray(this.consentData.items) || !this.preferences) {
        return;
      }
      
      this.consentData.items.forEach(item => {
        if (item && item.is_functional && item.script_file && (this.preferences[item.script_file] !== false)) {
          this.enableScript(item.script_file);
        }
      });
    }

    bindEvents() {
      // Direct event binding for known elements
      const acceptAllBtn = document.getElementById('accept-all');
      const acceptEssentialBtn = document.getElementById('accept-essential');
      const rejectAllBtn = document.getElementById('reject-all');
      const closeConsentBtn = document.getElementById('close-consent');
      const settingsBtn = document.getElementById('cookie-settings-btn');
      const closeSettingsBtn = document.getElementById('close-settings');
      const saveSettingsBtn = document.getElementById('save-settings');
      const resetSettingsBtn = document.getElementById('reset-settings');

      // Banner events
      if (acceptAllBtn) {
        acceptAllBtn.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('Accept All clicked');
          this.acceptAll();
        });
      }
      if (acceptEssentialBtn) {
        acceptEssentialBtn.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('Accept Essential clicked');
          this.acceptEssential();
        });
      }
      if (rejectAllBtn) {
        rejectAllBtn.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('Reject All clicked');
          this.rejectAll();
        });
      }
      if (closeConsentBtn) {
        closeConsentBtn.addEventListener('click', (e) => {
          e.preventDefault();
          console.log('Close consent clicked');
          this.hideBanner();
        });
      }

      // Settings modal events
      if (settingsBtn) {
        settingsBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.showSettings();
        });
      }
      if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.hideSettings();
        });
      }
      if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.savePreferences();
          this.hideSettings();
        });
      }
      if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.preferences = this.getDefaultPreferences();
          this.savePreferences();
          this.updateUI();
          this.updateScripts();
        });
      }

      // Category toggle events
      document.addEventListener('change', (e) => {
        if (e.target.matches('.consent-category__toggle, .settings-category__toggle')) {
          const category = e.target.dataset.category;
          const enabled = e.target.checked;
          this.updatePreferences(category, enabled);
        }
      });

      // Item toggle events
      document.addEventListener('change', (e) => {
        if (e.target.matches('.consent-item__toggle, .settings-item__toggle')) {
          const scriptFile = e.target.dataset.script;
          const enabled = e.target.checked;
          this.updateItemPreference(scriptFile, enabled);
        }
      });

      // Category header click events (fallback delegation)
      document.addEventListener('click', (e) => {
        if (e.target.closest('.consent-category__header, .settings-category__header')) {
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

      // Close modal on outside click
      if (this.modal) {
        this.modal.addEventListener('click', (e) => {
          if (e.target === this.modal) {
            this.hideSettings();
          }
        });
      }

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (this.modal && this.modal.classList.contains('show')) {
            this.hideSettings();
          } else if (this.banner && this.banner.classList.contains('show')) {
            this.hideBanner();
          }
        }
      });
    }
  }

  // Initialize cookie consent when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new CookieConsent();
    });
  } else {
    new CookieConsent();
  }

})();
