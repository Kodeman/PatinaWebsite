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
