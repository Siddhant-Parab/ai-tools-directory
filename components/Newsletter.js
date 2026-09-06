"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [status, setStatus] = useState("idle"); // idle | submitted

  function handleSubmit(e) {
    e.preventDefault();
    // Wire this up to your provider of choice (Mailchimp, ConvertKit,
    // Firebase function, custom API route, etc). For now it just
    // confirms locally.
    setStatus("submitted");
  }

  return (
    <div className="bg-ink text-paper">
      <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl font-semibold">
            New tools, once a week.
          </h2>
          <p className="text-paper/60 mt-1 max-w-md">
            One short email every Thursday with the newest additions to the
            index. No spam, unsubscribe anytime.
          </p>
        </div>

        {status === "submitted" ? (
          <div className="flex items-center gap-2 text-sm bg-white/10 rounded-sm px-4 py-3 w-full md:w-auto">
            <Check size={16} />
            You're on the list.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full md:w-auto max-w-md"
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="flex-1 bg-white/10 placeholder:text-paper/40 text-paper px-4 py-3 rounded-l-sm outline-none border border-white/10 focus-visible:outline-accent"
            />
            <button
              type="submit"
              className="bg-accent text-white px-4 py-3 rounded-r-sm flex items-center gap-1.5 text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Subscribe
              <ArrowRight size={15} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
