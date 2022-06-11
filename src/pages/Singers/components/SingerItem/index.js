import { ListItem } from './style';
import LazyLoadImg from '../../../../baseUI/LazyLoadImg';

export default function SingerItem(props) {
  const { picUrl, name, img1v1Url } = props
  const imageUrl = picUrl || img1v1Url

  return (
    <ListItem>
      <LazyLoadImg>
        <img src={imageUrl} width="100%" height="100%" alt="musicImg" />
      </LazyLoadImg>

      <span className="img-name">{name}</span>
    </ListItem>
  )
}
