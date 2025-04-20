
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-humqadam-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span className="bg-humqadam-purple text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
                HQ
              </span>
              <h3 className="font-heading text-xl ml-2 text-white">HumQadam</h3>
            </Link>
            <p className="text-gray-300 mb-4">
              HumQadam is a community-driven platform dedicated to supporting and uplifting communities across Pakistan by providing resources, support, and opportunities for growth.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/safety" className="text-gray-300 hover:text-white transition-colors">
                  Safety & Emergency
                </Link>
              </li>
              <li>
                <Link to="/health" className="text-gray-300 hover:text-white transition-colors">
                  Health & Well-being
                </Link>
              </li>
              <li>
                <Link to="/rights" className="text-gray-300 hover:text-white transition-colors">
                  Legal Rights
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/family" className="text-gray-300 hover:text-white transition-colors">
                  Family Support
                </Link>
              </li>
              <li>
                <Link to="/stories" className="text-gray-300 hover:text-white transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">
                Email: contact@humqadam.org
              </li>
              <li className="text-gray-300">
                Phone: +92 300 1234567
              </li>
              <li className="text-gray-300">
                Address: Islamabad, Pakistan
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} HumQadam. All rights reserved.
            </p>
            <div className="flex items-center">
              <span className="text-gray-400 text-sm mr-2">Made with</span>
              <Heart size={16} className="text-humqadam-pink" />
              <span className="text-gray-400 text-sm ml-2">for the people of Pakistan</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
