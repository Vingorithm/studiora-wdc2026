import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const variants = {
  initial:  { opacity: 0, y: 12 },
  animate:  { opacity: 1, y: 0  },
  exit:     { opacity: 0, y: -8 },
}

const transition = {
  duration: 0.22,
  ease: [0.4, 0, 0.2, 1],  // material ease-in-out
}

/**
 * Wraps the <Routes> tree.
 * AnimatePresence needs the key to change on route transitions.
 * We use location.pathname as the key.
 */
export default function PageTransition({ children }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}