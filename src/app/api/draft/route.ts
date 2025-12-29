import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");

  // Validate secret
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  // Enable draft mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the appropriate page
  const redirectUrl = getRedirectUrl(type, slug);
  redirect(redirectUrl);
}

function getRedirectUrl(type: string | null, slug: string | null): string {
  switch (type) {
    case "product":
      return slug ? `/furniture/${slug}` : "/furniture";
    case "maker":
      return slug ? `/makers/${slug}` : "/makers";
    case "homePage":
      return "/";
    case "aboutPage":
      return "/about";
    case "appPage":
      return "/app";
    case "designersPage":
      return "/designers";
    case "servicesPage":
      return "/services";
    default:
      return "/";
  }
}
