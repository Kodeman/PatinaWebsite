import localFont from "next/font/local";
import { defaultMetadata, generateOrganizationJsonLd, generateWebsiteJsonLd } from "@/lib/seo";
import { SkipLink } from "@/components/ui/SkipLink";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { FoundingCircleModal, FoundingModalProvider } from "@/components/ui/FoundingCircleModal";
import { StudioMotionProvider } from "@/components/studio/StudioMotion";
import { PostHogProviders } from "./providers";
import "./globals.css";
import "./studio.css";

const caslon = localFont({ src: "../../public/fonts/libre-caslon-display.ttf", variable: "--font-caslon", display: "swap", weight: "400" });
const manrope = localFont({ src: "../../public/fonts/manrope.ttf", variable: "--font-manrope", display: "swap", weight: "200 800" });

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = generateOrganizationJsonLd();
  const websiteJsonLd = generateWebsiteJsonLd();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body className={`${caslon.variable} ${manrope.variable} antialiased`}>
        <SkipLink />
        <PostHogProviders>
          <StudioMotionProvider><FoundingModalProvider>
            {children}
            <FoundingCircleModal />
          </FoundingModalProvider></StudioMotionProvider>
        </PostHogProviders>
        <noscript><div className="studio-noscript">The studio’s interactive features need JavaScript. To join the Founding Circle or ask us a question, write to <a href="mailto:hello@patina.cloud">hello@patina.cloud</a>.</div></noscript>
        <CookieConsent />
      </body>
    </html>
  );
}
