import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Dashboard from './pages/dashboard/dashboard'
import Login from './pages/admin/Login'
import { useAuth } from './context/AuthContext'

const App = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center text-sm text-gray-500">
        Checking session...
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route
        path="/dashboard"
        element={
          user ? (
            <>
              <Navbar />
              <Dashboard />
            </>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  )
}

export default App