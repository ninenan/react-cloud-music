import { memo, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import animations from 'create-keyframe-animation';
import { CSSTransition } from 'react-transition-group';
import { formatTime, getName } from '../../../help/utils';
import { NormalPlayerContainer, Top, Middle, Bottom, Operators, CDWrapper, ProgressWrapper } from './style';
import ProgressBar from '../../base/ProgressBar';
import { useSelector, useDispatch } from 'react-redux';
import { changePlayingState, changeFullScreen, changeCurrenIndex } from '../../../store/player/actionCreator';
import usePlayer from '../../../hooks/usePlayer';
import { List } from 'immutable';

const NormalPlayer = (props) => {
  const dispatch = useDispatch();
  const { isPlaying, isFullScreen, currentSong, playlist, currentIndex } = useSelector(state => state).toJS().player;
  const normalPlayerRef = useRef(null);
  const cdWrapperRef = useRef(null);
  const { audioRef, duration, currentTime, percent, onProgressChanged } = props
  const handleChangeAudioStatus = usePlayer(audioRef).handleChangeAudioStatus;

  const operatorList = useMemo(() => {
    return [
      {
        name: 'i-left',
        data: '&#xe625;'
      },
      {
        name: 'i-left',
        data: '&#xe6e1;'
      },
      {
        name: 'i-center',
        data: isPlaying ? "&#xe723;" : "&#xe731;",
      },
      {
        name: 'i-right',
        data: '&#xe718;'
      },
      {
        name: 'i-right',
        data: '&#xe640;'
      }
    ]
  }, [isPlaying])

  const getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddintTop = 80;
    const innerWidth = window.innerWidth;
    const width = innerWidth * 0.8;
    const scale = targetWidth / width;
    const x = -(innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddintTop - width / 2 - paddingBottom;

    return {
      x,
      y,
      scale
    }
  }

  const handleChangeSong = (e, index) => {
    e.stopPropagation();

    if (index === 1) {
      handlePrevPlay();
    }
    if (index === 2) {
      dispatch(changePlayingState(!isPlaying));
      handleChangeAudioStatus(!isPlaying);
    }
    if (index === 3) {
      handleNextPlay();
    }
  }

  /**
   * ????????????
   */
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    dispatch(changePlayingState(true));
    audioRef.current.play()
  }
  
  /**
   * ?????????
   */
  const handlePrevPlay = () => {
    if (playlist.length === 1) {
      handleLoop();
    } else {
      let index = currentIndex - 1;

      if (index === -1) {
        index = playlist.lenth - 1
      }
      
      dispatch(changeCurrenIndex(index));
      dispatch(changePlayingState(true));
    }
  }

  /**
   * ?????????
   */
  const handleNextPlay = () => {
    if (playlist.length === 1) {
      handleLoop();
    } else {
      let index = currentIndex + 1;

      if (index === playlist.lenth) {
        index = 0;
      }

      dispatch(changeCurrenIndex(index));
      dispatch(changePlayingState(true));
    }
  }

  const toggleFullScreen = (val) => {
    dispatch(changeFullScreen(val));
  }

  const enter = () => {
    if (normalPlayerRef.current) {
      const { x, y, scale } = getPosAndScale();
      const animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(1)`
        }
      };

      normalPlayerRef.current.style.display = 'block';
      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 300,
          easing: 'linear'
        }
      });

      if (cdWrapperRef.current) {
        animations.runAnimation(cdWrapperRef.current, 'move');
      }
    }
  }

  const afterEnter = () => {
    const cdWrapperEl = cdWrapperRef.current;

    if (cdWrapperEl) {
      animations.unregisterAnimation("move");
      cdWrapperEl.style.anmiation = "";
    }
  }

  const leave = () => {
    if (cdWrapperRef.current) {
      const cdWrapperEl = cdWrapperRef.current;
      cdWrapperEl.style.transition = 'all .3s';
      const { x, y, scale } = getPosAndScale();
      cdWrapperEl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    }
  }

  const afterLeave = () => {
    if (!cdWrapperRef.current) {
      return
    }
    const cdWrapperEl = cdWrapperRef.current;

    cdWrapperEl.style.transition = 'none';
    cdWrapperEl.style.transform = 'none';

    if (normalPlayerRef.current) {
      normalPlayerRef.current.style.display = 'none';
    }
  }

  return (
    <CSSTransition
      classNames='normal'
      in={isFullScreen}
      timeout={300}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className='background'>
          <img src={`${currentSong.al.picUrl}?param=300*300`} width="100%" height="100%" alt='????????????'></img>
        </div>
        <div className='background layer'></div>
        <Top className='top'>
          <div className='back' onClick={() => toggleFullScreen(false)}>
            <i className='iconfont icon-back'>&#xe662;</i>
          </div>
          <h1 className='title'>{currentSong.name}</h1>
          <h1 className='subtitle'>{getName(currentSong.ar)}</h1>
        </Top>
        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className='cd'>
              <img className={`image ${isPlaying ? 'play' : 'pause'}`} src={`${currentSong.al.picUrl}?param=400*400`} alt='??????CD' />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className='bottom'>
          <ProgressWrapper>
            <span className='time time-l'>{formatTime(currentTime)}</span>
            <div className='progress-bar-wrapper'>
              <ProgressBar 
                percent={percent} 
                onProgressChanged={onProgressChanged}
              />
            </div>
            <span className='time time-r'>{formatTime(duration)}</span>
          </ProgressWrapper>
          <Operators>
            {operatorList.map((item, index) => {
              return (
                <div className={`icon ${item.name}`} key={item.data}>
                  <i className="iconfont" dangerouslySetInnerHTML={{ __html: item.data }} onClick={e => handleChangeSong(e, index)}></i>
                </div>
              )
            })}
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  )
}

NormalPlayer.defaultProps = {
  // audio dom
  audioRef: {},
  // ??????
  percent: 0,
  // ????????????
  currentTime: 0,
  // ?????????
  duration: 0,
  // audio ??????????????????
  onProgressChanged: () => {}
}

NormalPlayer.propTypes = {
  audioRef: PropTypes.object.isRequired,
  percent: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onProgressChanged: PropTypes.func.isRequired
}

export default memo(NormalPlayer);
