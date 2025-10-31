# Programming Language Guide System

## Overview

The Programming Language Guide System is a comprehensive sidebar navigation component for Hugo blogs that provides an organized, accessible, and interactive way to present programming language tutorials and guides. This system supports deep linking, state persistence, and responsive design while maintaining compatibility with the Stack theme.

## Features

### Core Functionality
- **Collapsible Navigation**: "Intro to Tech" section with dropdown functionality
- **Dual Interaction States**: 
  - Click language title → Navigate to main tutorial page
  - Click dropdown arrow → Reveal lesson submenu
- **Modular Structure**: Easy to add/edit programming languages and lessons
- **Deep Linking**: Bookmark specific lesson pages with URL hash support
- **State Persistence**: Remembers open sections across page refreshes
- **Responsive Design**: Mobile-optimized with touch-friendly interactions

### Accessibility Features
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Keyboard Navigation**: Full keyboard accessibility with arrow keys and Enter
- **High Contrast Mode**: Automatic adaptation for accessibility
- **Reduced Motion**: Respects user's motion preferences
- **Focus Management**: Clear visual focus indicators

### Visual Design
- **Theme Integration**: Matches Stack theme design patterns
- **Visual Hierarchy**: Clear distinction between main topics and subtopics
- **Color Coding**: Language-specific colors for easy identification
- **Smooth Animations**: CSS transitions with graceful degradation
- **Loading States**: Visual feedback for better user experience

## File Structure

```
├── data/
│   └── programming-languages.yaml          # Configuration file
├── layouts/
│   └── partials/
│       └── widget/
│           └── programming-languages.html  # Hugo template
├── static/
│   └── js/
│       └── tech-guide.js                   # JavaScript functionality
└── assets/
    └── scss/
        ├── style.scss                      # Main stylesheet
        └── components/
            └── _tech-guide.scss            # Component styles
```

## Configuration

### Data Structure (`data/programming-languages.yaml`)

The main configuration file defines all programming languages, their sections, and behavior settings.

#### Basic Structure
```yaml
enabled: true                              # Enable/disable the widget
title: "Intro to Tech"                     # Widget title
description: "Programming language guides"  # Widget description

# Programming languages
languages:
  - id: "python"                           # Unique identifier
    name: "Python"                         # Display name
    slug: "intro-to-python"                # URL slug
    description: "Learn Python..."         # Brief description
    icon: "code"                           # SVG icon identifier
    color: "#3776ab"                       # Brand color
    difficulty: "Beginner"                 # Difficulty level
    estimatedTime: "4-6 weeks"             # Estimated completion time
    
    # Main navigation (clicking language title)
    mainNavigation:
      url: "/p/intro-to-python/"
      title: "Complete Python Tutorial"
      description: "Start your Python journey..."
    
    # Submenu sections (clicking dropdown arrow)
    sections:
      - id: "variables"                    # Section identifier
        title: "Variables & Data Types"    # Display title
        url: "/p/intro-to-python/#variables-data-types"
        description: "Understanding Python variables..."
        order: 1                           # Display order
```

#### Customization Options

```yaml
customization:
  animations:
    duration: 300         # Animation duration in ms
    easing: "ease-in-out" # CSS easing function
    enable: true          # Enable/disable animations
  
  styling:
    showProgress: true       # Show progress indicators
    showDifficulty: true     # Show difficulty badges
    showEstimatedTime: true  # Show time estimates
    compactMode: false       # Compact layout mode
  
  behavior:
    persistState: true        # Save open states to localStorage
    deepLinking: true         # Enable URL hash navigation
    autoExpandActive: true    # Auto-expand sections based on URL
    keyboardNavigation: true  # Enable keyboard controls
  
  responsive:
    mobileBreakpoint: 768   # Mobile breakpoint in px
    tabletBreakpoint: 1024  # Tablet breakpoint in px
```

### Adding New Programming Languages

1. **Edit Configuration**: Add new language to `data/programming-languages.yaml`
2. **Create Content**: Create corresponding tutorial content in `content/`
3. **Update URLs**: Ensure all URLs in configuration match your content structure

Example: Adding Java
```yaml
- id: "java"
  name: "Java"
  slug: "intro-to-java"
  description: "Enterprise-grade programming with Java"
  icon: "code"
  color: "#007396"
  difficulty: "Intermediate"
  estimatedTime: "5-7 weeks"
  
  mainNavigation:
    url: "/p/intro-to-java/"
    title: "Complete Java Tutorial"
    description: "Learn Java for enterprise development"
  
  sections:
    - id: "setup"
      title: "Environment Setup"
      url: "/p/intro-to-java/#environment-setup"
      description: "Installing Java and IDE setup"
      order: 1
```

### Managing Content Structure

#### Content Organization
```
content/
├── p/
│   ├── intro-to-python/
│   │   ├── index.md          # Main Python tutorial page
│   │   └── sections/         # Individual lesson pages (optional)
│   ├── intro-to-javascript/
│   │   ├── index.md          # Main JavaScript tutorial page
│   │   └── sections/
│   └── intro-to-go/
│       ├── index.md          # Main Go tutorial page
│       └── sections/
```

#### URL Hash Linking
The system automatically handles deep linking using URL hashes:

- Direct link to section: `/p/intro-to-python/#variables-data-types`
- Auto-expands corresponding language section
- Scrolls to linked section on page load

## Hugo Integration

### Widget Configuration
Add the widget to your `hugo.toml`:

