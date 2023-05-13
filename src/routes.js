// en AppRoutes.js

import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Index from './components/IndexGame';
import Game from './components/Game';

export default function AppRoutes() {
  return (
 
      <Routes> 
        <Route path='/' element={<Index/>}/>
        <Route path='/game' element={<Game/>}/>
      </Routes>

  )
}