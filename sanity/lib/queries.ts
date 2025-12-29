import { groq } from "next-sanity";

// Get all products with basic info for catalog
export const productsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    price,
    description,
    "imageUrl": mainImage.asset->url,
    category,
    productType,
    featured,
    inStock,
    maker-> {
      name,
      "badge": badges[0]
    },
    material-> {
      name,
      origin,
      colorHex
    }
  }
`;

// Get featured products for homepage
export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(_createdAt desc) [0...6] {
    _id,
    name,
    "slug": slug.current,
    price,
    description,
    "imageUrl": mainImage.asset->url,
    category,
    maker-> {
      name,
      "badge": badges[0]
    },
    material-> {
      name,
      origin,
      colorHex
    }
  }
`;

// Get products by category
export const productsByCategoryQuery = groq`
  *[_type == "product" && category == $category] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    price,
    description,
    "imageUrl": mainImage.asset->url,
    category,
    productType,
    featured,
    inStock,
    maker-> {
      name,
      "badge": badges[0]
    },
    material-> {
      name,
      origin,
      colorHex
    }
  }
`;

// Get single product by slug
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    price,
    description,
    longDescription,
    category,
    productType,
    inStock,
    leadTime,
    arModelUrl,
    dimensions,
    mainImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    "gallery": gallery[] {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt,
      caption
    },
    maker-> {
      _id,
      name,
      "slug": slug.current,
      location,
      foundedYear,
      story,
      quote,
      yearsOfCraft,
      badges,
      image {
        asset-> {
          url
        }
      }
    },
    material-> {
      _id,
      name,
      origin,
      colorHex,
      description
    },
    "secondaryMaterials": secondaryMaterials[]-> {
      _id,
      name,
      origin,
      colorHex
    }
  }
`;

// Get all makers
export const makersQuery = groq`
  *[_type == "maker"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    location,
    foundedYear,
    yearsOfCraft,
    badges,
    quote,
    "imageUrl": image.asset->url
  }
`;

// Get single maker by slug
export const makerBySlugQuery = groq`
  *[_type == "maker" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    location,
    foundedYear,
    story,
    quote,
    yearsOfCraft,
    badges,
    image {
      asset-> {
        url,
        metadata {
          lqip
        }
      }
    },
    "workshopImages": workshopImages[] {
      asset-> {
        url
      }
    },
    "products": *[_type == "product" && references(^._id)] {
      _id,
      name,
      "slug": slug.current,
      price,
      "imageUrl": mainImage.asset->url,
      category
    }
  }
`;

// Get all materials for filtering
export const materialsQuery = groq`
  *[_type == "material"] | order(name asc) {
    _id,
    name,
    origin,
    colorHex
  }
`;

// Get unique categories from products
export const categoriesQuery = groq`
  array::unique(*[_type == "product"].category)
`;

// Get unique product types from products
export const productTypesQuery = groq`
  array::unique(*[_type == "product"].productType)
`;

// Related products (same category, exclude current)
export const relatedProductsQuery = groq`
  *[_type == "product" && category == $category && slug.current != $currentSlug] | order(_createdAt desc) [0...4] {
    _id,
    name,
    "slug": slug.current,
    price,
    "imageUrl": mainImage.asset->url,
    maker-> {
      name,
      "badge": badges[0]
    }
  }
`;

// ============================================
// SINGLETON PAGE QUERIES
// ============================================

// Homepage content
export const homePageQuery = groq`
  *[_type == "homePage" && _id == "homePage"][0] {
    heroTitle,
    heroTitleEmphasis,
    heroDescription,
    heroSecondaryLine,
    heroTrustLine,
    heroCta,
    heroImage {
      asset-> { url, metadata { lqip } },
      alt
    },
    valueHeader,
    valueFeatures[] {
      title,
      description,
      icon,
      examples,
      highlight
    },
    engineHeader,
    engineBody,
    engineCta,
    enginePillars[] {
      title,
      description,
      icon,
      examples,
      highlight
    },
    experienceHeader,
    experienceBody,
    experienceSteps[] {
      number,
      title,
      text
    },
    makersHeader,
    makersBody,
    featuredMakers[]-> {
      _id,
      name,
      "slug": slug.current,
      location,
      foundedYear,
      yearsOfCraft,
      badges,
      quote,
      "imageUrl": image.asset->url
    },
    testimonialsHeader,
    homeTestimonials[]-> {
      _id,
      quote,
      author,
      title,
      location,
      image {
        asset-> { url },
        alt
      }
    },
    trustBadges[]-> {
      value,
      label,
      icon
    },
    servicesHeader,
    servicesBody,
    servicesBenefit,
    servicesHandoffItems,
    servicesCta,
    servicesImage {
      asset-> { url },
      alt
    },
    ctaHeader,
    ctaBody,
    ctaSecondary,
    ctaPrimary,
    ctaSecondaryLink
  }
