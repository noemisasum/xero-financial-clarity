type PostmarkSendRequest = {
  From: string;
  To: string;
  Subject: string;
  HtmlBody: string;
  TextBody?: string;
  MessageStream?: string;
};

export async function postmarkSend(req: PostmarkSendRequest) {
  const token = process.env.POSTMARK_SERVER_TOKEN;
  if (!token) throw new Error("Missing POSTMARK_SERVER_TOKEN");

  const res = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Postmark-Server-Token": token,
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Postmark send failed ${res.status}: ${txt}`);
  }

  return res.json();
}

export function formatFromHeader() {
  const email = process.env.POSTMARK_FROM_EMAIL || "clarity@aqount.tech";
  const name = process.env.POSTMARK_FROM_NAME || "Aqount Diagnostic";
  return `${name} <${email}>`;
}
