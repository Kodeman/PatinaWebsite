import { permanentRedirect } from "next/navigation";

// Legacy piece URLs now lead into the material study. No product is offered for sale.
export default function ProductPage() {
  permanentRedirect("/makers");
}
