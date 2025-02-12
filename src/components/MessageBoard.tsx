import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, type Message } from '../lib/supabase'

const Section = styled.section`
  margin-bottom: 80px;
`

const SectionTitle = styled.h2`
  font-size: 32px;
  line-height: 1.125;
  font-weight: 600;
  letter-spacing: 0.004em;
  color: ${props => props.theme.text};
  margin-bottom: 40px;
  text-align: center;
`

const Card = styled.div`
  background: ${props => props.theme.cardBg};
  border-radius: 20px;
  padding: 30px;
  box-shadow: ${props => props.theme.shadow};
  border: ${props => props.theme.cardBorder};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background-image: ${props => props.theme.cardGradient};
`

const MessageForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const InputGroup = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const FormField = styled.div`
  flex: 1;
`

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 8px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 17px;
  line-height: 1.47059;
  font-weight: 400;
  letter-spacing: -0.022em;
  color: ${props => props.theme.text};
  background: ${props => props.theme.inputBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 4px ${props => props.theme.primary}33;
  }

  &::placeholder {
    color: ${props => props.theme.textSecondary};
    opacity: 0.5;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-size: 17px;
  line-height: 1.47059;
  font-weight: 400;
  letter-spacing: -0.022em;
  color: ${props => props.theme.text};
  background: ${props => props.theme.inputBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  height: 120px;
  resize: vertical;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 4px ${props => props.theme.primary}33;
  }

  &::placeholder {
    color: ${props => props.theme.textSecondary};
    opacity: 0.5;
  }
`

const Button = styled(motion.button)`
  background: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: ${props => props.theme.primaryHover};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

const MessageList = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`

const MessageCard = styled(motion(Card))`
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadowHover};
  }
`

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
`

const MessageInfo = styled.div`
  flex: 1;
  
  h4 {
    font-size: 17px;
    font-weight: 600;
    color: ${props => props.theme.text};
    margin-bottom: 4px;
  }
  
  time {
    font-size: 13px;
    color: ${props => props.theme.textSecondary};
  }
`

const MessageContent = styled.p`
  font-size: 15px;
  line-height: 1.47059;
  color: ${props => props.theme.textSecondary};
`

const TabList = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 40px;
  background: ${props => props.theme.buttonBg};
  padding: 4px;
  border-radius: 12px;
`

const TabButton = styled(motion.button)<{ $isActive: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background: ${props => props.$isActive ? props.theme.cardBg : 'transparent'};
  color: ${props => props.$isActive ? props.theme.text : props.theme.textSecondary};
  flex: 1;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: ${props => !props.$isActive && props.theme.buttonHover};
  }
`

const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 17px;
  line-height: 1.47059;
  font-weight: 400;
  letter-spacing: -0.022em;
  color: ${props => props.theme.text};
  background: ${props => props.theme.inputBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 4px ${props => props.theme.primary}33;
  }
`

const ChatTypeTag = styled.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  background: ${props => props.theme.buttonBg};
  color: ${props => props.theme.textSecondary};
`

