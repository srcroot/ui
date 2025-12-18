export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight mb-6">Privacy Policy</h1>
            <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
                <p>Your privacy is important to us. It is Pi Junction's policy to respect your privacy regarding any information we may collect from you across our website.</p>

                <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
                <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>

                <h2 className="text-xl font-semibold mt-6">2. Use of Information</h2>
                <p>We use the information we collect in various ways, including to:</p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Provide, operate, and maintain our website</li>
                    <li>Improve, personalize, and expand our website</li>
                    <li>Understand and analyze how you use our website</li>
                    <li>Develop new products, services, features, and functionality</li>
                    <li>Process your transactions</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6">3. Data Security</h2>
                <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>
            </div>
        </div>
    )
}
