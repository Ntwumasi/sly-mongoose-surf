"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // TODO: Replace with actual form submission
    // For now, simulate a successful submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form data:", data);
    setStatus("success");

    // Reset form
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ocean-deep mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sunset-orange focus:border-transparent"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ocean-deep mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sunset-orange focus:border-transparent"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-ocean-deep mb-1">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sunset-orange focus:border-transparent bg-white"
        >
          <option value="">Select a topic...</option>
          <option value="custom-board">Custom Board Inquiry</option>
          <option value="traditional">Traditional Surfboard</option>
          <option value="alaia">Alaia</option>
          <option value="paipo">Paipo</option>
          <option value="handplane">Handplane</option>
          <option value="general">General Question</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ocean-deep mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sunset-orange focus:border-transparent resize-none"
          placeholder="Tell us about what you're looking for..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-sunset-orange hover:bg-sunset-gold text-foam-white font-semibold py-2.5 sm:py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-green-600 text-center text-sm sm:text-base">
          Thanks for reaching out! We&apos;ll get back to you soon.
        </p>
      )}

      {status === "error" && (
        <p className="text-red-600 text-center text-sm sm:text-base">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
