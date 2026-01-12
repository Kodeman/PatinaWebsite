import { Metadata } from "next";
import { draftMode } from "next/headers";
import { sanityFetch } from "../../../sanity/lib/client";
import { contactPageQuery } from "../../../sanity/lib/queries";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Patina",
  description:
    "Get in touch with the Patina team. We're here to help with product questions, designer partnerships, and everything in between.",
};

interface ContactPageData {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroHeadlineEmphasis?: string;
  heroDescription?: string;
  contactInfoHeader?: string;
  email?: string;
  phone?: string;
  phoneHours?: string;
  showroomAddress?: string;
  showroomNote?: string;
  quickLinks?: Array<{ label: string; href: string }>;
  contactReasons?: Array<{ value: string; label: string }>;
  successMessage?: string;
}

export default async function ContactPage() {
  const { isEnabled: isDraft } = await draftMode();

  const pageData = await sanityFetch<ContactPageData | null>({
    query: contactPageQuery,
    isDraftMode: isDraft,
  });

  return (
    <ContactContent
      heroEyebrow={pageData?.heroEyebrow}
      heroHeadline={pageData?.heroHeadline}
      heroHeadlineEmphasis={pageData?.heroHeadlineEmphasis}
      heroDescription={pageData?.heroDescription}
      contactInfoHeader={pageData?.contactInfoHeader}
      email={pageData?.email}
      phone={pageData?.phone}
      phoneHours={pageData?.phoneHours}
      showroomAddress={pageData?.showroomAddress}
      showroomNote={pageData?.showroomNote}
      quickLinks={pageData?.quickLinks}
      contactReasons={pageData?.contactReasons}
      successMessage={pageData?.successMessage}
    />
  );
}
