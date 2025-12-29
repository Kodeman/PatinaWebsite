import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

type WebhookPayload = {
  _type: string;
  _id: string;
  slug?: { current: string };
  maker?: { _ref: string };
  material?: { _ref: string };
};

export async function POST(req: NextRequest) {
  try {
    // Validate the webhook signature
    const { body, isValidSignature } = await parseBody<WebhookPayload>(
      req,
      SANITY_WEBHOOK_SECRET
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    // Determine which paths to revalidate based on document type
    const pathsToRevalidate: string[] = [];

    switch (body._type) {
      case "product":
        pathsToRevalidate.push("/furniture");
        pathsToRevalidate.push("/"); // Homepage shows featured products
        if (body.slug?.current) {
          pathsToRevalidate.push(`/furniture/${body.slug.current}`);
        }
        break;

      case "maker":
        pathsToRevalidate.push("/makers");
        pathsToRevalidate.push("/"); // Homepage shows featured makers
        if (body.slug?.current) {
          pathsToRevalidate.push(`/makers/${body.slug.current}`);
        }
        break;

      case "material":
        pathsToRevalidate.push("/materials");
        pathsToRevalidate.push("/furniture"); // Products show materials
        break;

      case "testimonial":
        pathsToRevalidate.push("/");
        pathsToRevalidate.push("/designers");
        break;

      case "teamMember":
        pathsToRevalidate.push("/about");
        break;

      case "servicePackage":
        pathsToRevalidate.push("/services");
        break;

      case "trustBadge":
        pathsToRevalidate.push("/");
        break;

      case "homePage":
        pathsToRevalidate.push("/");
        break;

      case "aboutPage":
        pathsToRevalidate.push("/about");
        break;

      case "appPage":
        pathsToRevalidate.push("/app");
        break;

      case "servicesPage":
        pathsToRevalidate.push("/services");
        break;

      case "designersPage":
        pathsToRevalidate.push("/designers");
        break;

      case "siteSettings":
        // Revalidate all pages for site settings changes
        pathsToRevalidate.push("/");
        pathsToRevalidate.push("/furniture");
        pathsToRevalidate.push("/makers");
        pathsToRevalidate.push("/about");
        pathsToRevalidate.push("/app");
        pathsToRevalidate.push("/designers");
        pathsToRevalidate.push("/services");
        break;

      default:
        // Unknown type, revalidate common pages as fallback
        pathsToRevalidate.push("/");
        pathsToRevalidate.push("/furniture");
    }

    // Revalidate all affected paths
    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      paths: pathsToRevalidate,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating", error: String(error) },
      { status: 500 }
    );
  }
}
