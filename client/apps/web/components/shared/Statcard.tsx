import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface StatCardProps {
  number: string;
  label: string;
  hasPlus?: boolean;
  delay?: number;
}

export default function StatCard({ number, label, hasPlus = false, delay = 0 }: StatCardProps) {
  const [count, setCount] = useState(0);
  const targetNumber = parseInt(number.replace(/,/g, ""));

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [targetNumber]);

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="flex items-center justify-center mb-4">
        <h2
          className="font-extrabold leading-none"
          style={{
            fontSize: "clamp(56px, 8vw, var(--text-display))",
            background: "var(--gradient-hero)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {formatNumber(count)}
        </h2>
        {hasPlus && (
          <span
            className="font-extrabold ml-2"
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              color: "var(--color-accent-500)",
            }}
          >
            +
          </span>
        )}
      </div>
      <p className="text-lg md:text-xl" style={{ color: "var(--color-text-gray)" }}>
        {label}
      </p>
    </motion.div>
  );
}
