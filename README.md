# RACQ Solar Estimator Help Guide Component

A floating, draggable help guide panel for the RACQ Solar Estimator application, designed for internal staff use.

## Features

- **Floating Panel**: Draggable and resizable help guide window
- **Fixed Question Mark Icon**: Proper '?' symbol in yellow circle
- **Accordion Navigation**: Collapsible sections (closed by default)
- **Search Functionality**: Quick topic search across all content
- **UK/Australian English**: Localised spelling and terminology
- **Staff-Oriented Content**: Written for internal team use
- **Responsive Design**: Adapts to mobile and desktop screens

## Usage in WeWeb

### Properties

- `visible` (Boolean): Controls the visibility of the help guide
- `activeSection` (String): Pre-open a specific section by title

### Events

- `help:opened`: Emitted when the help guide is opened
- `help:closed`: Emitted when the help guide is closed

### Implementation

1. Add the component to your WeWeb page
2. Listen for the `toggle:help` event from the header component
3. Set up workflows to manage visibility

### Example Workflow

```javascript
// Toggle help guide when header button is clicked
On header 'toggle:help' event:
  - Execute component action: toggleHelp

// Or manually control visibility
On custom trigger:
  - Set component.visible = true/false
```

## Content Sections

1. **Personal Information**: Customer data entry guidelines
2. **System Preferences & Energy Usage**: System configuration and consumption analysis
3. **House Details**: Property specifications and installation considerations
4. **Package Selection**: System sizing and package recommendations
5. **Quote Summary**: Final review and next steps

## Features

### Draggable Window
- Click and drag the header to reposition
- Window stays within viewport bounds
- Position persists during session

### Resizable
- Drag the bottom-right corner to resize
- Minimum size: 400x300px
- Maximum size: 90% of viewport

### Search
- Real-time filtering of help topics
- Searches both titles and content
- Highlights matching sections

### Accordion Navigation
- All sections closed by default
- Single section open at a time
- Smooth expand/collapse animations

## Styling

- RACQ Solar brand colours (#001f3f, #FFE600)
- Consistent with header component design
- Professional dark theme
- Clear visual hierarchy

## Support

For assistance, contact: automations@racqsolar.com.au

## Development

To update this component:

1. Clone the repository
2. Make changes to `src/wwElement.vue`
3. Update version in `package.json`
4. Push directly to main branch
5. Wait 2-3 minutes for WeWeb to rebuild
