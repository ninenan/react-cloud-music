import { SongList } from './style';
import { getName } from '../../../../help/utils';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const { tracks } = props;
  console.log('tracks: ', tracks);

  return (
    <SongList>
      {tracks.map((item, index) => {
        return (
          <li key={index} className="item">
            <div className='item-num'>{index + 1}</div>
            <div className='content'>
              <h2 className='name'>{item.name}</h2>
              <p className='desc'>{getName(item.ar)} - {item.al.name}</p>
            </div>
          </li>)
      })}
    </SongList>
  )
}
