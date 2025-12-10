export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-400 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">About Our Platform</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Connecting people through events, activities and shared passions.
        </p>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        <div className="bg-white shadow-lg rounded-xl p-8 border border-orange-100">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to help people discover events and activities that
            match their interests, so no one feels left out. Whether it’s
            hiking, concerts, gaming, or learning, we make it easier to connect
            with the right people.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8 border border-orange-100">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">
            Why Choose Us
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li>✔ Easy event discovery</li>
            <li>✔ Safe & secure platform</li>
            <li>✔ Verified hosts</li>
            <li>✔ Real-world social connections</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
