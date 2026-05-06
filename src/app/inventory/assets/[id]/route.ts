import { requireInventoryUser } from "@/lib/inventory/auth";
import { getInventoryImageObject } from "@/lib/inventory/r2";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireInventoryUser();
  const { id } = await params;
  const result = await getInventoryImageObject(id);

  if (!result?.object.Body) {
    return new Response("Image not found.", { status: 404 });
  }

  return new Response(result.object.Body.transformToWebStream(), {
    headers: {
      "Content-Type": result.asset.contentType,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
