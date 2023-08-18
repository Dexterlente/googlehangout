import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import { lazy } from "react";
// import RegistrationPage from './pages/RegistrationPage'
// import loginPage from './pages/loginPage'
import Chat from './components/Chat'
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
import MainPage from './pages/MainPage'
import NavBar from './components/NavBar'
import SendMessage from './pages/SendMessage';
import OutboundCall from './pages/OutboundCall'
import IncomingCall from './pages/IncomingCall'
import LobbyRoom from './group/LobbyRoom'
import RoomRTC from './group/RoomRTC'
import Simple from './group/Simple'


function App() {
  const Nav = () => {
    return (
      <>
      <NavBar />
      <Outlet />
      </>
    )
  }

  return (
    <>
      <div className='font-bold'>
            <Routes>
              <Route path="/" element={<Nav />}>
                  <Route path="/" element={<MainPage />} />
                  <Route path='/chat' element={<Chat />} />
                  <Route path="/Registration" element={<RegistrationPage />} />
                  <Route path="/Login" element={<LoginPage />} /> 
                  <Route path="/send" element={<SendMessage />} />
                  <Route path="/outbound" element={<OutboundCall />} />
                  <Route path="/comming" element={<IncomingCall />} />
                  <Route path="/lobby" element={<LobbyRoom />} />
                  <Route path="/room/:roomId" element={<RoomRTC />} />
                  <Route path="/simple" element={<Simple />} />
                  {/* <Route path="/room/:roomId" component={RoomRTC} /> */}
                </Route>             
            </Routes>
      </div>
      </>
  )
}

export default App
