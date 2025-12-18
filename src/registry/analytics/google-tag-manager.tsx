import Script from 'next/script';
import type { FC, ReactNode } from 'react';

interface GTMContainer {
    gtmId: string;
    tagServerUrl?: string;
}

interface GoogleTagManagerProps {
    containers: GTMContainer[];
}

const GoogleTagManager: FC<GoogleTagManagerProps> = ({ containers }) => {
    const defaultServer = 'https://www.googletagmanager.com/gtm.js';

    // Group containers by tagServer to avoid duplicate script loads
    const scriptsMap = containers.reduce((map, container) => {
        const server = container.tagServerUrl || defaultServer;
        if (!map.has(server)) {
            map.set(server, []);
        }
        map.get(server)!.push(container.gtmId);
        return map;
    }, new Map<string, string[]>());

    const scriptElements: ReactNode[] = Array.from(scriptsMap.entries()).map(([server, ids]) => (
        <Script
            key={server}
            id={`gtm-script-${server}`}
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
          ${ids
                        .map(
                            id => `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="${server}?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`
                        )
                        .join('')}
        `,
            }}
        />
    ));

    return (
        <>
            {scriptElements}

            <noscript>
                {containers.map(({ gtmId, tagServer = defaultServer }) => (
                    <iframe
                        key={gtmId}
                        src={`${tagServer}/ns.html?id=${gtmId}`}
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                ))}
            </noscript>
        </>
    );
};

export default GoogleTagManager;
