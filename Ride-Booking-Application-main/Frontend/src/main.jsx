import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/userContext.jsx'
import CaptionContext from './context/captionContext.jsx' // ✅ Use default export
import SocketContext from './context/socketContext.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <CaptionContext> {/* ✅ Correct wrapper */}
    <UserContext>
      <SocketContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketContext>
    </UserContext>
  </CaptionContext>
  // </StrictMode>
)
