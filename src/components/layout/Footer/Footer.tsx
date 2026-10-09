import { TrackedLink } from "@/components/ui/TrackedLink";
import { StrataMark } from "@/components/ui/StrataMark";
import { NewsletterSignup } from "@/components/ui/NewsletterSignup";
import { MotionControl } from "@/components/studio/StudioMotion";

export function Footer() {
  return (
    <footer className="studio-footer" aria-label="Site footer">
      <div className="studio-footer-letter">
        <div>
          <p className="studio-kicker">A letter from the studio.</p>
          <h2>The Designer’s Eye.</h2>
          <p>
            Notes on rooms, materials, and the choices that make a home feel
            like yours.
          </p>
        </div>
        <NewsletterSignup
          variant="inline"
          source="studio_footer"
          showIntro={false}
        />
      </div>
      <div className="studio-footer-main">
        <TrackedLink
          href="/"
          event="nav_link_clicked"
          location="footer"
          label="Patina home"
          className="studio-brand"
          aria-label="Patina home"
        >
          <span>PATINA</span>
          <StrataMark size="compact" align="left" />
        </TrackedLink>
        <nav aria-label="Footer navigation">
          <TrackedLink href="/founding" event="nav_link_clicked" location="footer">Founding Circle</TrackedLink>
          <TrackedLink href="/about" event="nav_link_clicked" location="footer">Our story</TrackedLink>
          <TrackedLink href="/designers" event="nav_link_clicked" location="footer">For designers</TrackedLink>
          <TrackedLink href="/makers" event="nav_link_clicked" location="footer">For makers</TrackedLink>
          <TrackedLink href="/app" event="nav_link_clicked" location="footer">The app</TrackedLink>
          <TrackedLink href="/services" event="nav_link_clicked" location="footer">Design services</TrackedLink>
          <TrackedLink href="/journal" event="nav_link_clicked" location="footer">Journal</TrackedLink>
          <TrackedLink href="/press" event="nav_link_clicked" location="footer">Press</TrackedLink>
          <TrackedLink href="/contact" event="nav_link_clicked" location="footer">Say hello</TrackedLink>
        </nav>
        <p>
          From Madison, Wisconsin.
          <br />
          Open wherever you call home.
        </p>
      </div>
      <div className="studio-footer-bottom">
        <span>© {new Date().getFullYear()} Patina. Where Time Adds Value.</span>
        <div>
          <TrackedLink href="/privacy" event="nav_link_clicked" location="footer">Privacy</TrackedLink>
          <TrackedLink href="/terms" event="nav_link_clicked" location="footer">Terms</TrackedLink>
          <MotionControl />
        </div>
      </div>
    </footer>
  );
}
