import './App.css'
import { Route, Routes } from 'react-router-dom'
function App() {

  return (
    <>
      <div className='font-bold'>
      <Routes>
            <Route path="/">
              {/* <Route path="/" element={<MainBody />} /> */}
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
            </Route>                  
          </Routes>
      </div>
      </>
  )
}

export default App
