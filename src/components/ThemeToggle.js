'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid hydration issues

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <motion.button
      className='p-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
    >
      {currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </motion.button>
  );
}
