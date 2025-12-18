export type ComponentName =
    | "button"
    | "badge"
    | "avatar"
    | "separator"
    | "text"
    | "label"
    | "input"
    | "textarea"
    | "checkbox"
    | "radio"
    | "switch"
    | "slider"
    | "select"
    | "card"
    | "container"
    | "aspect-ratio"
    | "accordion"
    | "tabs"
    | "table"
    | "progress"
    | "skeleton"
    | "dialog"
    | "alert-dialog"
    | "sheet"
    | "popover"
    | "tooltip"
    | "dropdown-menu"
    | "toast"
    | "alert"
    | "breadcrumb"
    | "pagination"
    // New components
    | "loading-spinner"
    | "image"
    | "button-group"
    | "otp-input"
    | "search"
    | "star-rating"
    | "collapsible"
    | "carousel"
    | "calendar"
    | "sidebar"
    // Added components
    | "combobox"
    | "command"
    | "context-menu"
    | "date-picker"
    | "drawer"
    | "file-upload"
    | "hover-card"
    | "kbd"
    | "menubar"
    | "native-select"
    | "resizable"
    | "scroll-area"
    | "toggle"
    | "toggle-group"
    | "google-analytics"
    | "google-tag-manager"
    | "meta-pixel"
    | "microsoft-clarity"
    | "tiktok-pixel"
    | "chatbot"

interface ComponentConfig {
    file: string
    description: string
    category: string
    dependencies?: ComponentName[]
}

