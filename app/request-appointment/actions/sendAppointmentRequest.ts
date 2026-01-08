"use server";

import { Resend } from "resend";

export async function sendAppointmentRequest(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const preferredDate = formData.get("preferredDate");
  const notes = formData.get("notes");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is missing; appointment request not sent", {
      name,
      email,
      phone,
      preferredDate,
      notes,
    });
    return { ok: false, error: "Email service not configured." };
  }

  const resend = new Resend(apiKey);
  const safeName = typeof name === "string" ? name : "";
  const safeEmail = typeof email === "string" ? email : "";
  const safePhone = typeof phone === "string" ? phone : "";
  const safeDate = typeof preferredDate === "string" ? preferredDate : "";
  const safeNotes = typeof notes === "string" ? notes : "";

  await resend.emails.send({
    from: "Florida Surgical Specialists <inquiries@floridasurgicalspecialists.com>",
    to: ["floridasurgicalspecialists@gmail.com"],
    replyTo: safeEmail || undefined,
    subject: `Appointment request from ${safeName || "a patient"}`,
    html: `
      <h2>New Appointment Request</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Phone:</strong> ${safePhone}</p>
      <p><strong>Preferred date:</strong> ${safeDate || "Not provided"}</p>
      <p><strong>Notes:</strong> ${safeNotes || "N/A"}</p>
    `,
  });

  return { ok: true };
}
