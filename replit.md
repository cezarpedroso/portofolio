# Portfolio Website - Project Documentation

## Overview

This is a modern, professional portfolio website for Cezar Pedroso, a Software Engineering and IT student. The site features a sleek black theme with interactive elements, GitHub integration, and responsive design. Built using vanilla web technologies for simplicity and performance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure Client-Side Application**: Built with vanilla HTML5, CSS3, and JavaScript
- **Static Site Design**: No backend server required, suitable for static hosting
- **Component-Based CSS**: Modular CSS structure with CSS custom properties for theming
- **Mobile-First Responsive Design**: CSS Grid and Flexbox for layout management

### Technology Stack
- **Core Technologies**: HTML5, CSS3, Vanilla JavaScript
- **Styling Framework**: Custom CSS with modern features (Grid, Flexbox, Custom Properties)
- **Icon Library**: Font Awesome 6.0
- **Typography**: Google Fonts (Inter family)
- **API Integration**: GitHub REST API for dynamic repository data

## Key Components

### 1. Navigation System
- **Fixed Header Navigation**: Sticky navigation bar with smooth scrolling
- **Mobile-Responsive Menu**: Hamburger menu for mobile devices
- **Interactive Elements**: Hover effects and active states

### 2. Custom Cursor System
- **Dual-Layer Cursor**: Primary cursor with trailing follower effect
- **Smooth Animation**: RequestAnimationFrame-based smooth movement
- **Device Detection**: Disabled on mobile devices for better UX

### 3. GitHub Integration
- **Repository Fetching**: Dynamic loading of GitHub repositories via REST API
- **Project Display**: Automated project showcase from GitHub data
- **Rate Limiting Awareness**: Handles GitHub API rate limits gracefully

### 4. Responsive Design System
- **Breakpoint Strategy**: Mobile-first approach with progressive enhancement
- **Flexible Layouts**: CSS Grid for complex layouts, Flexbox for components
- **Typography Scaling**: Responsive font sizing using clamp() functions

## Data Flow

### 1. Initial Page Load
```
HTML Load → CSS Parsing → JavaScript Execution → Cursor Initialization → GitHub API Call
```

### 2. GitHub Data Integration
```
API Request → JSON Response → Data Processing → DOM Manipulation → UI Update
```

### 3. User Interactions
```
User Input → Event Listeners → Animation Triggers → State Updates → Visual Feedback
```

## External Dependencies

### 1. Font Resources
- **Google Fonts API**: Inter font family (weights 300-700)
- **Font Awesome CDN**: Icon library v6.0 for social and UI icons

### 2. GitHub API
- **Endpoint**: `https://api.github.com/users/{username}/repos`
- **Rate Limits**: 60 requests per hour for unauthenticated requests
- **No Authentication**: Uses public API endpoints only

### 3. CDN Dependencies
- Font Awesome CSS loaded from cdnjs.cloudflare.com
- Google Fonts loaded from fonts.googleapis.com

## Deployment Strategy

### 1. Static Hosting Optimized
- **Primary Target**: GitHub Pages deployment
- **No Build Process**: Direct file serving, no compilation required
- **Asset Organization**: All assets in root directory for simple hosting

### 2. Local Development
- **Simple Server**: Any static file server (Python http.server, Node serve, etc.)
- **No Dependencies**: No package.json or build tools required
- **Direct File Access**: Can run directly from file system for basic testing

### 3. Performance Considerations
- **Minimal Dependencies**: Only essential external resources loaded
- **CSS Custom Properties**: Efficient theming and maintenance
- **Optimized Animations**: RequestAnimationFrame for smooth performance
- **Lazy Loading Ready**: Structure supports progressive enhancement

### 4. Browser Compatibility
- **Modern Browser Focus**: Uses modern CSS features (Grid, Custom Properties)
- **Graceful Degradation**: Core functionality works without JavaScript
- **Mobile Optimization**: Touch-friendly interface with appropriate sizing

## Configuration Notes

### 1. GitHub Integration
- Username configured in `script.js` as `GITHUB_USERNAME` constant
- API URL constructed dynamically for repository fetching
- Error handling for API failures and rate limiting

### 2. Styling System
- CSS custom properties defined in `:root` for easy theming
- Color scheme optimized for dark theme with accent colors
- Transition and animation timing centrally managed

### 3. Responsive Breakpoints
- Mobile-first approach with progressive enhancement
- Flexible grid systems for various screen sizes
- Touch-optimized interactive elements for mobile devices