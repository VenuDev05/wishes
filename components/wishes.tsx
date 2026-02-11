'use client';

import React, { useState } from "react";
import emailjs from '@emailjs/browser';

interface Wish {
  id: number;
  name: string;
  message: string;
  emoji: string;
}

const INITIAL_WISHES: Wish[] = [
  {
    id: 1,
    name: 'Venu',
    message: 'Happy Birthday to my amazing brother! Wishing you all the joy and happiness in the world.',
    emoji: '🎂'
  }
];

export function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.message.trim()) return;

    setLoading(true);

    try {
      // 🔥 Send Email
      await emailjs.send(
        "service_03z10rm",          // Your Service ID
        "template_12fwvah",         // Your Template ID
        {
          from_name: formData.name,
          message: formData.message,
        },
        "1bA-u34Rl7UeQWW8N"          // Your Public Key
      );

      // Add wish to UI
      const newWish: Wish = {
        id: wishes.length + 1,
        name: formData.name,
        message: formData.message,
        emoji: '🎉'
      };

      setWishes([...wishes, newWish]);
      setFormData({ name: '', message: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);

    } catch (error) {
      alert("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-10">
          💌 Birthday Wishes
        </h2>

        {/* Display Wishes */}
        <div className="grid gap-6 mb-12">
          {wishes.map((wish) => (
            <div key={wish.id} className="p-6 border-l-4 border-primary rounded-lg shadow">
              <div className="flex gap-4">
                <span className="text-4xl">{wish.emoji}</span>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{wish.name}</h3>
                  <p>{wish.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="p-8 border rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">
            ✍️ Add Your Wish
          </h3>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 text-center rounded-lg">
              ✨ Wish sent successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />

            <textarea
              placeholder="Your Message"
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg hover:scale-105 transition"
            >
              {loading ? "Sending..." : "Send Birthday Wish 🎉"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
