import React from 'react';
import { Outlet } from 'react-router-dom'
import { Top, Tab, TabItem } from './style'
import MyNavLink from '../../components/MyNavLink'

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
            // 如果是自定义的属性的话 需要小写
            <MyNavLink key={link.to} to={link.to} customactivename="active">
              <TabItem>
                <span>{link.title}</span>
              </TabItem>
            </MyNavLink>
          )
        })}
      </Tab>
      <Outlet />
    </>
  )
}

export default React.memo(Home)