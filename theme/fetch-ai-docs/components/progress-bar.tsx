import React from "react";
import cn from "clsx";
import { motion, useScroll } from "framer-motion";

export function Progressbar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div className={cn("progress-bar")} style={{ scaleX: scrollYProgress }} />
  );
}

