import { NavLink } from 'react-router-dom'

export default function MyNavLink(props) {
  const { customactivename } = props

  return <NavLink
    className={({ isActive }) => isActive ? customactivename ? customactivename : 'active' : undefined}
    {...props}
  >
  </NavLink>
}