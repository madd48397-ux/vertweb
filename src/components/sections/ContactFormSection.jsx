import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactFormSection({ data }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", company: "", subject: "", message: "" });
  };

  if (submitted) {
    return (
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center animate-fade-in">
          <div className="w-20 h-20 bg-verdot-light rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-verdot" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
          <p className="text-gray-600 mb-6">Thank you for reaching out. Our team will get back to you shortly.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-verdot font-semibold hover:underline"
          >
            Send another message
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{data.heading}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot transition-colors"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
              <select
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot transition-colors bg-white"
              >
                <option value="">Select a subject</option>
                <option value="quote">Request a Quote</option>
                <option value="support">Technical Support</option>
                <option value="sales">Sales Inquiry</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-verdot/20 focus:border-verdot transition-colors resize-none"
            />
          </div>
          <div className="text-center pt-4">
            <button
              type="submit"
              className="inline-flex items-center gap-3 bg-verdot text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-verdot-dark transition-colors"
            >
              <Send size={20} />
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
