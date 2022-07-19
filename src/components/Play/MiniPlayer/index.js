import { memo, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { getName } from '../../../help/utils';
import { MiniPlayerContainer } from './style';
import ProgressCircle from '../../base/ProgressCircle';

const MiniPlayer = (props) => {
  const { song, isPlaying, isFullScreen, toggleFullScreen } = props;
  const miniPlayRef = useRef();
  const percent = 0.2;
  const currentPlayIcon = useMemo(() => {
    return isPlaying ? 'icon-pause' : 'icon-play'
  }, [isPlaying])

  return (
    <CSSTransition
      in={!isFullScreen}
      timeout={300}
      classNames="mini-player"
      onEnter={() => {
        miniPlayRef.current.style.display = 'flex';
      }}
      onExited={() => {
        miniPlayRef.current.style.display = 'none';
      }}
    >
      <MiniPlayerContainer onClick={() => toggleFullScreen(true)} ref={miniPlayRef}>
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
          <div style={{display: isPlaying ? 'block' : 'none'}}>
            <ProgressCircle radius={32} percent={percent}>
              <i
                className='iconfont icon-mini icon-pause'
              >
                &#xe650;
              </i>
            </ProgressCircle>
          </div>
          <i className='icon-play iconfont' style={{ display: isPlaying ? "none" : "block" }}>
            &#xe61e;
          </i>
        </div>
        <div className="control">
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

MiniPlayer.defaultProps = {
  song: {},
  isPlaying: false,
  isFullScreen: false,
  toggleFullScreen: () => { }
}

MiniPlayer.propTypes = {
  song: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  toggleFullScreen: PropTypes.func.isRequired
}

export default memo(MiniPlayer);
