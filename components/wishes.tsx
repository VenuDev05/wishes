'use client';

import React from "react"

import { useState } from 'react';

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
    message: 'Happy Birthday to my amazing brother! Wishing you all the joy and happiness in the world. You deserve the very best!',
    emoji: '🎂'
  },
  {
    id: 2,
    name: 'Family',
    message: 'On this special day, we celebrate you and all the wonderful moments we\'ve shared. Here\'s to many more happy years ahead!',
    emoji: '❤️'
  },
  {
    id: 3,
    name: 'Friends',
    message: 'May this birthday bring you endless smiles, laughter, and beautiful memories. You\'re truly special to everyone around you!',
    emoji: '✨'
  },
];

export function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.message.trim()) {
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
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-background to-accent/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            💌 Birthday Wishes
          </h2>
          <p className="text-xl text-foreground/70">
            Heartfelt messages and well-wishes from loved ones
          </p>
        </div>

        {/* Wishes Display */}
        <div className="grid gap-6 mb-12">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="bg-card border-l-4 border-primary rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{wish.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {wish.name}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {wish.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Wish Form */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            ✍️ Add Your Wish
          </h3>

          {submitted && (
            <div className="mb-6 p-4 bg-primary/10 border border-primary rounded-lg text-primary text-center font-semibold animate-fade-in">
              ✨ Thank you! Your wish has been added!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-foreground/50"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                placeholder="Write your birthday wishes here..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-foreground/50 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Send Birthday Wish 🎉
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
