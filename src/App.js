import { GlobalStyle } from './style/reset'
import { IconStyle } from './style/iconfont'
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom'

import Home from './pages/Home';
import Recommend from './pages/Recommend'
import Singers from './pages/Singers';
import Rank from './pages/Rank';

function App() {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} >
            <Route path="/" element={<Navigate to='/recommend' />} />
            <Route path="recommend" element={<Recommend />} />
            <Route path="rank" element={<Rank />} />
            <Route path="singers" element={<Singers />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App

