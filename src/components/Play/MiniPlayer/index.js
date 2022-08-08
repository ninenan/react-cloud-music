import { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { getName, formatTime } from '../../../help/utils';
import { MiniPlayerContainer } from './style';
import ProgressCircle from '../../base/ProgressCircle';
import { changePlayingState, changeFullScreen } from '../../../store/player/actionCreator';
import usePlayer from '../../../hooks/usePlayer';

const MiniPlayer = (props) => {
  const dispatch = useDispatch();
  const { isPlaying, isFullScreen, currentSong } = useSelector(state => state).toJS().player;
  const { audioRef, percent, onChangePopupState } = props;
  const miniPlayRef = useRef();
  const handleChangeAudioStatus = usePlayer(audioRef).handleChangeAudioStatus;

  const handleChangePlayingState = (e) => {
    e.stopPropagation();
    dispatch(changePlayingState(!isPlaying));
    handleChangeAudioStatus(!isPlaying);
  }

  const toggleFullScreen = (val) => {
    dispatch(changeFullScreen(val));
  }

  const handleShowPopup = (e) => {
    e.stopPropagation();
    onChangePopupState(true);
  }

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
            <img className="play" src={currentSong.al.picUrl} width="40" height="40" alt="img" />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{currentSong.name}</h2>
          <p className="desc">{getName(currentSong.ar)}</p>
        </div>
        <div className="control">
          <div style={{ display: isPlaying ? 'block' : 'none' }}>
            <ProgressCircle radius={32} percent={percent}>
              <i
                className='iconfont icon-mini icon-pause'
                onClick={handleChangePlayingState}
              >
                &#xe650;
              </i>
            </ProgressCircle>
          </div>
          <i 
            className='icon-play iconfont' 
            style={{ display: isPlaying ? "none" : "block" }} 
            onClick={handleChangePlayingState}
          >
            &#xe61e;
          </i>
        </div>
        <div className="control" onClick={handleShowPopup}>
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  )
}

MiniPlayer.defaultProps = {
  audioRef: {},
  percent: 0,
  onChangePopupState: () => {}
}

MiniPlayer.propTypes = {
  audioRef: PropTypes.object.isRequired,
  percent: PropTypes.number.isRequired,
  onChangePopupState: PropTypes.func.isRequired,
}

export default memo(MiniPlayer);
