import type { Metadata } from "next";
import type { Product } from "@/types/sanity";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://patina.design";
const siteName = "Patina";
const siteDescription = "Discover handcrafted furniture with stories worth telling. AR visualization, artisan makers, and quality that lasts generations.";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Patina | Where Time Adds Value",
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
  ],
  authors: [{ name: "Patina" }],
  creator: "Patina",
  publisher: "Patina",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: "Patina | Where Time Adds Value",
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Patina - Handcrafted Furniture Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patina | Where Time Adds Value",
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
    sameAs: [
      "https://twitter.com/patina",
      "https://instagram.com/patina",
      "https://linkedin.com/company/patina",
    ],
    description: siteDescription,
    address: {
      "@type": "PostalAddress",
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
