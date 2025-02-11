import styled from 'styled-components'
import { motion } from 'framer-motion'

const Section = styled.section`
  margin-bottom: 80px;
`

const SectionTitle = styled.h2`
  font-size: 32px;
  line-height: 1.125;
  font-weight: 600;
  letter-spacing: 0.004em;
  color: #1d1d1f;
  margin-bottom: 40px;
  text-align: center;
`

const CardGrid = styled.div`
  display: grid;
  grid-template-areas: 
    "ip version"
    "desc online";
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-areas: 
      "ip"
      "version"
      "online"
      "desc";
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 20px;
  padding: 30px;
  box-shadow: ${props => props.theme.shadow};
  transition: all 0.3s cubic-bezier(0.42, 0, 0.58, 1.0);
  border: ${props => props.theme.cardBorder};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background-image: ${props => props.theme.cardGradient};
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${props => props.theme.gradientBg};
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  &:hover {
    transform: scale(1.02);
    box-shadow: ${props => props.theme.shadowHover};
    
    &::before {
      opacity: 1;
    }
  }
`

const CardTitle = styled.h3`
  font-size: 24px;
  line-height: 1.1666666667;
  font-weight: 600;
  letter-spacing: 0.009em;
  margin-bottom: 12px;
  color: ${props => props.theme.text};
  transition: color 0.3s ease;
`

const CardContent = styled.p`
  font-size: 17px;
  line-height: 1.47059;
  font-weight: 400;
  letter-spacing: -0.022em;
  color: ${props => props.theme.textSecondary};
  transition: color 0.3s ease;
`

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ImageCard = styled(Card)`
  padding: 0;
  overflow: hidden;
  aspect-ratio: 16/10;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${props => props.theme.imageOverlay};
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`

const OnlinePlayersCard = styled(Card)`
  grid-area: online;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 30px;
  background: ${props => props.theme.primary};
  color: white;
  text-align: center;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 12px;
  }
`

const OnlineCount = styled.div`
  font-size: 32px;
  font-weight: 600;
  line-height: 1;
`

const OnlineLabel = styled.div`
  font-size: 17px;
  opacity: 0.9;
`

const serverInfo = [
  {
    title: '服务器IP',
    content: '110.42.59.52',
    area: 'ip'
  },
  {
    title: '游戏版本',
    content: '1.21.1',
    area: 'version'
  },
  {
    title: '服务器介绍',
    content: '欢迎来到JBpotato我的世界服务器！我们提供优质的游戏体验，拥有友好的社区氛围和完善的插件系统。无论您是建筑师、冒险家还是红石工程师，这里都能让您找到归属感！',
    area: 'desc'
  }
]

const serverImages = [
  {
    src: '/images/server1.jpg',
    alt: '服务器风景1'
  },
  {
    src: '/images/server2.jpg',
    alt: '服务器风景2'
  },
  {
    src: '/images/server3.jpg',
    alt: '服务器风景3'
  }
]

function ServerInfo() {
  return (
    <Section>
      <SectionTitle>服务器信息</SectionTitle>

      <CardGrid>
        {serverInfo.map((info, index) => (
          <Card
            key={index}
            style={{ gridArea: info.area }}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <CardTitle>{info.title}</CardTitle>
            <CardContent>{info.content}</CardContent>
          </Card>
        ))}

        <OnlinePlayersCard
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <OnlineCount>42</OnlineCount>
          <OnlineLabel>在线玩家</OnlineLabel>
        </OnlinePlayersCard>
      </CardGrid>
      
      <ImageGrid>
        {serverImages.map((image, index) => (
          <ImageCard 
            key={index}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
          >
            <img src={image.src} alt={image.alt} />
          </ImageCard>
        ))}
      </ImageGrid>
    </Section>
  )
}

export default ServerInfo 