import { Metadata } from "next";
import { draftMode } from "next/headers";
import { sanityFetch } from "../../../../sanity/lib/client";
import { makersApplyPageQuery } from "../../../../sanity/lib/queries";
import MakersApplyContent from "./MakersApplyContent";

export const metadata: Metadata = {
  title: "Become a Maker | Patina",
  description:
    "Join Patina's network of artisan furniture makers. We partner with exceptional craftspeople who share our commitment to quality, sustainability, and transparency.",
};

interface MakersApplyPageData {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroHeadlineEmphasis?: string;
  heroDescription?: string;
  criteriaHeader?: string;
  criteria?: Array<{ title: string; description: string; icon?: string }>;
  formHeader?: string;
  formDescription?: string;
  specialties?: string[];
  successMessage?: string;
  successLinkText?: string;
  successLinkHref?: string;
}

export default async function MakerApplyPage() {
  const { isEnabled: isDraft } = await draftMode();

  const pageData = await sanityFetch<MakersApplyPageData | null>({
    query: makersApplyPageQuery,
    isDraftMode: isDraft,
  });

  return (
    <MakersApplyContent
      heroEyebrow={pageData?.heroEyebrow}
      heroHeadline={pageData?.heroHeadline}
      heroHeadlineEmphasis={pageData?.heroHeadlineEmphasis}
      heroDescription={pageData?.heroDescription}
      criteriaHeader={pageData?.criteriaHeader}
      criteria={pageData?.criteria}
      formHeader={pageData?.formHeader}
      formDescription={pageData?.formDescription}
      specialties={pageData?.specialties}
      successMessage={pageData?.successMessage}
      successLinkText={pageData?.successLinkText}
      successLinkHref={pageData?.successLinkHref}
    />
  );
}
