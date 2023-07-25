import './App.css'
import { Route, Routes } from 'react-router-dom'
import { lazy } from "react";
// import RegistrationPage from './pages/RegistrationPage'
// import loginPage from './pages/loginPage'
import Chat from './components/Chat'
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));



function App() {

  return (
    <>
      <div className='font-bold'>
            <Routes>
                <Route path='/chat' element={<Chat />} />
                <Route path="/Registration" element={<RegistrationPage />} />
                <Route path="/Login" element={<LoginPage />} />               
            </Routes>
      </div>
      </>
  )
}

export default App
