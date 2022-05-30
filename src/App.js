import './App.css';
import { GlobalStyle } from './style/reset'
import { IconStyle } from './style/iconfont'
import { HashRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

import MyNavLink from './components/MyNavLink'
import Home from './pages/Home';
import Recommend from './pages/Recommend'
import Singers from './pages/Singers';
import Rank from './pages/Rank';

function App() {
  return (
    <div className="App">
      <HashRouter>
        {/* {renderRoutes(routes)} */}
        <GlobalStyle></GlobalStyle>
        <header className="App-header">
          <IconStyle></IconStyle>
          <i className="iconfont">&#xe62b;</i>

          <MyNavLink key="recommend" to={'/recommend'}>recommand</MyNavLink>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/recommend' element={<Recommend />} />
            <Route path='/singers' element={<Singers />} />
            <Route path='/rank' element={<Rank />} />
          </Routes>
        </header>
      </HashRouter>
    </div>
  );
}

export default App;
