"use client";

import { useRef, ReactNode, CSSProperties } from "react";
import { motion, useInView } from "framer-motion";

interface RevealWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  style?: CSSProperties;
  id?: string;
}

export default function RevealWrapper({
  children,
  className = "",
  delay = 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  threshold = 0.15,
  style,
  id,
}: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      id={id}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: delay / 1000,
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
