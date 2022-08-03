import { memo, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import animations from 'create-keyframe-animation';
import { CSSTransition } from 'react-transition-group';
import { formatTime, getName, findIndex, shuffle } from '../../../help/utils';
import { 
  NormalPlayerContainer,
  Top,
  Middle,
  Bottom,
  Operators,
  CDWrapper,
  ProgressWrapper } from './style';
import ProgressBar from '../../base/ProgressBar';
import { useSelector, useDispatch } from 'react-redux';
import { 
  changePlayingState,
  changeFullScreen,
  changeCurrenIndex,
  changePlayMode,
  changePlaylist
} from '../../../store/player/actionCreator';
import usePlayer from '../../../hooks/usePlayer';
import { ICON_MODE_MAP } from '../../../help/config';

const NormalPlayer = (props) => {
  const dispatch = useDispatch();
  const { 
    isPlaying,
    isFullScreen, 
    currentSong,
    playlist,
    currentIndex,
    mode,
    sequencePlaylist
  } = useSelector(state => state).toJS().player;
  const normalPlayerRef = useRef(null);
  const cdWrapperRef = useRef(null);
  const { audioRef, duration, currentTime, percent, onProgressChanged, onHandlePrevPlay, onHandleNextPlay } = props
  const handleChangeAudioStatus = usePlayer(audioRef).handleChangeAudioStatus;

  const operatorList = useMemo(() => {
    return [
      {
        name: 'i-left',
        data: ICON_MODE_MAP.get(mode),
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
  }, [isPlaying, mode])

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

    if (index === 0) {
      handleChangeMode();
    }
    if (index === 1) {
      onHandlePrevPlay();
    }
    if (index === 2) {
      dispatch(changePlayingState(!isPlaying));
      handleChangeAudioStatus(!isPlaying);
    }
    if (index === 3) {
      onHandleNextPlay();
    }
  }

  // 切换播放模式
  const handleChangeMode = () => {
    const nextMode = (mode + 1) % 3;

    if (nextMode === 0) {
      // 顺序播放
      const index = findIndex(sequencePlaylist, currentSong);

      dispatch(changePlaylist(sequencePlaylist));
      dispatch(changeCurrenIndex(index));
    }
    if (nextMode === 1) {
      // 单曲循环
      dispatch(changePlaylist(sequencePlaylist));
    }
    if (nextMode === 2) {
      // 随机播放
      const nextPlayList = shuffle(sequencePlaylist);
      const index = findIndex(nextPlayList, currentSong);

      dispatch(changePlaylist(nextPlayList));
      dispatch(changeCurrenIndex(index));
    }

    dispatch(changePlayMode(nextMode));
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
          <img src={`${currentSong.al.picUrl}?param=300*300`} width="100%" height="100%" alt='歌曲图片'></img>
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
              <img className={`image ${isPlaying ? 'play' : 'pause'}`} src={`${currentSong.al.picUrl}?param=400*400`} alt='歌曲CD' />
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
  // 进度
  percent: 0,
  // 当前时间
  currentTime: 0,
  // 总时长
  duration: 0,
  // audio 进度改变事件
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