const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  color: ${props => props.theme.textSecondary};
`

type TabType = 'message' | 'bug' | 'chat';

const messageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

function MessageBoard() {
  const [activeTab, setActiveTab] = useState<TabType>('message')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [bugType, setBugType] = useState('gameplay')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low')
  const [chatType, setChatType] = useState('general')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [activeTab])

  const fetchMessages = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        throw error
      }

      setMessages(data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && content.trim()) {
      setIsSubmitting(true)
      
      try {
        const newMessage = {
          type: activeTab,
          name,
          email: email || null,
          content,
          ...(activeTab === 'bug' && { 
            bug_type: bugType,
            priority 
          }),
          ...(activeTab === 'chat' && { 
            chat_type: chatType 
          })
        }

        const { error } = await supabase
          .from('messages')
          .insert([newMessage])

        if (error) {
          throw error
        }

        // 重新获取消息以确保显示最新数据
        await fetchMessages()
        
        // 清空表单
        setName('')
        setEmail('')
        setContent('')
      } catch (error) {
        console.error('Error inserting message:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString))
  }

  const renderForm = () => {
    return (
      <MessageForm onSubmit={handleSubmit}>
        <InputGroup>
          <FormField>
            <Label>名字</Label>
            <Input
              type="text"
              placeholder="请输入你的名字"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <Label>邮箱 (选填)</Label>
            <Input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormField>
        </InputGroup>

        {activeTab === 'bug' && (
          <InputGroup>
            <FormField>
              <Label>问题类型</Label>
              <Select value={bugType} onChange={(e) => setBugType(e.target.value)}>
                <option value="gameplay">游戏玩法</option>
                <option value="technical">技术问题</option>
                <option value="plugin">插件问题</option>
                <option value="other">其他</option>
              </Select>
            </FormField>
            <FormField>
              <Label>优先级</Label>
              <Select 
                value={priority} 
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              >
                <option value="low">低</option>
                <option value="medium">中</option>
                <option value="high">高</option>
              </Select>
            </FormField>
          </InputGroup>
        )}

        {activeTab === 'chat' && (
          <FormField>
            <Label>聊天类型</Label>
            <Select value={chatType} onChange={(e) => setChatType(e.target.value)}>
              <option value="general">综合讨论</option>
              <option value="help">求助</option>
              <option value="suggestion">建议</option>
              <option value="trade">交易</option>
            </Select>
          </FormField>
        )}
        
        <FormField>
          <Label>
            {activeTab === 'message' && '留言内容'}
            {activeTab === 'bug' && '问题描述'}
            {activeTab === 'chat' && '聊天内容'}
          </Label>
          <TextArea
            placeholder={
              activeTab === 'message' ? '写下你想说的话...' :
              activeTab === 'bug' ? '详细描述你遇到的问题...' :
              '开始你的讨论...'
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </FormField>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? (
            <>
              <svg viewBox="0 0 24 24">
                <path
                  d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                  fill="currentColor"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="0.75s"
                    values="0 12 12;360 12 12"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
              发送中...
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
              {activeTab === 'message' ? '发送留言' :
               activeTab === 'bug' ? '提交反馈' :
               '发送消息'}
            </>
          )}
        </Button>
      </MessageForm>
    )
  }

  const renderMessage = (message: Message) => {
    const getTypeLabel = () => {
      if (message.type === 'bug' && message.bug_type) {
        return (
          <span style={{ 
            background: message.priority === 'high' ? '#ff3b30' : 
                       message.priority === 'medium' ? '#ff9500' : 
                       '#34c759',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            color: 'white'
          }}>
            {message.bug_type}
          </span>
        )
      }
      if (message.type === 'chat' && message.chat_type) {
        return (
          <ChatTypeTag>
            {message.chat_type}
          </ChatTypeTag>
        )
      }
      return null
    }

    return (
      <MessageCard
        key={message.id}
        variants={messageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        layout
      >
        <MessageHeader>
          <Avatar>{getInitials(message.name)}</Avatar>
          <MessageInfo>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h4>{message.name}</h4>
              {getTypeLabel()}
            </div>
            <time>{formatDate(message.created_at)}</time>
          </MessageInfo>
        </MessageHeader>
        <MessageContent>{message.content}</MessageContent>
      </MessageCard>
    )
  }

  return (
    <Section>
      <SectionTitle>留言板</SectionTitle>

      <TabList>
        <TabButton
          $isActive={activeTab === 'message'}
          onClick={() => setActiveTab('message')}
          whileTap={{ scale: 0.95 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          留言
        </TabButton>
        <TabButton
          $isActive={activeTab === 'bug'}
          onClick={() => setActiveTab('bug')}
          whileTap={{ scale: 0.95 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          </svg>
          Bug反馈
        </TabButton>
        <TabButton
          $isActive={activeTab === 'chat'}
          onClick={() => setActiveTab('chat')}
          whileTap={{ scale: 0.95 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 8h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2v4l-4-4H9a2 2 0 0 1-2-2v-1" />
            <path d="M15 2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2v4l4-4h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
          </svg>
          创建聊天
        </TabButton>
      </TabList>
      
      <Card>
        {renderForm()}
      </Card>

      <MessageList>
        <AnimatePresence>
          {isLoading ? (
            <LoadingText>
              加载中...
            </LoadingText>
          ) : messages
              .filter(message => message.type === activeTab)
              .map(renderMessage)}
        </AnimatePresence>
      </MessageList>
    </Section>
  )
}

export default MessageBoard