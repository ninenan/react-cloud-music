import { SongList } from './style';
import { getName } from '../../../../help/utils';
import { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-anonymous-default-export
const SingerList = forwardRef((props, ref) => {
  const { tracks, onPlay, isShowIndex } = props;

  return (
    <SongList ref={ref}>
      {tracks.map((item, index) => {
        return (
          <li key={index} className="item" onClick={() => onPlay(item)}>
            {isShowIndex && <div className='item-num' >{index + 1}</div>}
            <div className='content'>
              <h2 className='name'>{item.name}</h2>
              <p className='desc'>{getName(item.ar)} - {item.al.name}</p>
            </div>
          </li>)
      })}
    </SongList>
  )
})

SingerList.defaultProps = {
  tracks: [],
  onPlay: () => {},
  isShowIndex: false
};

SingerList.propTypes = {
  tracks: PropTypes.array,
  onplay: PropTypes.func,
  isShowIndex: PropTypes.bool
};

export default memo(SingerList);
