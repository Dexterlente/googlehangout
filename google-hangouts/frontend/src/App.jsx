import './App.css'
import { Route, Routes } from 'react-router-dom'
import { lazy } from "react";
// import RegistrationPage from './pages/RegistrationPage'
// import loginPage from './pages/loginPage'
import Chat from './components/Chat'
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
import MainPage from './pages/MainPage'
import SendMessage from './pages/SendMessage';
import OutboundCall from './pages/OutboundCall'
import IncomingCall from './pages/IncomingCall'



function App() {

  return (
    <>
      <div className='font-bold'>
            <Routes>
                <Route path="/" element={<MainPage />} />
                  <Route path='/chat' element={<Chat />} />
                  <Route path="/Registration" element={<RegistrationPage />} />
                  <Route path="/Login" element={<LoginPage />} /> 
                  <Route path="/send" element={<SendMessage />} />
                  <Route path="/outbound" element={<OutboundCall />} />
                  <Route path="/comming" element={<IncomingCall />} />
                <Route />             
            </Routes>
      </div>
      </>
  )
}

export default App
