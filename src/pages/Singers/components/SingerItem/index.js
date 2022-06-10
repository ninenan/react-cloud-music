import { ListItem } from './style';

export default function SingerItem(props) {
  const { picUrl, name } = props

  return (
    <ListItem>
      <img src={`${picUrl}?param=300*300`} width="100%" height="100%" alt="musicImg" />
      <span className="img-name">{name}</span>
    </ListItem>
  )
}
