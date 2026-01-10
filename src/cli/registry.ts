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
    | "form-field"
    | "input-group"
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
    | "chart"
    | "slot"
    | "slot"
    | "table-of-contents"
    | "map"
    | "empty-state"
    | "floating-dock"
    | "marquee"
    | "scroll-to-top"
    | "scroll-animation"
    | "whatsapp"
    | "patterns"

interface ComponentConfig {
    file: string
    description: string
    category: string
    dependencies?: ComponentName[]
    registryDependencies?: string[]
}

export const REGISTRY: Record<ComponentName, ComponentConfig> = {
    // Core
    button: {
        file: "ui/button.tsx",
        description: "Polymorphic button with variants",
        category: "Core",
        dependencies: ["slot"],
    },
    badge: {
        file: "ui/badge.tsx",
        description: "Status indicator",
        category: "Core",
        dependencies: [],
    },
    avatar: {
        file: "ui/avatar.tsx",
        description: "User avatar with fallback",
        category: "Core",
        dependencies: [],
    },
    separator: {
        file: "ui/separator.tsx",
        description: "Visual divider",
        category: "Core",
        dependencies: [],
    },

    // Typography
    text: {
        file: "ui/text.tsx",
        description: "Polymorphic typography",
        category: "Typography",
        dependencies: [],
    },
    label: {
        file: "ui/label.tsx",
        description: "Form label",
        category: "Typography",
        dependencies: [],
    },

    // Forms
    input: {
        file: "ui/input.tsx",
        description: "Text input field",
        category: "Forms",
        dependencies: [],
        registryDependencies: ["react-icons"],
    },
    textarea: {
        file: "ui/textarea.tsx",
        description: "Multi-line text input",
        category: "Forms",
        dependencies: [],
    },
    checkbox: {
        file: "ui/checkbox.tsx",
        description: "Checkbox input",
        category: "Forms",
        dependencies: [],
    },
    radio: {
        file: "ui/radio.tsx",
        description: "Radio button group",
        category: "Forms",
        dependencies: [],
    },
    switch: {
        file: "ui/switch.tsx",
        description: "Toggle switch",
        category: "Forms",
        dependencies: [],
    },
    slider: {
        file: "ui/slider.tsx",
        description: "Range slider",
        category: "Forms",
        dependencies: [],
    },
    select: {
        file: "ui/select.tsx",
        description: "Custom select dropdown",
        category: "Forms",
        dependencies: [],
    },

    // Layout
    card: {
        file: "ui/card.tsx",
        description: "Card container",
        category: "Layout",
        dependencies: [],
    },
    container: {
        file: "ui/container.tsx",
        description: "Max-width container",
        category: "Layout",
        dependencies: [],
    },
    "aspect-ratio": {
        file: "ui/aspect-ratio.tsx",
        description: "Maintain aspect ratio",
        category: "Layout",
        dependencies: [],
    },

    // Data Display
    accordion: {
        file: "ui/accordion.tsx",
        description: "Expandable sections",
        category: "Data Display",
        dependencies: [],
    },
    tabs: {
        file: "ui/tabs.tsx",
        description: "Tab navigation",
        category: "Data Display",
        dependencies: [],
    },
    table: {
        file: "ui/table.tsx",
        description: "Data table",
        category: "Data Display",
        dependencies: [],
    },
    progress: {
        file: "ui/progress.tsx",
        description: "Progress indicator",
        category: "Data Display",
        dependencies: [],
    },
    skeleton: {
        file: "ui/skeleton.tsx",
        description: "Loading placeholder",
        category: "Data Display",
        dependencies: [],
    },

    // Overlay / Feedback
    dialog: {
        file: "ui/dialog.tsx",
        description: "Modal dialog",
        category: "Overlay / Feedback",
        dependencies: ["slot"],
    },
    "alert-dialog": {
        file: "ui/alert-dialog.tsx",
        description: "Confirmation dialog",
        category: "Overlay / Feedback",
        dependencies: ["dialog", "slot"],
    },
    sheet: {
        file: "ui/sheet.tsx",
        description: "Slide-in panel",
        category: "Overlay / Feedback",
        dependencies: ["slot"],
    },
    popover: {
        file: "ui/popover.tsx",
        description: "Floating content",
        category: "Overlay / Feedback",
        dependencies: ["slot"],
    },
    tooltip: {
        file: "ui/tooltip.tsx",
        description: "Hover tooltip",
        category: "Overlay / Feedback",
        dependencies: ["slot"],
    },
    "dropdown-menu": {
        file: "ui/dropdown-menu.tsx",
        description: "Action dropdown",
        category: "Overlay / Feedback",
        dependencies: ["slot"],
    },
    toast: {
        file: "ui/toast.tsx",
        description: "Notification toast",
        category: "Overlay / Feedback",
        dependencies: [],
    },
    alert: {
        file: "ui/alert.tsx",
        description: "Inline alert",
        category: "Overlay / Feedback",
        dependencies: [],
    },

    // Navigation
    breadcrumb: {
        file: "ui/breadcrumb.tsx",
        description: "Breadcrumb navigation",
        category: "Navigation",
        dependencies: ["slot"],
    },
    pagination: {
        file: "ui/pagination.tsx",
        description: "Page navigation",
        category: "Navigation",
        dependencies: ["button"],
    },

    // New Components
    "loading-spinner": {
        file: "ui/loading-spinner.tsx",
        description: "Loading spinner with variants",
        category: "Feedback",
        dependencies: [],
    },
    image: {
        file: "ui/image.tsx",
        description: "Enhanced image with loading",
        category: "Data Display",
        dependencies: [],
    },
    "button-group": {
        file: "ui/button-group.tsx",
        description: "Group buttons together",
        category: "Core",
        dependencies: ["button"],
    },
    "otp-input": {
        file: "ui/otp-input.tsx",
        description: "OTP verification input",
        category: "Forms",
        dependencies: [],
    },
    search: {
        file: "ui/search.tsx",
        description: "Search input with debounce",
        category: "Forms",
        dependencies: [],
    },
    "star-rating": {
        file: "ui/star-rating.tsx",
        description: "Star rating input",
        category: "Feedback",
        dependencies: [],
    },
    collapsible: {
        file: "ui/collapsible.tsx",
        description: "Expandable section",
        category: "Data Display",
        dependencies: ["slot"],
    },
    carousel: {
        file: "ui/carousel.tsx",
        description: "Image/content slider",
        category: "Data Display",
        dependencies: [],
    },
    calendar: {
        file: "ui/calendar.tsx",
        description: "Date picker",
        category: "Forms",
        dependencies: [],
    },
    sidebar: {
        file: "ui/sidebar.tsx",
        description: "Responsive sidebar with mobile drawer",
        category: "Layout",
        dependencies: ["sheet", "button", "slot"],
    },

    // Added Components
    combobox: {
        file: "ui/combobox.tsx",
        description: "Searchable select with autocomplete",
        category: "Forms",
        dependencies: ["popover", "command", "button", "badge"],
    },
    "form-field": {
        file: "ui/form-field.tsx",
        description: "Wrapper for form inputs with label and error",
        category: "Forms",
        dependencies: ["label"],
    },
    "input-group": {
        file: "ui/input-group.tsx",
        description: "Input with add-ons",
        category: "Forms",
        dependencies: ["input"],
    },
    command: {
        file: "ui/command.tsx",
        description: "Command palette / search menu",
        category: "Navigation",
        dependencies: ["dialog"],
    },
    "context-menu": {
        file: "ui/context-menu.tsx",
        description: "Right-click context menu",
        category: "Overlay / Feedback",
        dependencies: [],
    },
    "date-picker": {
        file: "ui/date-picker.tsx",
        description: "Date picker with calendar",
        category: "Forms",
        dependencies: ["calendar", "popover", "button"],
        registryDependencies: ["date-fns"],
    },
    drawer: {
        file: "ui/drawer.tsx",
        description: "Bottom/top sheet drawer",
        category: "Overlay / Feedback",
        dependencies: ["slot"],
    },
    "file-upload": {
        file: "ui/file-upload.tsx",
        description: "Drag-and-drop file upload",
        category: "Forms",
        dependencies: ["button"],
        registryDependencies: ["react-dropzone", "react-icons"],
    },
    "hover-card": {
        file: "ui/hover-card.tsx",
        description: "Hover-triggered popover",
        category: "Overlay / Feedback",
        dependencies: ["slot"],
    },
    kbd: {
        file: "ui/kbd.tsx",
        description: "Keyboard shortcut display",
        category: "Typography",
        dependencies: [],
    },
    menubar: {
        file: "ui/menubar.tsx",
        description: "Horizontal menu with dropdowns",
        category: "Navigation",
        dependencies: [],
    },
    "native-select": {
        file: "ui/native-select.tsx",
        description: "Styled browser-native select",
        category: "Forms",
        dependencies: [],
    },
    resizable: {
        file: "ui/resizable.tsx",
        description: "Resizable panel layout",
        category: "Layout",
        dependencies: [],
    },
    "scroll-area": {
        file: "ui/scroll-area.tsx",
        description: "Custom scrollbar container",
        category: "Layout",
        dependencies: [],
    },
    toggle: {
        file: "ui/toggle.tsx",
        description: "Toggle button",
        category: "Forms",
        dependencies: [],
    },
    "toggle-group": {
        file: "ui/toggle-group.tsx",
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
        file: "ui/chatbot.tsx",
        description: "AI chat interface",
        category: "Data Display",
        dependencies: ["button", "input", "scroll-area", "avatar"],
    },
    chart: {
        file: "ui/chart.tsx",
        description: "Charts using Recharts",
        category: "Data Display",
        dependencies: [],
        registryDependencies: ["recharts"],
    },
    slot: {
        file: "ui/slot.tsx",
        description: "Slot utility for polymorphic components",
        category: "Core",
        dependencies: [],
    },
    "table-of-contents": {
        file: "ui/table-of-contents.tsx",
        description: "Table of contents navigation",
        category: "Navigation",
        dependencies: [],
    },
    map: {
        file: "ui/map.tsx",
        description: "Interactive map with Leaflet/Google",
        category: "Data Display",
        dependencies: [],
        registryDependencies: ["leaflet", "react-leaflet"],
    },
    "empty-state": {
        file: "ui/empty-state.tsx",
        description: "Placeholder for empty data",
        category: "Data Display",
        dependencies: [],
    },
    "floating-dock": {
        file: "ui/floating-dock.tsx",
        description: "Mac-style floating dock",
        category: "Navigation",
        dependencies: [],
        registryDependencies: ["framer-motion"],
    },
    marquee: {
        file: "ui/marquee.tsx",
        description: "Infinite scrolling marquee",
        category: "Data Display",
        dependencies: [],
    },
    "scroll-to-top": {
        file: "ui/scroll-to-top.tsx",
        description: "Button to scroll to top",
        category: "Navigation",
        dependencies: ["button"],
        registryDependencies: ["framer-motion"],
    },
    "scroll-animation": {
        file: "ui/scroll-animation.tsx",
        description: "Scroll-triggered animations",
        category: "Layout",
        dependencies: [],
        registryDependencies: ["framer-motion"],
    },
    whatsapp: {
        file: "ui/whatsapp.tsx",
        description: "WhatsApp chat button",
        category: "Data Display",
        dependencies: ["button"],
        registryDependencies: ["react-icons"],
    },
    patterns: {
        file: "ui/patterns.tsx",
        description: "Background patterns",
        category: "Layout",
        dependencies: [],
    },
}

