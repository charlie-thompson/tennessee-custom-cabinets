import { NextResponse } from "next/server";

interface LeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roomType: string;
  style: string;
  timeline: string;
  budget: string;
  message: string;
}

export async function POST(request: Request) {
  let data: LeadPayload;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  // ── Log lead to console ────────────────────────────────────────────────────
  console.log("[lead]", JSON.stringify(data, null, 2));

  // ── HubSpot Forms API ──────────────────────────────────────────────────────
  if (process.env.HUBSPOT_PORTAL_ID && process.env.HUBSPOT_FORM_GUID) {
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_GUID}`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: [
          { name: "firstname",        value: data.firstName },
          { name: "lastname",         value: data.lastName },
          { name: "email",            value: data.email },
          { name: "phone",            value: data.phone },
          { name: "project_room",     value: data.roomType },
          { name: "cabinet_style",    value: data.style },
          { name: "project_timeline", value: data.timeline },
          { name: "project_budget",   value: data.budget },
          { name: "message",          value: data.message || "" },
        ],
        context: { pageUri: "https://tennesseecustomcabinets.com", pageName: "Home" },
      }),
    });
  }

  // ── Anthropic - personalized follow-up email copy ─────────────────────────
  // Activate: set ANTHROPIC_API_KEY in .env.local, install @anthropic-ai/sdk
  // npm install @anthropic-ai/sdk
  //
  // import Anthropic from "@anthropic-ai/sdk";
  //
  // let aiEmailBody = "";
  // if (process.env.ANTHROPIC_API_KEY) {
  //   const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  //   const msg = await anthropic.messages.create({
  //     model: "claude-sonnet-4-6",
  //     max_tokens: 512,
  //     messages: [
  //       {
  //         role: "user",
  //         content: `You are a copywriter for Tennessee Custom Cabinets, a premium handcrafted cabinet company in Middle Tennessee. Write a short, warm, professional follow-up email body (2–3 paragraphs, no subject line) to a new lead named ${data.firstName}. Their project details: room = ${data.roomType}, style = ${data.style}, timeline = ${data.timeline}, budget = ${data.budget}. Reference their specific project naturally. End with a call to action to call 931.446.8034 or reply to schedule their free in-home consultation. Tone: premium, personal, Southern hospitality.`,
  //       },
  //     ],
  //   });
  //   aiEmailBody = msg.content[0].type === "text" ? msg.content[0].text : "";
  // }

  // ── Resend - deliver notification (and optionally AI follow-up) ───────────
  // Activate: set RESEND_API_KEY in .env.local, verify your sending domain in Resend
  // Docs: https://resend.com/docs
  //
  // import { Resend } from "resend";
  //
  // if (process.env.RESEND_API_KEY) {
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //
  //   // Internal notification to the team
  //   await resend.emails.send({
  //     from: "Tennessee Custom Cabinets <leads@tennesseecustomcabinets.com>",
  //     to: process.env.NOTIFICATION_EMAIL ?? "info@tennesseecustomcabinets.com",
  //     replyTo: data.email,
  //     subject: `New Lead: ${data.firstName} ${data.lastName} - ${data.roomType} (${data.budget})`,
  //     html: `
  //       <p><strong>${data.firstName} ${data.lastName}</strong> - ${data.email} - ${data.phone}</p>
  //       <p>Room: ${data.roomType} | Style: ${data.style} | Timeline: ${data.timeline} | Budget: ${data.budget}</p>
  //       ${data.message ? `<p>Message: ${data.message}</p>` : ""}
  //     `,
  //   });
  //
  //   // AI-generated follow-up to the lead (requires Anthropic block above)
  //   // if (aiEmailBody) {
  //   //   await resend.emails.send({
  //   //     from: "Tennessee Custom Cabinets <hello@tennesseecustomcabinets.com>",
  //   //     to: data.email,
  //   //     subject: `Your custom ${data.roomType} project - next steps`,
  //   //     text: aiEmailBody,
  //   //   });
  //   // }
  // }

  return NextResponse.json({ success: true });
}
