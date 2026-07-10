import { Suspense } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { NewsletterConfirmBanner } from "@/components/ui/NewsletterConfirmBanner";
import { HomepageHero } from "@/components/sections/HomepageHero";
import { AppExperience } from "@/components/sections/AppExperience";
import { Handoff } from "@/components/sections/Handoff";
import { BehindTheScenes } from "@/components/sections/BehindTheScenes";
import { NewsletterDivider } from "@/components/sections/NewsletterDivider";
import { CloseSection } from "@/components/sections/CloseSection";
import { HomepageFooter } from "@/components/sections/HomepageFooter";

export default function HomePage() {
  return (
    <>
      <Suspense fallback={null}>
        <NewsletterConfirmBanner />
      </Suspense>

      <Navigation variant="transparent" hideAtTop />

      <main id="main-content">
        <HomepageHero />
        <AppExperience />
        <Handoff />
        <BehindTheScenes />
        <NewsletterDivider />
        <CloseSection />
      </main>

      <HomepageFooter />
    </>
  );
}
