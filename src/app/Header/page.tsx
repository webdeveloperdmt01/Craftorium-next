// app/page.tsx (or better: app/layout.tsx if you want Header globally)
"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isSubShopOpen, setIsSubShopOpen] = useState(false);
  const shopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setIsShopOpen(false);
        setIsSubShopOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-[#fef6eb] relative font-nexa">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 md:px-8 lg:px-8 xl:px-24 py-1">
        {/* Logo + Mobile Menu */}
        <div className="flex items-center justify-between w-full lg:w-auto">
         <Link href="/">
  <Image
    src="/images/ct-logo.png"
    alt="Logo"
    width={200}   // approximate width of your image
    height={80}   // approximate height of your image
    className="h-20 w-auto"
    priority
  />
</Link>

          <button
            className="lg:hidden text-[var(--text-clr)]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Nav Links */}
        <nav
          className={`${isOpen ? "flex" : "hidden"
            } flex-col lg:flex lg:flex-row lg:space-x-6 xl:space-x-10 text-md lg:text-lg xl:text-xl font-semibold text-[var(--text-clr)] mt-4 lg:mt-0 space-y-2 md:space-y-0`}
        >
          <Link href="/home" className="hover:text-[var(--text-hover-clr)]">
            Home
          </Link>

          {/* Shop Dropdown */}
          <div
            ref={shopRef}
            className="relative group"
            onMouseEnter={() => window.innerWidth >= 1024 && setIsShopOpen(true)}
            onMouseLeave={() =>
              window.innerWidth >= 1024 && (setIsShopOpen(false), setIsSubShopOpen(false))
            }
          >
            <button
              onClick={() =>
                window.innerWidth < 1024 && setIsShopOpen(!isShopOpen)
              }
              className="flex items-center hover:text-[var(--text-hover-clr)]"
            >
              Shop <FaChevronDown size={16} className="ml-1" />
            </button>

            {isShopOpen && (
              <div className="absolute left-0 top-full mt-0 lg:w-52 bg-[#fef6eb] border rounded-lg shadow-lg z-50 text-[16px]">
                {/* Sub dropdown */}
                <div
                  className="relative group"
                  onMouseEnter={() =>
                    window.innerWidth >= 1024 && setIsSubShopOpen(true)
                  }
                  onMouseLeave={() =>
                    window.innerWidth >= 1024 && setIsSubShopOpen(false)
                  }
                >
                  <button
                    onClick={() =>
                      window.innerWidth < 1024 && setIsSubShopOpen(!isSubShopOpen)
                    }
                    className="flex justify-between items-center w-full px-2 py-1 hover:bg-gray-100 rounded"
                  >
                    Clothing <FaChevronDown size={14} />
                  </button>

                  {isSubShopOpen && (
                    <div className="absolute left-28 top-6 w-40 bg-[#fef6eb] border rounded-lg shadow-lg">
                      <Link
                        href="/shop/men"
                        className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                      >
                        Men
                      </Link>
                      <Link
                        href="/shop/women"
                        className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                      >
                        Women
                      </Link>
                      <Link
                        href="/shop/kids"
                        className="block px-2 py-1 text-sm hover:bg-gray-100 rounded"
                      >
                        Kids
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/shop/accessories"
                  className="block px-2 py-1 hover:bg-gray-100 rounded"
                >
                  Accessories
                </Link>
                <Link
                  href="/shop/home-decor"
                  className="block px-2 py-1 hover:bg-gray-100 rounded"
                >
                  Home Decor
                </Link>
              </div>
            )}
          </div>

          {/* Other Links */}
          <Link href="/Blogs" className="hover:text-[var(--text-hover-clr)]">
            Blog
          </Link>
          <Link href="/about" className="hover:text-[var(--text-hover-clr)]">
            About
          </Link>
          <Link href="/Artisan" className="hover:text-[var(--text-hover-clr)]">
            Artisans
          </Link>
          <Link href="/Contact" className="hover:text-[var(--text-hover-clr)]">
            Contact
          </Link>
          {/* <Link href="/shop" className="hover:text-[var(--text-hover-clr)]">
            shop
          </Link> */}
          <Link href="/cart-component" className="hover:text-[var(--text-hover-clr)]">
            cart
          </Link>
        
        </nav>

        {/* Search + Icons */}
        <div
          className={`${isOpen ? "flex mt-4" : "hidden"
            } lg:flex items-center space-x-4 mb-4 md:mb-0`}
        >
          <div className="flex items-center border-2 border-[var(--text-hover-clr)] rounded-full px-5 py-1 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search..."
              className="outline-none bg-transparent text-sm flex-1"
            />
            <Search className="w-5 h-5 font-bold text-[var(--text-hover-clr)]" />
          </div>
          <ShoppingCart className="w-6 h-6 text-[var(--text-clr)] cursor-pointer" />
          <User className="w-6 h-6 text-[var(--text-clr)] cursor-pointer" />
        </div>
      </div>
    </header>
  );
}
