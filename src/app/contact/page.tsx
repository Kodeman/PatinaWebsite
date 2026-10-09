import type { Metadata } from "next";
import ContactContent from "./ContactContent";
export const metadata: Metadata = {
  title: "Contact — A Note to the Studio",
  description: "A question about Patina, a partnership, or a room on your mind. Write to Kody and Leah in Madison, Wisconsin.",
};
export default function ContactPage() {
  return <ContactContent />;
}
