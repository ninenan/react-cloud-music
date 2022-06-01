import React from 'react';
import { Outlet, NavLink } from 'react-router-dom'
import { Top, Tab, TabItem } from './style'

const linkList = [
  {
    to: "/recommend",
    title: "推荐"
  },
  {
    to: "/singers",
    title: "歌手"
  },
  {
    to: "/rank",
    title: "排行榜"
  },
]

function Home() {
  return (
    <>
      <Top>
        <span className='iconfont menu'>&#xe65c;</span>
        <span className='title'>cloud-music</span>
        <span className='iconfont search'>&#xe62b;</span>
      </Top>
      <Tab>
        {linkList.map(link => {
          return (
            <NavLink key={link.to} to={link.to}>
              <TabItem>
                <span>{link.title}</span>
              </TabItem>
            </NavLink>
          )
        })}
      </Tab>
      <Outlet />
    </>
  )
}

export default React.memo(Home)