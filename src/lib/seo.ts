import type { Metadata } from "next";
import type { Product } from "@/types/sanity";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://patina.design";
const siteName = "Patina";
const siteDescription = "The complete room, designer-curated. Handcrafted anchor pieces from heritage makers, surrounded by designer-selected brands and every finishing detail.";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Patina | Complete Designer-Curated Rooms | Where Time Adds Value",
    template: "%s | Patina",
  },
  description: siteDescription,
  keywords: [
    "handcrafted furniture",
    "artisan furniture",
    "AR furniture visualization",
    "sustainable furniture",
    "heirloom quality",
    "furniture makers",
    "interior design",
    "complete room design",
    "designer-curated rooms",
    "room planning",
    "turnkey interior design",
  ],
  authors: [{ name: "Patina" }],
  creator: "Patina",
  publisher: "Patina",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: "Patina | Complete Designer-Curated Rooms | Where Time Adds Value",
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Patina - Complete Designer-Curated Rooms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patina | Complete Designer-Curated Rooms | Where Time Adds Value",
    description: siteDescription,
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export function generateProductJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imageUrl || product.mainImage?.asset?.url,
    brand: {
      "@type": "Brand",
      name: product.maker?.name || "Patina",
    },
    manufacturer: {
      "@type": "Organization",
      name: product.maker?.name,
      address: product.maker?.location,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${siteUrl}/furniture/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: "Patina",
      },
    },
    material: product.material?.name,
    category: product.category,
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Patina",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Designer-taught furniture discovery platform where professional interior designers and makers classify every product.",
    slogan: "Where Time Adds Value",
    foundingDate: "2023",
    foundingLocation: {
      "@type": "Place",
      name: "Madison, Wisconsin",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Madison",
        addressRegion: "WI",
        addressCountry: "US",
      },
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@patina.cloud",
      contactType: "customer service",
    },
    founder: [
      {
        "@type": "Person",
        name: "Leah Kochaver",
        jobTitle: "Co-Founder, Design & Experience",
        knowsAbout: [
          "interior design",
          "furniture sourcing",
          "residential design",
        ],
        worksFor: { "@type": "Organization", name: "Middlewest Studio" },
      },
      {
        "@type": "Person",
        name: "Kody Kochaver",
        jobTitle: "Co-Founder, Technology & Product",
        knowsAbout: [
          "technology",
          "product development",
          "construction technology",
        ],
      },
    ],
    sameAs: [
      "https://middlewest.studio",
      "https://www.instagram.com/patina.cloud",
      "https://www.linkedin.com/company/patina-cloud",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madison",
      addressRegion: "WI",
      addressCountry: "US",
    },
  };
}

export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/furniture?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Patina",
    operatingSystem: "iOS",
    applicationCategory: "LifestyleApplication",
    description:
      "Scan your room, discover your style, find furniture that belongs. Professional designers teach the AI what fits your space.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Patina",
      url: siteUrl,
    },
  };
}

export function generateServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Patina Design Services",
    provider: {
      "@type": "Organization",
      name: "Patina",
      url: siteUrl,
    },
    serviceType: "Interior Design",
    description:
      "Professional interior design services powered by the Patina platform. From single-room refreshes to complete home transformations, guided by designers who use the Aesthete Engine.",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    url: `${siteUrl}/services`,
  };
}

export function generateArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  authorJobTitle,
  imageUrl,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorJobTitle?: string;
  imageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      jobTitle: authorJobTitle,
      url: `${siteUrl}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Patina",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
      },
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function generateAboutPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Our Story | Patina",
    description:
      "Meet Kody and Leah Kochaver, the husband and wife team behind Patina. Born from real interior design work in Madison, Wisconsin.",
    url: `${siteUrl}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "Patina",
      description: siteDescription,
      url: siteUrl,
      founders: [
        {
          "@type": "Person",
          name: "Leah Kochaver",
          jobTitle: "Co-Founder, Design & Experience",
          knowsAbout: [
            "interior design",
            "furniture sourcing",
            "residential design",
          ],
          worksFor: [
            { "@type": "Organization", name: "Patina" },
            { "@type": "Organization", name: "Middlewest Studio" },
          ],
          sameAs: ["https://middlewest.studio"],
        },
        {
          "@type": "Person",
          name: "Kody Kochaver",
          jobTitle: "Co-Founder, Technology & Product",
          knowsAbout: [
            "technology",
            "product development",
            "construction technology",
          ],
          worksFor: {
            "@type": "Organization",
            name: "Patina",
          },
        },
      ],
      foundingDate: "2023",
      foundingLocation: {
        "@type": "Place",
        name: "Madison, Wisconsin",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Madison",
          addressRegion: "WI",
          addressCountry: "US",
        },
      },
    },
  };
}
