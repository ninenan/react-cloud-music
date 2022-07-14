import { memo } from 'react';
import PropTypes from 'prop-types';
import { getName } from '../../../help/utils';
import { NormalPlayerContainer, Top, Middle, Bottom, Operators, CDWrapper } from './style';

const NormalPlayer = (props) => {
  const { song, isFullScreen, isPlaying, toggleFullScreen } = props;

  return (
    <NormalPlayerContainer>
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
      <Middle>
        <CDWrapper>
          <div className='cd'>
            <img className='image play' src={`${song.al.picUrl}?param=400*400`} alt='歌曲CD' />
          </div>
        </CDWrapper>
      </Middle>
      <Bottom className='bottom'>
        <Operators>
          <div className="icon i-left" >
            <i className="iconfont">&#xe625;</i>
          </div>
          <div className="icon i-left">
            <i className="iconfont">&#xe6e1;</i>
          </div>
          <div className="icon i-center">
            <i className="iconfont">&#xe723;</i>
          </div>
          <div className="icon i-right">
            <i className="iconfont">&#xe718;</i>
          </div>
          <div className="icon i-right">
            <i className="iconfont">&#xe640;</i>
          </div>
        </Operators>
      </Bottom>
    </NormalPlayerContainer>
  )
}

NormalPlayer.defaultProps = {
  song: {},
  isFullScreen: false,
  isPlaying: false,
  toggleFullScreen: () => {}
}

NormalPlayer.propTypes = {
  song: PropTypes.object.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  toggleFullScreen: PropTypes.func.isRequired
}

export default memo(NormalPlayer);
