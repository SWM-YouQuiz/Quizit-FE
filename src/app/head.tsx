import Script from "next/script";

const Head = () => {
    return (
        <>
            <head>
                <title>퀴즈잇</title>
                <meta name="application-name" content="퀴즈잇" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="퀴즈잇" />
                <meta name="description" content="퀴즈잇" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-config" content="/icons/browserconfig.xml" />
                <meta name="msapplication-TileColor" content="#5741D3" />
                <meta name="msapplication-tap-highlight" content="no" />
                <meta name="theme-color" content="#5741D3" />

                <link rel="apple-touch-icon" sizes="256x256" href="/icons/ios/256.png" />
                <link rel="apple-touch-icon" sizes="512x512" href="/icons/ios/512.png" />
                <link rel="apple-touch-icon" sizes="1024x1024" href="/icons/ios/1024.png" />

                <link rel="icon" type="image/png" sizes="48x48" href="/icons/android/android-launchericon-48-48.png" />
                <link rel="icon" type="image/png" sizes="72x72" href="/icons/android/android-launchericon-72-72.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/icons/android/android-launchericon-96-96.png" />
                <link rel="icon" type="image/png" sizes="144x144" href="/icons/android/android-launchericon-144-144.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/icons/android/android-launchericon-192-192.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/icons/android/android-launchericon-512-512.png" />

                <link rel="icon" type="image/png" sizes="36x36" href="/icons/android/drawable-ldpi/icon.png" />
                <link rel="icon" type="image/png" sizes="48x48" href="/icons/android/drawable-mdpi/icon.png" />
                <link rel="icon" type="image/png" sizes="72x72" href="/icons/android/drawable-hdpi/icon.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/icons/android/drawable-xhdpi/icon.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/icons/android/drawable/icon.png" />
                <link rel="icon" type="image/png" sizes="144x144" href="/icons/android/drawable-xxhdpi/icon.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/icons/android/drawable-xxxhdpi/icon.png" />

                <link rel="manifest" href="/manifest.json" />
                {/*<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />*/}
                <link rel="shortcut icon" href="/favicon.ico" />
                {/*<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />*/}

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:url" content="https://quizit.org" />
                <meta name="twitter:title" content="퀴즈잇" />
                <meta name="twitter:description" content="퀴즈잇" />
                <meta name="twitter:image" content="https://quizit.org/icons/ios/256.png" />
                <meta name="twitter:creator" content="" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="퀴즈잇" />
                <meta property="og:description" content="퀴즈잇" />
                <meta property="og:site_name" content="퀴즈잇" />
                <meta property="og:url" content="https://quiz.org" />
                <meta property="og:image" content="https://quizit.org/icons/ios/256.png" />

                <meta name="apple-mobile-web-app-capable" content="yes" />

                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-2048-2732.png"
                    media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-2732-2048.png"
                    media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-1668-2388.png"
                    media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-2388-1668.png"
                    media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-1536-2048.png"
                    media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-2048-1536.png"
                    media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-1668-2224.png"
                    media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-2224-1668.png"
                    media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-1620-2160.png"
                    media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-2160-1620.png"
                    media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-1290-2796.png"
                    media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-2796-1290.png"
                    media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-1179-2556.png"
                    media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-2556-1179.png"
                    media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-1284-2778.png"
                    media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-2778-1284.png"
                    media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-1170-2532.png"
                    media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-2532-1170.png"
                    media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-1125-2436.png"
                    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-2436-1125.png"
                    media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-1242-2688.png"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-2688-1242.png"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-828-1792.png"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-1792-828.png"
                    media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-1242-2208.png"
                    media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-2208-1242.png"
                    media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-750-1334.png"
                    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-1334-750.png"
                    media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-640-1136.png"
                    media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                />
                <link
                    rel="apple-touch-startup-image"
                    href="/splashscreens/apple-splash-1136-640.png"
                    media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                />

                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
            </head>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-KXBG9R1T4R`} />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-KXBG9R1T4R', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
            />
            <Script
                id="clarity-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "jnqvylj460");
                  `,
                }}
            />
            <Script
                id="google-ads"
                async
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=AW-11399699872`}
                crossOrigin="anonymous"
            />
            <Script
                id="google-ads-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
    
                    gtag('config', 'AW-11399699872');
                  `,
                }}
            />
        </>
    );
};

export default Head;
