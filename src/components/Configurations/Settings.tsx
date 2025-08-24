import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/providers/ThemeProvider'
import './Settings.sass'

export const Settings = () => {
  const { theme, toggleTheme } = useTheme()

  const knobVariants = {
    light: { x: 0, scale: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.10)' },
    dark: { x: 0, scale: 1.08, boxShadow: '0 4px 16px rgba(0,0,0,0.20)' }
  }


  const sliderVariants = {
    light: { backgroundColor: '#341931' },
    dark: { backgroundColor: '#ffffff' }
  }

  return (
      <section className="settings-wrapper">
        <h2>Settings</h2>
        <div className="settings">
          <label className="toggle-switch" htmlFor="themeToggle">
            <input
                id="themeToggle"
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
            />
            <motion.span
                className="slider"
                layout
                variants={sliderVariants}
                animate={theme ?? "light"}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                aria-hidden="true"
            />
            <motion.span
                className="knob"
                layout
                variants={knobVariants}
                animate={theme ?? "light"}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                aria-hidden="true"
            />
          </label>
          <AnimatePresence initial={false} mode="wait">
            <motion.span
                key={theme}
                className="label-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </motion.span>
          </AnimatePresence>
        </div>
      </section>
  )
}
