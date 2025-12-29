import Link from "next/link";
import { StrataMark } from "@/components/ui/StrataMark";

const footerLinks = {
  explore: [
    { href: "/furniture", label: "Furniture" },
    { href: "/furniture?collection=featured", label: "Collections" },
    { href: "/makers", label: "Makers" },
    { href: "/materials", label: "Materials" },
  ],
  workWithUs: [
    { href: "/designers", label: "For Designers" },
    { href: "/makers/apply", label: "For Makers" },
    { href: "/services", label: "Design Services" },
  ],
  company: [
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--patina-charcoal)] relative">
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex flex-col items-start mb-5">
              <span className="font-display text-2xl font-medium tracking-[0.2em] text-[var(--patina-off-white)] mb-2">
                PATINA
              </span>
              <StrataMark size="medium" variant="reversed" align="left" />
            </Link>
            <p className="text-[0.9375rem] italic text-[var(--patina-clay-beige)]">
              Where Time Adds Value
            </p>
          </div>

          {/* Explore Column */}
          <div>
            <h5 className="font-display text-base font-medium text-[var(--patina-off-white)] mb-5">
              Explore
            </h5>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[rgba(237,233,228,0.85)] hover:text-[var(--patina-off-white)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Work With Us Column */}
          <div>
            <h5 className="font-display text-base font-medium text-[var(--patina-off-white)] mb-5">
              Work With Us
            </h5>
            <ul className="space-y-3">
              {footerLinks.workWithUs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[rgba(237,233,228,0.85)] hover:text-[var(--patina-off-white)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h5 className="font-display text-base font-medium text-[var(--patina-off-white)] mb-5">
              Company
            </h5>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[rgba(237,233,228,0.85)] hover:text-[var(--patina-off-white)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-[rgba(163,146,124,0.15)]">
          <p className="text-[0.8125rem] text-[rgba(237,233,228,0.7)]">
            &copy; {currentYear} Patina. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-[0.8125rem] text-[rgba(237,233,228,0.85)] hover:text-[var(--patina-off-white)] transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[0.8125rem] text-[rgba(237,233,228,0.85)] hover:text-[var(--patina-off-white)] transition-colors duration-200"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
