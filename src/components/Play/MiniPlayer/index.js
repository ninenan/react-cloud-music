import { memo } from 'react';
import PropTypes from 'prop-types';
import { getName } from '../../../help/utils';
import { MiniPlayerContainer } from './style';

const MiniPlayer = (props) => {
  const { song } = props;

  return (
    <MiniPlayerContainer>
      <div className='icon'>
        <div className="imgWrapper">
          <img className="play" src={song.al.picUrl} width="40" height="40" alt="img" />
        </div>
      </div>
      <div className="text">
        <h2 className="name">{song.name}</h2>
        <p className="desc">{getName(song.ar)}</p>
      </div>
      <div className="control">
        <i className="iconfont">&#xe650;</i>
      </div>
      <div className="control">
        <i className="iconfont">&#xe640;</i>
      </div>
    </MiniPlayerContainer>
  )
}

MiniPlayer.defaultProps = {
  song: {}
}

MiniPlayer.propTypes = {
  song: PropTypes.object.isRequired
}

export default memo(MiniPlayer);
