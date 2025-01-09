"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="#home">
      <motion.div
        className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold text-xl overflow-hidden group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 bg-background"
          initial={{ y: "100%" }}
          animate={{ y: "100%" }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="relative z-10 group-hover:text-primary transition-colors duration-200"
        >
          SK
        </motion.span>
      </motion.div>
    </Link>
  )
}

