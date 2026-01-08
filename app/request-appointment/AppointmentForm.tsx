"use client";

import { FormEvent, useState } from "react";

import { sendAppointmentRequest } from "@/app/request-appointment/actions/sendAppointmentRequest";

type AppointmentFormProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
};

export default function AppointmentForm({
  title = "Appointment request",
  description = "Submit your preferred dates and we’ll respond right away.",
  buttonLabel = "Submit request",
}: AppointmentFormProps) {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    await sendAppointmentRequest(formData);
    setSubmitted(true);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full name"
        required
        className="w-full border px-4 py-3 rounded-md"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full border px-4 py-3 rounded-md"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        required
        className="w-full border px-4 py-3 rounded-md"
      />
      <input
        type="text"
        name="preferredDate"
        placeholder="Preferred date or window"
        className="w-full border px-4 py-3 rounded-md"
      />
      <textarea
        name="notes"
        rows={3}
        placeholder="Notes for Dr. Toomey"
        className="w-full border px-4 py-3 rounded-md"
      />
      <button className="w-full bg-teal-600 text-white py-3 rounded-md font-semibold" type="submit">
        {buttonLabel}
      </button>
      {submitted && (
        <p className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
          <span aria-hidden="true">✔</span>
          Appointment request submitted — we’ll reply shortly.
        </p>
      )}
    </form>
  );
}
