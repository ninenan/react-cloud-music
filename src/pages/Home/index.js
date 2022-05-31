import React from 'react';
import { NavLink, Routes, Route, HashRouter } from 'react-router-dom'
import { Top, Tab, TabItem } from './style'

import Recommend from '../Recommend'
import Singers from '../Singers';
import Rank from '../Rank';

function Home() {
  return (
    <>
      <Top>
        <span className='iconfont menu'>&#xe65c;</span>
        <span className='title'>cloud-music</span>
        <span className='iconfont search'>&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend">
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>
        <NavLink to="/singers">
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>
        <NavLink to="/rank">
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>
      <Routes>
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/singers" element={<Singers />} />
      </Routes>
    </>
  )
}

export default React.memo(Home)