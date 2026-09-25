"use client";

import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, useReducedMotion } from "framer-motion";
import NextLink from "next/link";

import { DATA } from "@/data";

export const Footer = () => {
  const reduce = useReducedMotion();
  const { name, description, contact, socialLinks, services } = DATA.footer;

  return (
    <footer className="border-t border-divider bg-content1/80 py-14">
      <motion.div
        className="mx-auto max-w-6xl px-4"
        initial={reduce ? undefined : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="mb-3 font-display text-2xl font-semibold">Let&apos;s talk</h2>
            <p className="mb-4 max-w-md text-foreground-500">{description}</p>
            <Button
              as={NextLink}
              className="mb-4"
              color="primary"
              href="/schedule"
              size="sm"
              variant="flat"
            >
              Schedule a meeting
            </Button>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  aria-label={social.platform}
                  href={social.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Button isIconOnly variant="light">
                    <Icon className="w-5 h-5" icon={social.icon} />
                  </Button>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-foreground-600">
              {services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-foreground-600">
              <li className="flex items-center gap-2">
                <Icon icon="lucide:mail" />
                <a className="break-all hover:text-primary" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="lucide:phone" />
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="lucide:map-pin" />
                {contact.location}
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-divider pt-8 text-center text-foreground-500">
            <p>
            © {new Date().getFullYear()} {name}. shubh.work
          </p>
        </div>
      </motion.div>
    </footer>
  );
};
