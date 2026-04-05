"use client";

import Link from "next/link";
import { socials } from "@/data/socials";
import { NavItems as items } from "@/data/navItems";

const Footer = () => {
  return (
    <footer className="dark:bg-[#0d0d0d]  border-t border-white/5">
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
            <ul className="space-y-2">
              {items.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-green-500 transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-green-500 font-semibold mb-4">Connect</h3>
            <div className="flex items-center gap-4 text-gray-400">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-500 transition"
                >
                  <social.icon size={20} />
                </a>
              ))}
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
