import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Signup2 from './pages/Signup2'
import Main from './pages/Main'
import ReceiptUpload from './pages/ReceiptUpload'
import AdminMain from './pages/admin/AdminMain'
import WeeklyActivation from './pages/admin/WeeklyActivation'
import UserDashboard from './pages/admin/UserDashboard'
import CollegeSpending from './pages/admin/CollegeSpending'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signup2" element={<Signup2 />} />
      <Route path="/main" element={<Main />} />
      <Route path="/receipt-upload" element={<ReceiptUpload />} />
      <Route path="/admin" element={<AdminMain />} />
      <Route path="/admin/weekly-activation" element={<WeeklyActivation />} />
      <Route path="/admin/user-dashboard" element={<UserDashboard />} />
      <Route path="/admin/college-spending" element={<CollegeSpending />} />
    </Routes>
  )
}

export default App
