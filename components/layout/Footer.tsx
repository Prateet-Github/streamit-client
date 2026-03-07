"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border border-green-500 bg-black">
      <div className="px-6 py-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-green-500 mb-4">StreamIt</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              A modern video streaming platform built for creators and
              developers. Upload, share, and watch high-quality content
              seamlessly.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-green-500 font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-green-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="hover:text-green-500 transition"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/upload"
                  className="hover:text-green-500 transition"
                >
                  Upload
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-500 transition">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-green-500 font-semibold mb-4">Connect</h3>
            <div className="flex items-center gap-4 text-gray-400">
              <a
                href="https://github.com/Prateet-Github"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
              >
                <Github size={20} />
              </a>
              <a
                href="https://x.com/prateet_tiwarii"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
              >
                <Twitter size={20} />
              </a>
              <a
                href="www.linkedin.com/in/prateet-tiwari"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div></div>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} StreamIt. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
