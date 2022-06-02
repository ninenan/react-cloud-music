import { NavLink } from 'react-router-dom'

export default function MyNavLink(props) {
  const { customactivename } = props

  return <NavLink
    className={({ isActive }) => isActive ? customactivename : undefined}
    {...props}
  >
  </NavLink>
}