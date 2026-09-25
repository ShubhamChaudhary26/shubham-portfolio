import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/react";

import { ContactCardProps } from "@/components/contact/types";

export const ContactCard = ({ heading, children }: ContactCardProps) => (
  <motion.div
    className="max-w-3xl mx-auto"
    initial={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    viewport={{ once: true }}
    whileInView={{ opacity: 1, y: 0 }}
  >
    <Card className="border border-divider bg-content1/80 shadow-sm">
      <CardBody className="p-6 sm:p-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
            {heading}
          </h2>
        </div>
        {children}
      </CardBody>
    </Card>
  </motion.div>
);
