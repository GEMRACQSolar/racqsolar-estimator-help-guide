# RACQ Solar Estimator Help Guide Component

A WeWeb component that displays a help guide popup for the RACQ Solar Estimator application.

## Features

- **Modal Popup**: Full-screen overlay with centered content
- **Responsive Design**: Adapts to mobile and desktop screens
- **Keyboard Support**: Close with ESC key
- **Smooth Animations**: Fade in/out transitions
- **Comprehensive Content**: Step-by-step guide for using the estimator

## Usage in WeWeb

### Properties

- `visible` (Boolean): Controls the visibility of the help guide popup

### Events

- `close:help-guide`: Emitted when the help guide is closed

### Implementation

1. Add the component to your WeWeb page
2. Bind the `visible` property to a variable (default: false)
3. Listen for the `show:help-guide` event from the header component to set `visible` to true
4. Listen for the `close:help-guide` event to set `visible` to false

### Example Workflow

```javascript
// Show help guide when header button is clicked
On header 'show:help-guide' event:
  - Set helpGuideVisible = true

// Hide help guide when closed
On help-guide 'close:help-guide' event:
  - Set helpGuideVisible = false
```

## Content Sections

1. **Getting Started**: Essential steps for generating an estimate
2. **Using the Sales Coach**: Requirements and functionality
3. **Additional Information**: Optional fields explanation
4. **Generating Your Packages**: How to create package options
5. **Interactive Features**: Chat interface and dynamic questions
6. **Finalizing Your Quote**: Step-by-step quote generation process
7. **What Happens Next**: Post-estimate workflow

## Styling

- Matches RACQ Solar brand colors (#001f3f, #FFE600)
- Consistent with header component design
- Custom scrollbar styling
- Highlighted buttons and important information

## Development

To update this component:

1. Clone the repository
2. Make changes to `src/wwElement.vue`
3. Update version in `package.json`
4. Push directly to main branch (do not use branches for WeWeb components)
5. Wait 2-3 minutes for WeWeb to rebuild

## Support

For issues or questions, contact the RACQ Solar development team.
