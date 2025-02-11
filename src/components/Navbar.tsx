import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import { useState } from 'react'
import { NavLink as RouterLink } from 'react-router-dom'

const NavContainer = styled(motion.nav)`
  background: ${props => props.theme.navBg};
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: ${props => props.theme.navShadow};
`

const NavContent = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 0 22px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.text};
  cursor: pointer;
  
  img {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 28px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  padding: 8px;
  color: ${props => props.theme.text};
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 48px;
  left: 0;
  right: 0;
  background: ${props => props.theme.navBg};
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  padding: 16px;
  box-shadow: ${props => props.theme.shadow};

  @media (max-width: 768px) {
    display: block;
  }
`

const NavLink = styled(RouterLink)`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.01em;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  background: transparent;

  &:hover {
    background: ${props => props.theme.buttonBg};
  }

  &.active {
    font-weight: 500;
    background: ${props => props.theme.buttonBg};
  }

  @media (max-width: 768px) {
    display: block;
    padding: 12px;
    font-size: 16px;
  }
`

const NavActions = styled.div`
  display: flex;
  align-items: center;
`

const menuVariants = {
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2
    }
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const menuItemVariants = {
  closed: { x: -20, opacity: 0 },
  open: { x: 0, opacity: 1 }
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <NavContainer>
      <NavContent>
        <Logo>
          <img src="/minecraft.svg" alt="Logo" />
          JBpotato
        </Logo>
        
        <NavLinks>
          <NavLink to="/" end>服务器信息</NavLink>
          <NavLink to="/message-board">留言板</NavLink>
          <NavActions>
            <ThemeToggle />
          </NavActions>
        </NavLinks>

        <MobileMenuButton
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </MobileMenuButton>
      </NavContent>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.div variants={menuItemVariants}>
              <NavLink to="/" end>服务器信息</NavLink>
            </motion.div>
            <motion.div variants={menuItemVariants}>
              <NavLink to="/message-board">留言板</NavLink>
            </motion.div>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavContainer>
  )
}

export default Navbar 