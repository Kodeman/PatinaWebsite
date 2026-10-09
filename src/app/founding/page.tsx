import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { FoundingPageContent } from "./FoundingPageContent";

export const metadata: Metadata = {
  title: "Join the Founding Circle",
  description:
    "Help shape Patina. First access, monthly input, founder updates, and a permanent place in our story. Limited to 200 founding members; open wherever you call home.",
  alternates: { canonical: "/founding" },
};

export default function FoundingPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="studio-page">
        <FoundingPageContent />
      </main>
      <Footer />
    </>
  );
}
