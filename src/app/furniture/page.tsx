import { permanentRedirect } from "next/navigation";

// Retained as a route-level fallback for clients that resolve this page directly.
export default function FurniturePage() {
  permanentRedirect("/makers");
}
