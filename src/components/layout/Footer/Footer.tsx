import Link from "next/link";
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
        <Link href="/" className="studio-brand" aria-label="Patina home">
          <span>PATINA</span>
          <StrataMark size="compact" align="left" />
        </Link>
        <nav aria-label="Footer navigation">
          <Link href="/founding">Founding Circle</Link>
          <Link href="/about">Our story</Link>
          <Link href="/designers">For designers</Link>
          <Link href="/makers">For makers</Link>
          <Link href="/app">The app</Link>
          <Link href="/services">Design services</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/press">Press</Link>
          <Link href="/contact">Say hello</Link>
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
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <MotionControl />
        </div>
      </div>
    </footer>
  );
}
