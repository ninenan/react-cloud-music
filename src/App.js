import { GlobalStyle } from './style/reset'
import { IconStyle } from './style/iconfont'
import { Routes, Route, HashRouter } from 'react-router-dom'

import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App

