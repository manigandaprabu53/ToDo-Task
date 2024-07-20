import React from 'react'
import TopBar from './Components/TopBar'
import { useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import EditUser from './Components/EditUser'

function App() {
  const [data, setData] = useState([]);
  return <>
    
    <div id="wrapper">
      <BrowserRouter>
        {/* <TopBar data={data} setData={setData}/> */}
        <Routes>
          <Route path='/' element={<TopBar data={data} setData={setData}/>}/>
          <Route path='/edit-user/:id' element={<EditUser data={data} setData={setData}/>}/>
          <Route path='*' element={<Navigate to = '/'/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>

  </>
}

export default App