import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const ToggleButton = styled(motion.button)`
  background: ${props => props.theme.buttonBg};
  border: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
  padding: 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.text};
  transition: background-color 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.buttonHover};
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`

const IconWrapper = styled(motion.div)`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 18px;
    height: 18px;
  }
`

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <ToggleButton
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <IconWrapper
        initial={false}
        animate={{ 
          rotate: isDark ? 180 : 0,
          scale: isDark ? 1 : 0.9
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {isDark ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 3v2M12 19v2M5 12H3M21 12h-2M6.4 6.4l1.4 1.4M16.2 16.2l1.4 1.4M6.4 17.6l1.4-1.4M16.2 7.8l1.4-1.4"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 12.35a8.25 8.25 0 11-8.25-8.25c2.83 0 5.2 1.25 6.78 2.87A6.87 6.87 0 0120 12.35z"/>
          </svg>
        )}
      </IconWrapper>
    </ToggleButton>
  )
}

export default ThemeToggle 