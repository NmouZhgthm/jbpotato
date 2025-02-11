import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/ThemeContext'

const AppContainer = styled(motion.div)`
  padding-top: 44px; // 为固定导航栏留出空间
  min-height: 100vh;
  background-color: ${props => props.theme.background};
  transition: background-color 0.3s ease;
`

const MainContent = styled.main`
  max-width: 980px;
  margin: 0 auto;
  padding: 40px 22px;
`

function App() {
  return (
    <ThemeProvider>
      <AppContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Navbar />
        <MainContent>
          <Outlet />
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  )
}

export default App 