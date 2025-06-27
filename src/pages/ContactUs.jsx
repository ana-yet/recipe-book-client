import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ContactUs = () => {
  const onSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Sent successfully!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    e.target.reset();
  };

  return (
    <div className="min-h-[calc(100vh-300px)] max-w-screen-2xl mx-auto py-12 px-4 bg-secondary/10 my-4 rounded-2xl dark:bg-gray-900 transition">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-secondary font-primary mb-2">
          Contact Us
        </h1>
        <p className="text-primary/70 dark:text-gray-300 text-lg max-w-xl mx-auto">
          We'd love to hear from you! Whether it's a question about recipes,
          features, or feedback — we’re here to help.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-primary dark:text-accent text-2xl mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-primary dark:text-secondary">
                Address
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                123 Recipe Street, Dhaka, Bangladesh
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-primary dark:text-accent text-2xl mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-primary dark:text-secondary">
                Email
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                support@recipebook.com
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-primary dark:text-accent text-2xl mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-primary dark:text-secondary">
                Phone
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                +880 123 456 7890
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-primary dark:text-secondary mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full border border-secondary dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-primary dark:text-secondary mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-secondary dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Your Email"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-primary dark:text-secondary mb-1">
              Message
            </label>
            <textarea
              rows="5"
              className="w-full border border-secondary dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Your Message"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-[#3a614a] text-white px-6 py-2 rounded-xl transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
