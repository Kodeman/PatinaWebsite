import Link from "next/link";

const footerColumns = [
  {
    title: "Explore",
    links: [
      { href: "/furniture", label: "Your Room" },
      { href: "/makers", label: "Makers" },
      { href: "/app", label: "The App" },
      { href: "/journal", label: "Journal" },
    ],
  },
  {
    title: "Work With Us",
    links: [
      { href: "/founding", label: "Founding Circle" },
      { href: "/designers", label: "For Designers" },
      { href: "/makers/apply", label: "For Makers" },
      { href: "/services", label: "Design Services" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "Our Story" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function HomepageFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--patina-ink)] pt-14 pb-9"
      style={{ borderTop: "1px solid rgba(163,146,124,0.06)" }}
    >
      <div className="max-w-[1200px] mx-auto px-[clamp(24px,5vw,72px)]">
        {/* Main Grid */}
        <div className="grid grid-cols-1 min-[601px]:grid-cols-2 min-[901px]:grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-display text-[22px] font-medium text-[var(--patina-off-white)] mb-2.5">
              Patina
            </p>
            <p className="text-[13px] font-light italic text-[var(--patina-clay-beige)] opacity-70">
              Where Time Adds Value
            </p>
          </div>

          {/* Link Columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[9px] tracking-[0.15em] uppercase text-[var(--patina-clay-beige)] opacity-70 mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block text-[13px] font-light text-[var(--patina-clay-light)] opacity-70 transition-all duration-300 hover:text-[var(--patina-off-white)] hover:opacity-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-wrap justify-between items-center gap-3 pt-7"
          style={{ borderTop: "1px solid rgba(163,146,124,0.05)" }}
        >
          <span className="text-[11px] text-[var(--patina-mocha-brown)] opacity-50">
            &copy; {currentYear} Patina. All rights reserved.
          </span>
          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="text-[11px] text-[var(--patina-mocha-brown)] opacity-50 transition-all duration-300 hover:text-[var(--patina-clay-light)] hover:opacity-100"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[11px] text-[var(--patina-mocha-brown)] opacity-50 transition-all duration-300 hover:text-[var(--patina-clay-light)] hover:opacity-100"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
