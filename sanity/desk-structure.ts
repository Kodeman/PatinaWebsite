import type { StructureBuilder } from "sanity/structure";

// Singleton document IDs
const SINGLETONS = [
  "homePage",
  "aboutPage",
  "appPage",
  "servicesPage",
  "designersPage",
  "careersPage",
  "contactPage",
  "makersApplyPage",
  "siteSettings",
];

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Pages Group
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Home Page")
                .child(
                  S.document().schemaType("homePage").documentId("homePage")
                ),
              S.listItem()
                .title("About Page")
                .child(
                  S.document().schemaType("aboutPage").documentId("aboutPage")
                ),
              S.listItem()
                .title("App Page")
                .child(
                  S.document().schemaType("appPage").documentId("appPage")
                ),
              S.listItem()
                .title("Services Page")
                .child(
                  S.document()
                    .schemaType("servicesPage")
                    .documentId("servicesPage")
                ),
              S.listItem()
                .title("Designers Page")
                .child(
                  S.document()
                    .schemaType("designersPage")
                    .documentId("designersPage")
                ),
              S.listItem()
                .title("Careers Page")
                .child(
                  S.document()
                    .schemaType("careersPage")
                    .documentId("careersPage")
                ),
              S.listItem()
                .title("Contact Page")
                .child(
                  S.document()
                    .schemaType("contactPage")
                    .documentId("contactPage")
                ),
              S.listItem()
                .title("Makers Apply Page")
                .child(
                  S.document()
                    .schemaType("makersApplyPage")
                    .documentId("makersApplyPage")
                ),
            ])
        ),

      S.divider(),

      // Catalog Section
      S.listItem()
        .title("Products")
        .schemaType("product")
        .child(S.documentTypeList("product").title("Products")),
      S.listItem()
        .title("Makers")
        .schemaType("maker")
        .child(S.documentTypeList("maker").title("Makers")),
      S.listItem()
        .title("Materials")
        .schemaType("material")
        .child(S.documentTypeList("material").title("Materials")),

      S.divider(),

      // Marketing Content
      S.listItem()
        .title("Testimonials")
        .schemaType("testimonial")
        .child(S.documentTypeList("testimonial").title("Testimonials")),
      S.listItem()
        .title("Team Members")
        .schemaType("teamMember")
        .child(S.documentTypeList("teamMember").title("Team Members")),
      S.listItem()
        .title("Service Packages")
        .schemaType("servicePackage")
        .child(S.documentTypeList("servicePackage").title("Service Packages")),
      S.listItem()
        .title("Trust Badges")
        .schemaType("trustBadge")
        .child(S.documentTypeList("trustBadge").title("Trust Badges")),

      S.divider(),

      // Settings
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
    ]);

export { SINGLETONS };
