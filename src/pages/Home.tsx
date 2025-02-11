import styled from 'styled-components'
import { motion } from 'framer-motion'
import ServerInfo from '../components/ServerInfo'
import MessageBoard from '../components/MessageBoard'

const Header = styled.header`
  text-align: center;
  margin: 60px 0 80px;
  
  h1 {
    font-size: 48px;
    font-weight: 600;
    letter-spacing: -0.003em;
    color: ${props => props.theme.text};
    margin-bottom: 12px;
    transition: color 0.3s ease;
  }

  p {
    font-size: 21px;
    line-height: 1.381;
    font-weight: 400;
    letter-spacing: .011em;
    color: ${props => props.theme.textSecondary};
    transition: color 0.3s ease;
  }
`

const Section = styled(motion.section)`
  opacity: 0;
`

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

function Home() {
  return (
    <>
      <Header>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          JBpotato Minecraft Server
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          探索、创造、冒险，尽在我们的服务器
        </motion.p>
      </Header>

      <Section
        variants={sectionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ServerInfo />
      </Section>

      <Section
        variants={sectionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <MessageBoard />
      </Section>
    </>
  )
}

export default Home 