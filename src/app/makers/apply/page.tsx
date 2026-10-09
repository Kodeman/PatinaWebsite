import type { Metadata } from "next";
import MakersApplyContent from "./MakersApplyContent";
export const metadata: Metadata = {
  title: "Apply to Partner — For Makers",
  description: "Share your workshop and craft with Patina. Kody and Leah personally review applications for our first 15 founding maker partnerships.",
};
export default function MakerApplyPage() {
  return <MakersApplyContent />;
}
