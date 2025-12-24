import {
    FiHome,
    FiColumns,
    FiFileText,
    FiPieChart,
    FiUsers,
    FiInbox,
} from "react-icons/fi"

export const data = {
    user: {
        name: "Shifaul",
        email: "me@shifaul.dev",
        avatar: "https://placehold.co/400x400/orange/white?text=A",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: FiHome,
            isActive: true,
        },
        {
            title: "Projects",
            url: "#",
            icon: FiColumns,
            items: [
                {
                    title: "Kanban Board",
                    url: "/board",
                },
                {
                    title: "All Tasks",
                    url: "/tasks",
                },
                {
                    title: "Calendar",
                    url: "/calendar",
                },
                {
                    title: "Roadmap",
                    url: "/roadmap",
                },
                {
                    title: "Backlog",
                    url: "/backlog",
                },
            ],
        },
        {
            title: "Knowledge",
            url: "#",
            icon: FiFileText,
            items: [
                {
                    title: "Documents",
                    url: "/documents",
                },
                {
                    title: "Files",
                    url: "/files",
                },
            ],
        },
        {
            title: "Analytics",
            url: "#",
            icon: FiPieChart,
            items: [
                {
                    title: "Reports",
                    url: "/reports",
                },
            ],
        },
        {
            title: "Team",
            url: "/team",
            icon: FiUsers,
        },
        {
            title: "Inbox",
            url: "/inbox",
            icon: FiInbox,
            badge: "3",
        },
    ],
}
