"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { DATA } from "@/data";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = DATA.navigation;

  return (
    <Navbar
      isBordered
      className="bg-background/70 backdrop-blur-md border-b border-divider fixed top-0 z-50"
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="flex justify-between items-center w-full">
        <NavbarBrand>
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              className="font-display text-xl font-semibold tracking-tight text-foreground"
              href="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Shubham
            </Link>
          </motion.div>
        </NavbarBrand>

        <NavbarContent className="hidden flex-grow justify-center gap-4 lg:flex">
          {menuItems.map((item, index) => (
            <NavbarItem key={item.name}>
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors ${
                    item.href === "/schedule"
                      ? "bg-primary font-medium text-primary-foreground"
                      : pathname === item.href
                        ? "font-semibold text-primary"
                        : "text-foreground hover:text-primary"
                  }`}
                  href={item.href}
                >
                  <Icon
                    className={`h-4 w-4 ${item.href === "/schedule" ? "text-primary-foreground" : "text-primary"}`}
                    icon={item.icon}
                  />
                  {item.name}
                </Link>
              </motion.div>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>

        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-background/80 pt-6 backdrop-blur-lg lg:hidden">
        <div className="mx-auto max-w-lg space-y-4">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={item.name}>
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition-colors ${
                    item.href === "/schedule"
                      ? "bg-primary font-medium text-primary-foreground"
                      : "hover:bg-content1"
                  }`}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon
                    className={`h-5 w-5 ${item.href === "/schedule" ? "text-primary-foreground" : "text-primary"}`}
                    icon={item.icon}
                  />
                  {item.name}
                </Link>
              </motion.div>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </Navbar>
  );
};
