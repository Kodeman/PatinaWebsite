import Link from "next/link";
import { StudioPage } from "@/components/studio/StudioPage";

export default function NotFound() {
  return (
    <StudioPage
      eyebrow="404 / A turn we didn’t expect."
      title={<>Page not found.</>}
      description="This piece seems to have moved. Let’s help you find your way back into the studio."
    >
      <section className="studio-section studio-not-found-actions">
        <Link href="/" className="studio-button">
          Go Home <span aria-hidden="true">↗</span>
        </Link>
        <Link href="/makers" className="studio-link">
          Meet Our Makers <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </StudioPage>
  );
}