export const REGISTRY: Record<ComponentName, ComponentConfig> = {
    // Core
    button: {
        file: "button.tsx",
        description: "Polymorphic button with variants",
        category: "Core",
        dependencies: [],
    },
    badge: {
        file: "badge.tsx",
        description: "Status indicator",
        category: "Core",
        dependencies: [],
    },
    avatar: {
        file: "avatar.tsx",
        description: "User avatar with fallback",
        category: "Core",
        dependencies: [],
    },
    separator: {
        file: "separator.tsx",
        description: "Visual divider",
        category: "Core",
        dependencies: [],
    },

    // Typography
    text: {
        file: "text.tsx",
        description: "Polymorphic typography",
        category: "Typography",
        dependencies: [],
    },
    label: {
        file: "label.tsx",
        description: "Form label",
        category: "Typography",
        dependencies: [],
    },

    // Forms
    input: {
        file: "input.tsx",
        description: "Text input field",
        category: "Forms",
        dependencies: [],
    },
    textarea: {
        file: "textarea.tsx",
        description: "Multi-line text input",
        category: "Forms",
        dependencies: [],
    },
    checkbox: {
        file: "checkbox.tsx",
        description: "Checkbox input",
        category: "Forms",
        dependencies: [],
    },
    radio: {
        file: "radio.tsx",
        description: "Radio button group",
        category: "Forms",
        dependencies: [],
    },
    switch: {
        file: "switch.tsx",
        description: "Toggle switch",
        category: "Forms",
        dependencies: [],
    },
    slider: {
        file: "slider.tsx",
        description: "Range slider",
        category: "Forms",
        dependencies: [],
    },
    select: {
        file: "select.tsx",
        description: "Custom select dropdown",
        category: "Forms",
        dependencies: [],
    },

    // Layout
    card: {
        file: "card.tsx",
        description: "Card container",
        category: "Layout",
        dependencies: [],
    },
    container: {
        file: "container.tsx",
        description: "Max-width container",
        category: "Layout",
        dependencies: [],
    },
    "aspect-ratio": {
        file: "aspect-ratio.tsx",
        description: "Maintain aspect ratio",
        category: "Layout",
        dependencies: [],
    },

    // Data Display
    accordion: {
        file: "accordion.tsx",
        description: "Expandable sections",
        category: "Data Display",
        dependencies: [],
    },
    tabs: {
        file: "tabs.tsx",
        description: "Tab navigation",
        category: "Data Display",
        dependencies: [],
    },
    table: {
        file: "table.tsx",
        description: "Data table",
        category: "Data Display",
        dependencies: [],
    },
    progress: {
        file: "progress.tsx",
        description: "Progress indicator",
        category: "Data Display",
        dependencies: [],
    },
    skeleton: {
        file: "skeleton.tsx",
        description: "Loading placeholder",
        category: "Data Display",
        dependencies: [],
    },

    // Overlay / Feedback
    dialog: {
        file: "dialog.tsx",
        description: "Modal dialog",
        category: "Overlay / Feedback",
        dependencies: [],
    },
    "alert-dialog": {
        file: "alert-dialog.tsx",
        description: "Confirmation dialog",
        category: "Overlay / Feedback",
        dependencies: ["dialog"],
    },
    sheet: {
        file: "sheet.tsx",
        description: "Slide-in panel",
        category: "Overlay / Feedback",
        dependencies: [],
    },
    popover: {
        file: "popover.tsx",
        description: "Floating content",
        category: "Overlay / Feedback",
        dependencies: [],
    },
    tooltip: {
        file: "tooltip.tsx",
        description: "Hover tooltip",
        category: "Overlay / Feedback",
        dependencies: [],
    },
    "dropdown-menu": {
        file: "dropdown-menu.tsx",
        description: "Action dropdown",
        category: "Overlay / Feedback",
        dependencies: [],
    },
    toast: {
        file: "toast.tsx",
        description: "Notification toast",
        category: "Overlay / Feedback",
        dependencies: [],
    },
    alert: {
        file: "alert.tsx",
        description: "Inline alert",
        category: "Overlay / Feedback",
        dependencies: [],
    },

    // Navigation
    breadcrumb: {
        file: "breadcrumb.tsx",
        description: "Breadcrumb navigation",
        category: "Navigation",
        dependencies: [],
    },
    pagination: {
        file: "pagination.tsx",
        description: "Page navigation",
        category: "Navigation",
        dependencies: ["button"],
    },

    // New Components
    "loading-spinner": {
        file: "loading-spinner.tsx",
        description: "Loading spinner with variants",
        category: "Feedback",
        dependencies: [],
    },
    image: {
        file: "image.tsx",
        description: "Enhanced image with loading",
        category: "Data Display",
        dependencies: [],
    },
    "button-group": {
        file: "button-group.tsx",
        description: "Group buttons together",
        category: "Core",
        dependencies: ["button"],
    },
    "otp-input": {
        file: "otp-input.tsx",
        description: "OTP verification input",
        category: "Forms",
        dependencies: [],
    },
    search: {
        file: "search.tsx",
        description: "Search input with debounce",
        category: "Forms",
        dependencies: [],
    },
    "star-rating": {
        file: "star-rating.tsx",
        description: "Star rating input",
        category: "Feedback",
        dependencies: [],
    },
    collapsible: {
        file: "collapsible.tsx",
        description: "Expandable section",
        category: "Data Display",
        dependencies: [],
    },
    carousel: {
        file: "carousel.tsx",
        description: "Image/content slider",
        category: "Data Display",
        dependencies: [],
    },
    calendar: {
        file: "calendar.tsx",
        description: "Date picker",
        category: "Forms",
        dependencies: [],
    },
    sidebar: {
        file: "sidebar.tsx",
        description: "Responsive sidebar with mobile drawer",
        category: "Layout",
        dependencies: ["sheet", "button"],
    },

    // Added Components
    combobox: {
        file: "combobox.tsx",
        description: "Searchable select with autocomplete",
        category: "Forms",
        dependencies: ["popover"],
    },
    command: {
        file: "command.tsx",
        description: "Command palette / search menu",
        category: "Navigation",
        dependencies: [],
    },
    "context-menu": {
        file: "context-menu.tsx",
        description: "Right-click context menu",
        category: "Overlay / Feedback",
        dependencies: [],
    },
    "date-picker": {
        file: "date-picker.tsx",
        description: "Date picker with calendar",
        category: "Forms",
        dependencies: ["calendar", "popover", "button"],
    },
    drawer: {
        file: "drawer.tsx",
        description: "Bottom/top sheet drawer",
        category: "Overlay / Feedback",
        dependencies: [],
    },
    "file-upload": {
        file: "file-upload.tsx",
        description: "Drag-and-drop file upload",
        category: "Forms",
        dependencies: [],
    },
    "hover-card": {
        file: "hover-card.tsx",
        description: "Hover-triggered popover",
        category: "Overlay / Feedback",
        dependencies: [],
    },
    kbd: {
        file: "kbd.tsx",
        description: "Keyboard shortcut display",
        category: "Typography",
        dependencies: [],
    },
    menubar: {
        file: "menubar.tsx",
        description: "Horizontal menu with dropdowns",
        category: "Navigation",
        dependencies: [],
    },
    "native-select": {
        file: "native-select.tsx",
        description: "Styled browser-native select",
        category: "Forms",
        dependencies: [],
    },
    resizable: {
        file: "resizable.tsx",
        description: "Resizable panel layout",
        category: "Layout",
        dependencies: [],
    },
    "scroll-area": {
        file: "scroll-area.tsx",
        description: "Custom scrollbar container",
        category: "Layout",
        dependencies: [],
    },
    toggle: {
        file: "toggle.tsx",
        description: "Toggle button",
        category: "Forms",
        dependencies: [],
    },
    "toggle-group": {
        file: "toggle-group.tsx",
        description: "Grouped toggle buttons",
        category: "Forms",
        dependencies: ["toggle"],
    },
    "google-analytics": {
        file: "analytics/google-analytics.tsx",
        description: "Google Analytics 4 tracking",
        category: "Analytics",
        dependencies: [],
    },
    "google-tag-manager": {
        file: "analytics/google-tag-manager.tsx",
        description: "Google Tag Manager integration",
        category: "Analytics",
        dependencies: [],
    },
    "meta-pixel": {
        file: "analytics/meta-pixel.tsx",
        description: "Meta (Facebook) Pixel tracking",
        category: "Analytics",
        dependencies: [],
    },
    "microsoft-clarity": {
        file: "analytics/microsoft-clarity.tsx",
        description: "Microsoft Clarity heatmap tracking",
        category: "Analytics",
        dependencies: [],
    },
    "tiktok-pixel": {
        file: "analytics/tiktok-pixel.tsx",
        description: "TikTok Pixel tracking",
        category: "Analytics",
        dependencies: [],
    },
    chatbot: {
        file: "chatbot.tsx",
        description: "AI chat interface",
        category: "Data Display",
        dependencies: ["button", "input", "scroll-area", "avatar"],
    },
}

