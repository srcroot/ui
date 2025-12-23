# Developer Guide

Welcome to the `@srcroot/ui` developer guide. This document explains how to contribute new themes and UI components to the library.

## Adding New Themes

The UI library supports both Tailwind v3 and v4. When adding a new theme, you must implement it for both versions.

### 1. Create Theme Files

Create your new theme CSS files in the registry directories:

- **Tailwind v3**: `src/registry/themes/v3/[theme-name].css`
- **Tailwind v4**: `src/registry/themes/v4/[theme-name].css`

**Example (v3):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    /* ... other variables ... */
  }
}
```

**Example (v4):**
```css
@import "tailwindcss";

:root {
  --background: hsl(0 0% 100%);
  /* ... other variables ... */
}
```

### 2. Register the Theme

Update the CLI theme service to include your new theme.

- File: `src/cli/services/theme-service.ts`
- Add your theme to the `THEME_METADATA` constant:

```typescript
const THEME_METADATA: Record<string, { name: string; description: string }> = {
  // ... existing themes
  [theme-name]: { name: "Theme Name", description: "Theme Description" },
}
```

## Adding New UI Components

UI components are located in the registry directory.

### 1. Create Component File

Add your component file to: `src/registry/ui/[component-name].tsx`

### 3. Implementation Guidelines

- **Architecture**: Follow SOLID principles. Components should have a single responsibility and be open for extension but closed for modification.
- **Dependencies**: Keep dependencies to a minimum.
  - ❌ Avoid `radix-ui` primitives unless absolutely necessary. Build custom solutions where possible.
  - ❌ Avoid `lucide-react` or other icon libraries and SVGs directly. Use `react-icons` or allow consumers to pass icons as props.
- **Polymorphism**: Enable polymorphism using the `asChild` prop pattern with our internal `Slot` component.
  ```tsx
  import { Slot } from "@/registry/ui/slot"
  // ...
  if (asChild) {
    return <Slot {...props}>{children}</Slot>
  }
  ```
- **Styling**: Use Tailwind CSS classes. Avoid inline styles.
- **Utils**: Use `cn` (clsx + tailwind-merge) for class name merging.
- **Exports**: Export the component and any relevant sub-components.

**Example:**
```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const MyComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-background text-foreground", className)}
      {...props}
    />
  )
)
MyComponent.displayName = "MyComponent"

export { MyComponent }
```