```toml
[params.widgets]
    homepage = [
        {type = "search"},
        {type = "programming-languages"},
        {type = "archives", params = {limit = 5}},
        {type = "categories", params = {limit = 10}},
        {type = "tag-cloud", params = {limit = 10}}
    ]
    page = [
        {type = "programming-languages"},
        {type = "toc"}
    ]
```

### Available Widget Positions
- `homepage`: Shows on the homepage sidebar
- `page`: Shows on individual article/post pages
- `list`: Shows on category/tag listing pages (if needed)

## Customization

### CSS Custom Properties
The system uses CSS custom properties for easy theming:

```css
.tech-guide-widget {
    --tech-guide-primary: var(--accent-color);
    --tech-guide-text: var(--card-text-color-main);
    --tech-guide-background: var(--card-background);
    /* Modify these values to change appearance */
}
```

### Responsive Breakpoints
Customize responsive behavior:

```yaml
customization:
  responsive:
    mobileBreakpoint: 768    # Mobile optimization
    tabletBreakpoint: 1024   # Tablet optimization
```

### Animation Customization
Control animations:

```yaml
customization:
  animations:
    duration: 300      # Animation duration
    easing: "cubic-bezier(0.4, 0, 0.2, 1)"  # Custom easing
    enable: true       # Enable/disable all animations
```

## JavaScript API

The system provides a JavaScript API for advanced customization:

### Manual Control
```javascript
// Get widget instance
const widget = document.querySelector('.tech-guide-container');
const techGuide = window.TechGuideWidget?.getInstance(widget);

// Open specific language section
techGuide.openLanguage('python');

// Close specific language section
techGuide.closeLanguage('python');

// Handle custom events
document.addEventListener('tech-guide:section-opened', (e) => {
    console.log('Section opened:', e.detail);
});
```

### Event System
- `tech-guide:section-opened`: Fired when a section opens
- `tech-guide:section-closed`: Fired when a section closes
- `tech-guide:language-navigated`: Fired when language title is clicked

## Accessibility Features

### ARIA Implementation
- **aria-expanded**: Toggle button state
- **aria-controls**: Links toggle to sections
- **aria-labelledby**: Proper labeling for screen readers
- **role="region"**: Identifies collapsible sections

### Keyboard Navigation
- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate dropdown toggles
- **Arrow Up/Down**: Navigate between items
- **Escape**: Close all open sections

### Screen Reader Support
- Semantic HTML structure
- Hidden descriptive text for complex interactions
- Proper heading hierarchy
- Focus management

## Performance Optimization

### Efficient Loading
- **Lazy Initialization**: Widget initializes only when DOM is ready
- **Event Delegation**: Efficient event handling
- **Debounced Resize**: Optimized window resize handling
- **Memory Management**: Proper cleanup on page navigation

### Animation Performance
- **CSS Transforms**: Hardware-accelerated animations
- **Reduced Motion**: Respects user preferences
- **Progressive Enhancement**: Works without JavaScript

## Browser Support

### Modern Browsers (Full Feature Support)
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Older Browsers (Graceful Degradation)
- Basic functionality without animations
- Static content display
- Keyboard navigation support

## Troubleshooting

### Common Issues

#### Widget Not Appearing
1. Check `data/programming-languages.yaml` `enabled: true`
2. Verify widget is included in `hugo.toml` configuration
3. Ensure Hugo build completes without errors

#### JavaScript Not Working
1. Check browser console for errors
2. Verify `static/js/tech-guide.js` is loading
3. Ensure no conflicting JavaScript

#### Styling Issues
1. Check `assets/scss/style.scss` imports
2. Verify CSS compilation in Hugo build
3. Check for theme CSS conflicts

#### Accessibility Problems
1. Test with screen reader software
2. Verify keyboard navigation works
3. Check ARIA attributes in browser dev tools

### Debug Mode
Enable debug mode by adding to configuration:
```yaml
customization:
  behavior:
    debug: true  # Enables console logging
```

## Maintenance

### Regular Tasks
1. **Content Updates**: Keep tutorial content current
2. **Link Verification**: Check all internal links work
3. **Performance Monitoring**: Monitor loading times
4. **Accessibility Testing**: Regular screen reader testing

### Content Management
1. **Version Control**: Track configuration changes
2. **Backup**: Regular backups of configuration files
3. **Testing**: Test changes in development environment
4. **Documentation**: Update this documentation when making changes

## Advanced Features

### Progressive Enhancement
The system works without JavaScript:
- Static HTML navigation
- Direct links to tutorials and sections
- Basic accessibility through semantic HTML

### Custom Events
Listen for system events:
```javascript
document.addEventListener('tech-guide:section-opened', (e) => {
    // Custom handling for opened sections
    const { languageId, sectionId } = e.detail;
    // Your custom logic here
});
```

### State Management
Advanced state handling:
```javascript
// Get current state
const state = techGuide.getState();

// Set state programmatically
techGuide.setState({
    openLanguages: ['python', 'javascript'],
    currentSection: 'variables'
});

// Clear state
techGuide.clearState();
```

## Integration Examples

### With Hugo Shortcodes
Create custom shortcodes for programming tutorials:
```html
<!-- layouts/shortcodes/programming-section.html -->
<div class="programming-section" id="{{ .Get "id" }}">
    <h2>{{ .Get "title" }}</h2>
    <p>{{ .Inner }}</p>
</div>
```

### With Hugo Taxonomies
Tag content by programming language:
```yaml
---
title: "Variables and Data Types"
tags: ["python", "programming-basics"]
categories: ["python-tutorial"]
---
```

This comprehensive guide provides everything needed to implement, configure, and maintain the Programming Language Guide System on your Hugo blog.