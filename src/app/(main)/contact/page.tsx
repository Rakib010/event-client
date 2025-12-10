import React from "react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <section className="bg-gray-400 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-lg">
          We’d love to hear from you. Send us a message!
        </p>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-xl p-8 border border-orange-100">
          <form className="space-y-6">
            <div>
              <label className="block font-medium mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