`;

// About page content
export const aboutPageQuery = groq`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    heroHeadline,
    heroSubheadline,
    heroBackground {
      asset-> { url, metadata { lqip } },
      alt
    },
    problemHeading,
    problemDescription,
    problemStatistic,
    problemLeftImage {
      asset-> { url },
      alt
    },
    problemRightImage {
      asset-> { url },
      alt
    },
    originHeroImage {
      asset-> { url },
      alt
    },
    narrativeBlocks[] {
      title,
      content,
      quote,
      image {
        asset-> { url },
        alt
      }
    },
    wordDefinition,
    pronunciation,
    partOfSpeech,
    definition,
    definitionQuote,
    definitionBackground {
      asset-> { url },
      alt
    },
    brandValues[] {
      title,
      description,
      materialTexture
    },
    founders[]-> {
      _id,
      name,
      role,
      title,
      bio,
      credentials,
      location,
      image {
        asset-> { url },
        alt
      }
    },
    foundersTogetherImage {
      asset-> { url },
      alt
    },
    studioHeading,
    studioDescription,
    studioLinkText,
    studioLinkUrl,
    studioLogo {
      asset-> { url },
      alt
    },
    timeline[] {
      year,
      title,
      description,
      quote,
      icon
    },
    ctaHeadline,
    ctaActions[] {
      label,
      href,
      variant,
      isExternal
    }
  }
`;

// App page content
export const appPageQuery = groq`
  *[_type == "appPage" && _id == "appPage"][0] {
    heroEyebrow,
    heroHeadline,
    heroHeadlineEmphasis,
    heroSubheadline,
    heroSecondaryLine,
    heroPrimaryCta,
    heroSecondaryCta,
    heroAndroidNote,
    heroMockup {
      asset-> { url, metadata { lqip } },
      alt
    },
    problemHeader,
    problemParagraphs,
    comparisonLeft {
      label,
      description,
      itemCount,
      image {
        asset-> { url },
        alt
      }
    },
    comparisonRight {
      label,
      description,
      itemCount,
      image {
        asset-> { url },
        alt
      }
    },
    journeyHeader,
    journeySteps[] {
      stepNumber,
      title,
      description,
      tagline,
      icon,
      image {
        asset-> { url },
        alt
      }
    },
    engineHeader,
    engineDiagram {
      asset-> { url },
      alt
    },
    enginePillars[] {
      title,
      description,
      icon,
      examples,
      highlight
    },
    handoffHeader,
    handoffDescription,
    handoffBenefit,
    handoffItems,
    handoffCta,
    trustEyebrow,
    trustIndicators[] {
      title,
      description,
      icon
    },
    ctaHeadline,
    ctaHeadlineEmphasis,
    ctaSubheadline,
    ctaTertiaryLine,
    ctaPrimary,
    ctaSecondaryText,
    ctaSecondaryLink
  }
`;

// Services page content
export const servicesPageQuery = groq`
  *[_type == "servicesPage" && _id == "servicesPage"][0] {
    heroEyebrow,
    heroHeadline,
    heroHeadlineEmphasis,
    heroDescription,
    packagesHeader,
    packages[]-> {
      _id,
      name,
      price,
      description,
      features,
      cta,
      featured
    },
    processHeader,
    processSteps[] {
      number,
      title,
      description
    },
    ctaHeader,
    ctaDescription,
    ctaPrimary,
    ctaSecondary
  }
`;

// Designers page content
export const designersPageQuery = groq`
  *[_type == "designersPage" && _id == "designersPage"][0] {
    heroEyebrow,
    heroHeadline,
    heroHeadlineEmphasis,
    heroDescription,
    heroPrimaryCta,
    heroSecondaryCta,
    benefitsHeader,
    benefits[] {
      title,
      description,
      icon
    },
    testimonialsHeader,
    testimonials[]-> {
      _id,
      quote,
      author,
      title,
      location,
      image {
        asset-> { url },
        alt
      }
    },
    applyHeader,
    applyDescription
  }
`;

// Site settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    siteName,
    tagline,
    logo {
      asset-> { url }
    },
    email,
    phone,
    address,
    socialLinks[] {
      platform,
      url
    },
    defaultMetaTitle,
    defaultMetaDescription,
    defaultOgImage {
      asset-> { url }
    }
  }
`;

// All testimonials
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    quote,
    author,
    title,
    location,
    category,
    featured,
    image {
      asset-> { url },
      alt
    }
  }
`;

// Featured testimonials
export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...4] {
    _id,
    quote,
    author,
    title,
    location,
    image {
      asset-> { url },
      alt
    }
  }
`;

// All team members
export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(sortOrder asc) {
    _id,
    name,
    "slug": slug.current,
    role,
    title,
    bio,
    credentials,
    location,
    memberType,
    image {
      asset-> { url },
      alt
    }
  }
`;

// Founders only
export const foundersQuery = groq`
  *[_type == "teamMember" && memberType == "founder"] | order(sortOrder asc) {
    _id,
    name,
    role,
    title,
    bio,
    credentials,
    image {
      asset-> { url },
      alt
    }
  }
`;

// Featured makers for homepage
export const featuredMakersQuery = groq`
  *[_type == "maker"] | order(_createdAt desc) [0...4] {
    _id,
    name,
    "slug": slug.current,
    location,
    foundedYear,
    yearsOfCraft,
    badges,
    quote,
    "imageUrl": image.asset->url
  }
`;
