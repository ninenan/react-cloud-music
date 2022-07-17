import { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import animations from 'create-keyframe-animation';
import { CSSTransition } from 'react-transition-group';
import { getName } from '../../../help/utils';
import { NormalPlayerContainer, Top, Middle, Bottom, Operators, CDWrapper } from './style';

const operatorList = [
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
    data: '&#xe723;'
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

const NormalPlayer = (props) => {
  const { song, isFullScreen, isPlaying, toggleFullScreen } = props;
  const normalPlayerRef = useRef(null);
  const cdWrapperRef = useRef(null);

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
      const {x, y, scale} = getPosAndScale();
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
      appear={true}
      mountOnEnter
      onEnter={enter}
      onEntered={afterEnter}
      onExit={leave}
      onExited={afterLeave}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className='background'>
          <img src={`${song.al.picUrl}?param=300*300`} width="100%" height="100%" alt='歌曲图片'></img>
        </div>
        <div className='background layer'></div>
        <Top className='top'>
          <div className='back' onClick={() => toggleFullScreen(false)}>
            <i className='iconfont icon-back'>&#xe662;</i>
          </div>
          <h1 className='title'>{song.name}</h1>
          <h1 className='subtitle'>{getName(song.ar)}</h1>
        </Top>
        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className='cd'>
              <img className='image play' src={`${song.al.picUrl}?param=400*400`} alt='歌曲CD' />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className='bottom'>
          <Operators>
            {operatorList.map(item => {
              return (
                <div className={`icon ${item.name}`} key={item.data}>
                  <i className="iconfont" dangerouslySetInnerHTML={{ __html: item.data }}></i>
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
  song: {},
  isFullScreen: false,
  isPlaying: false,
  toggleFullScreen: () => { }
}

NormalPlayer.propTypes = {
  song: PropTypes.object.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  toggleFullScreen: PropTypes.func.isRequired
}

export default memo(NormalPlayer);
