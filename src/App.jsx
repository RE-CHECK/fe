import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Signup2 from './pages/Signup2'
import Main from './pages/Main'
import ReceiptUpload from './pages/ReceiptUpload'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup2" element={<Signup2 />} />
      <Route path="/main" element={<Main />} />
      <Route path="/receipt-upload" element={<ReceiptUpload />} />
    </Routes>
  )
}

export default App
