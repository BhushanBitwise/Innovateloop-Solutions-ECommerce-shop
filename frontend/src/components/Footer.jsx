import { Link } from "react-router-dom";
import { BsBagHeart, BsFacebook, BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";
import { FiMail, FiPhone, FiMapPin, FiHeart } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 overflow-hidden">

      {/* Light Blue Shine Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-white to-indigo-300" />

      {/* Soft Shine Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl" />

      {/* Content */}
      <div className="relative z-10 border-t border-blue-200/40">

        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand Column */}
            <div className="space-y-5">
              <Link to="/" className="flex items-center space-x-2 group">
                <BsBagHeart className="text-3xl text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  UNIK
                </span>
              </Link>

              <p className="text-gray-600 text-sm leading-relaxed">
                Premium quality products for your lifestyle.
                Experience fast delivery with modern elegance.
              </p>

              <div className="flex space-x-3">
                {[BsFacebook, BsTwitter, BsInstagram, BsYoutube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center text-blue-500 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  >
                    <Icon className="text-sm" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-5">Quick Links</h3>
              <ul className="space-y-3">
                {["Home", "Products", "Cart", "Orders"].map((item, i) => (
                  <li key={i}>
                    <Link
                      to="/"
                      className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-5">Support</h3>
              <ul className="space-y-3">
                {["FAQ", "Shipping Info", "Returns", "Contact Us"].map((item, i) => (
                  <li key={i}>
                    <Link
                      to="/"
                      className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-5">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiMapPin className="text-blue-600 text-sm" />
                  </div>
                  <span className="text-gray-600 text-sm">
                    123 Business Bay, Dubai, UAE
                  </span>
                </li>

                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiPhone className="text-blue-600 text-sm" />
                  </div>
                  <span className="text-gray-600 text-sm">
                    +1 234 567 890
                  </span>
                </li>

                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FiMail className="text-blue-600 text-sm" />
                  </div>
                  <span className="text-gray-600 text-sm">
                    support@unik.com
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-200/40 py-5">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            
            <p className="text-sm text-gray-500">
              © {currentYear} UNIK. All rights reserved.
            </p>

            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <span>crafted with</span>
              <FiHeart className="text-red-400 text-sm" />
              <span>by</span>
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-medium">
                BhushanBitwise
              </span>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
