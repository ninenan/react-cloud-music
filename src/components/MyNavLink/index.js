import { NavLink } from 'react-router-dom'

export default function MyNavLink(props) {
  return <NavLink style={({ isActive }) => isActive ? { color: 'red' } : null} {...props}></NavLink>
}