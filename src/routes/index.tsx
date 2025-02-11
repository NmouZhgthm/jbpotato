import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import ServerInfo from '../components/ServerInfo'
import MessageBoard from '../components/MessageBoard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ServerInfo />
      },
      {
        path: 'message-board',
        element: <MessageBoard />
      }
    ]
  }
]) 