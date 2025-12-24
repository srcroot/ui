import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import ButtonDemo from "@/components/demo/button-demo"; // Static import for simplicity in this example
import TableOfContentsDemo from "@/components/demo/table-of-contents-demo";

// Map slugs to components and file paths
const DEMOS: Record<string, { component: React.ComponentType, filePath: string }> = {
    "button": {
        component: ButtonDemo,
        filePath: "components/demo/button-demo.tsx"
    },
    "table-of-contents": {
        component: TableOfContentsDemo,
        filePath: "components/demo/table-of-contents-demo.tsx"
    }
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    return {
        title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Demo - Playground`,
    };
}

export default async function ComponentPage({ params }: PageProps) {
    const { slug } = await params;
    const demo = DEMOS[slug];

    if (!demo) {
        notFound();
    }

    const absolutePath = path.join(process.cwd(), demo.filePath);
    let code = "";
    try {
        code = fs.readFileSync(absolutePath, "utf-8");
    } catch (err) {
        code = "Error reading source code.";
        console.error(err);
    }

    const Component = demo.component;

    return (
        <div className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-3xl font-bold mb-8 capitalize">{slug} Demo</h1>

            <div className="w-full max-w-3xl grid gap-8">
                <div className="flex items-center justify-center p-12 border rounded-lg bg-card">
                    <Component />
                </div>

                <div className="rounded-lg overflow-hidden border bg-muted">
                    <div className="bg-muted p-2 border-b text-sm font-mono text-muted-foreground px-4">
                        {demo.filePath}
                    </div>
                    <pre className="p-4 overflow-x-auto text-sm font-mono">
                        <code>{code}</code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
