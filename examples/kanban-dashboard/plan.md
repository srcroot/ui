# Project Plan: Kanban Dashboard

## Project Overview
A modern, responsive Project Management Dashboard featuring a fully functional Kanban board, data visualization, and task management, built with `@srcroot/ui`.

## Features

### 1. Core Workflow
-   **Kanban Board**: Interactive board with drag-and-drop capabilities, swimlanes, and column customization.
-   **Data Visualization**: Charts showing task velocity, completion rates, team workload, and burndown charts.
-   **Task Management**: Detailed list views with advanced filtering, sorting, and bulk actions.
-   **Team Collaboration**: Member assignment, comments on tasks, and activity logs.
-   **Knowledge Base**: Rich text document editing and organizing (Wiki).
-   **File Management**: Upload, organize, and preview attachments.

### 2. UI/UX
-   **Theme**: Dark/Light mode support (using `next-themes`) with multiple color accents.
-   **Navigation**: Collapsible sidebar navigation with badges for notifications.
-   **Responsive**: Mobile-friendly layout with adaptive views (e.g., list view on mobile instead of board).

## Page Structure

| Path | Description | Key Components |
| :--- | :--- | :--- |
| `/` | **Dashboard**: High-level overview. | `Chart` (Area/Bar/Pie), `Card` (Stats), `RecentActivity` |
| `/board` | **Kanban Board**: The main workspace. | `InputGroup` (Search), `Button` (Add), Drag-and-Drop Board |
| `/tasks` | **Task List**: Tabular view of all items. | `Table` (DataTable), `Pagination`, `DropdownMenu` (Actions) |
| `/calendar` | **Calendar**: Schedule view of tasks. | `Calendar` (Full sized), `Popaver` (Task details) |
| `/roadmap` | **Roadmap**: Timeline/Gantt view. | `ScrollArea`, `Progress`, Timeline Component |
| `/documents` | **Documents**: Project wiki/docs. | `Sidebar` (Doc nav), `Textarea` (Markdown editor) |
| `/files` | **Files**: File manager. | `Table` (File list), `Dialog` (Preview), `Button` (Upload) |
| `/reports` | **Reports**: Detailed analytics. | `Chart` (Advanced), `DateRangePicker`, `Table` |
| `/team` | **Team**: Member management. | `Avatar`, `Table`, `Dialog` (Invite) |
| `/inbox` | **Inbox**: Notifications and updates. | `ScrollArea`, `Card` (Notification Item), `Badge` |
| `/settings` | **Settings**: App configuration. | `Tabs`, `Switch` (Notifications), `Input` (Profile) |
| `/login` | **Authentication**: Sign in screen. | `Card`, `FormField`, `Input`, `Button` |
| `/register` | **Registration**: Sign up screen. | `Card`, `FormField`, `Input`, `Checkbox` (Terms) |

## File Structure

```text
kanban-dashboard/
├── app/
│   ├── (auth)/                 # Auth layout (centered, no sidebar)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/            # Main app layout (with Sidebar)
│   │   ├── layout.tsx          # Providers + AppSidebar
│   │   ├── page.tsx            # Dashboard
│   │   ├── board/page.tsx
│   │   ├── tasks/page.tsx
│   │   ├── calendar/page.tsx
│   │   ├── roadmap/page.tsx
│   │   ├── documents/page.tsx
│   │   ├── files/page.tsx
│   │   ├── reports/page.tsx
│   │   ├── team/page.tsx
│   │   ├── inbox/page.tsx
│   │   └── settings/page.tsx
│   ├── layout.tsx              # Root HTML/Body
│   └── globals.css             # Tailwind imports
├── components/
│   ├── charts/                 # Recharts wrappers
│   ├── kanban/                 # Board specific (Column, Card)
│   ├── layout/                 # AppSidebar, Header
│   └── ui/                     # @srcroot/ui components
├── lib/
│   └── utils.ts                # cn helper
└── public/
```

## Technical Stack
-   **Framework**: Next.js 15 (App Router)
-   **UI Library**: `@srcroot/ui` (All available components)
-   **Styling**: Tailwind CSS
-   **Icons**: `react-icons`
-   **Charts**: `recharts` (via `@srcroot/ui/chart`)
-   **Drag & Drop**: `@dnd-kit/core`
-   **Calendar**: `react-day-picker` (via `@srcroot/ui/calendar`)

## Implementation Steps

### Phase 1: Setup
1.  Initialize Next.js app (`kanban-dashboard`).
2.  Install `@srcroot/ui`.
3.  Install dependencies (`recharts`, `@dnd-kit`, `react-day-picker`).

### Phase 2: Shell
1.  Create `AppSidebar` using `Sidebar` component.
2.  Set up root `layout.tsx` with ThemeProvider.

### Phase 3: Features
1.  **Dashboard**: Mock data + Charts (Velocity, Workload).
2.  **Board**: Dnd-kit integration for columns/cards.
3.  **Calendar**: Full-page calendar view.
4.  **Documents/Files**: specialized list views.
5.  **Auth**: Port "Register/Login" forms.

## User Actions Required
-   Confirm installation of `@dnd-kit` for Kanban functionality.
