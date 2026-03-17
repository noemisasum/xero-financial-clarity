import { NextResponse } from "next/server";

// Minimal security.txt so researchers/users know how to report issues.
// https://securitytxt.org/
export async function GET() {
  const body = [
    "Contact: mailto:support@aqount.tech",
    "Preferred-Languages: en",
    "Policy: https://clarity.aqount.tech/privacy",
    "Expires: 2026-12-31T00:00:00.000Z",
  ].join("\n");

  return new NextResponse(body + "\n", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Allow crawlers/tools to fetch without caching surprises
      "Cache-Control": "public, max-age=3600",
    },
  });
}
