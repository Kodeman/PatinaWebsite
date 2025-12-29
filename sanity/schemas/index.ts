// Object types (shared)
import { cta } from "./objects/cta";
import { sectionHeader } from "./objects/sectionHeader";
import { featureItem } from "./objects/featureItem";
import { imageWithMeta } from "./objects/imageWithMeta";
import { statistic } from "./objects/statistic";

// Existing document types
import { material } from "./material";
import { maker } from "./maker";
import { product } from "./product";

// New collection documents
import { testimonial } from "./documents/testimonial";
import { teamMember } from "./documents/teamMember";
import { servicePackage } from "./documents/servicePackage";
import { trustBadge } from "./documents/trustBadge";

// Singleton documents (pages)
import { homePage } from "./singletons/homePage";
import { aboutPage } from "./singletons/aboutPage";
import { appPage } from "./singletons/appPage";
import { servicesPage } from "./singletons/servicesPage";
import { designersPage } from "./singletons/designersPage";
import { siteSettings } from "./singletons/siteSettings";

export const schemaTypes = [
  // Object types (must be first as they're referenced by documents)
  cta,
  sectionHeader,
  featureItem,
  imageWithMeta,
  statistic,

  // Existing document types
  material,
  maker,
  product,

  // New collection documents
  testimonial,
  teamMember,
  servicePackage,
  trustBadge,

  // Singleton documents
  homePage,
  aboutPage,
  appPage,
  servicesPage,
  designersPage,
  siteSettings,
];
