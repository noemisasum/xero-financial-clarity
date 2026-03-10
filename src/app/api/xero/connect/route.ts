import { NextResponse } from "next/server";

// NOTE:
// This is a placeholder endpoint so the landing page can ship now.
// Replace with Xero OAuth initiation (authorize URL + state + PKCE) when ready.
export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "Xero connect is not configured yet. This endpoint is a placeholder for future OAuth integration.",
    },
    { status: 501 },
  );
}
