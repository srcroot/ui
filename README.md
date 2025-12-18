# @srcroot/ui

A UI library with polymorphic, accessible React components.
This library provides a collection of re-usable components that you can copy and paste into your apps.

## Features

- **Polymorphic**: Most components support an `as` prop (e.g., render a `Button` as an `a` tag).
- **Accessible**: Built on standard HTML elements and WAI-ARIA patterns.
- **Copy/Paste**: Not a dependency you install, but code you own.
- **Styled**: Beautiful defaults using Tailwind CSS and `class-variance-authority`.

## Installation

This library is distributed via a CLI that initializes your project and adds components directly to your source code.

### 1. Initialize

Run the `init` command to set up the necessary dependencies and structural files (like `cn` utility) in your project.

```bash
npx @srcroot/ui init
```

This will ask a few questions to configure your project structure (e.g., where to put components).

### 2. Add Components

Use the `add` command to install components. You can do this in three ways:

**Interactive Mode:**
Run without arguments to select components from a list.
```bash
npx @srcroot/ui add
```

**Specific Components:**
Add one or more components by name.
```bash
npx @srcroot/ui add button card input
```

**Add All:**
Install every available component at once.
```bash
npx @srcroot/ui add --all
```

This will copy the component files to your `components/ui` directory and install any necessary peer dependencies (like `react-icons` or `clsx`).

### 3. Usage

Import components directly from your project folder:

```tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <Button variant="destructive" onClick={() => alert("Clicked!")}>
      Click Me
    </Button>
  )
}
```

## Available Components

run `npx @srcroot/ui list` to see all available components.

### Core
- `button` - Polymorphic button with variants.
- `badge` - Status indicators.
- `avatar` - User profile images with fallbacks.
- `separator` - Visual divider.
- `button-group` - Attached or spaced button sets.

### Forms
- `input` - Basic text input.
- `textarea` - Multi-line text input.
- `checkbox` - Toggle selection.
- `radio` - Single selection from list.
- `switch` - Toggle switch.
- `select` - Dropdown selection.
- `slider` - Range input.
- `otp-input` - One-time password verification.
- `search` - Search input with debounce support.
- `calendar` - Date and range picker.

### Layout
- `card` - Content container with header/content/footer.
- `container` - Centered layout wrapper.
- `aspect-ratio` - Maintain element proportions.

### Data Display
- `text` - Polymorphic typography component.
- `label` - Accessible form label.
- `table` - Responsive data table.
- `accordion` - Collapsible content sections.
- `collapsible` - Expandable panel.
- `tabs` - Tabbed content switcher.
- `progress` - Progress bar.
- `skeleton` - Loading placeholder state.
- `image` - Enhanced img with fallback and loading state.
- `carousel` - Content slider with autoplay.

### Feedback
- `loading-spinner` - SVG spinner with variants.
- `star-rating` - Interactive rating component.
- `toast` - Transient notifications.
- `alert` - Critical information banner.

### Overlays
- `dialog` - Modal dialog.
- `alert-dialog` - Modal for confirming actions.
- `sheet` - Side-panel overlay.
- `popover` - Content appearing over trigger.
- `tooltip` - Hover information.
- `dropdown-menu` - Menu for actions/navigation.

### Navigation
- `breadcrumb` - Navigation trail.
- `pagination` - Page navigation controls.

## Polymorphism

Our components accept an `as` prop to change the underlying HTML element while maintaining styles and behavior.

```tsx
// Renders as an <a> tag but looks like a button
<Button as="a" href="/login">
  Login
</Button>

// Renders as a specialized text variant
<Text as="h1" variant="h1">
  Page Title
</Text>
```

## Local Development

To run the documentation/playground locally:

```bash
cd examples/playground
npm install
npm run dev
```

Visit `http://localhost:3001` to view the component showcase.
