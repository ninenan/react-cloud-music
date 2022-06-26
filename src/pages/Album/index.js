import { CSSTransition } from 'react-transition-group';
import { useState, useRef } from 'react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../../components/base/Header';
import SongList from './components/SongList';
import WrapperScroll from '../../components/base/WrapperScroll';
import { TopDesc, BgImage, PlayBtn, PlayBtnWrapper, List, Container } from './style';
import { currentAlbum } from '../../mock/album';
import { getCount } from '../../help/utils';

const MAX_TRANSLATE_Y = 273;

function Album() {
  const [isShowStatus, setIsShowStatus] = useState(true);
  const navigate = useNavigate();
  const [bgImgStyle, setBgImgStyle] = useState({
    filter: 'blur(0)',
    transform: 'scale(1)translateZ(0px)',
    zIndex: 0,
    paddingTop: '70%',
    height: '0',
  });
  const headerRef = useRef(null);

  const handleGoBack = () => {
    setIsShowStatus(false);
  }

  const handleToBack = () => {
    navigate(-1);
  }

  const handleScroll = ({ y }) => {
    const headerEl = headerRef.current || null;
    if (y >= 0) {
      const scale = 1 + Math.abs(y / MAX_TRANSLATE_Y);

      setBgImgStyle({
        ...bgImgStyle,
        transform: `scale(${scale}) translateZ(0px)`,
        filter: 'blur(0)'
      })
    }
    if (y <= 0) {
      const blur = Math.min(Math.abs(y / MAX_TRANSLATE_Y), MAX_TRANSLATE_Y / 233) * 20;

      setBgImgStyle({
        ...bgImgStyle,
        filter: `blur(${blur}px)`
      })
    }
    if (headerEl) {
      if (y < 0) {
        const percent = Math.abs(y / 230);

        headerEl.style.backgroundColor = `rgba(51,51,51, ${percent})`;
        headerEl.style.opacity = 1;
      } else {
        headerEl.style.backgroundColor = ''
      }
    }
  }

  const handlePlay = () => {
    console.log('handlePlay');
  }
  return (
    <CSSTransition
      in={isShowStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={handleToBack}
    >
      <Container>
        <Header title="返回" handleClick={handleGoBack} ref={headerRef} />
        <BgImage background={currentAlbum.coverImgUrl} style={bgImgStyle}>
          <TopDesc>
            <div className="img-wrapper">
              <img src={currentAlbum.coverImgUrl} alt="" />
              <div className="play-count">
                <i className="iconfont play">&#xe885;</i>
                <span className="count">{getCount(currentAlbum.subscribedCount)}</span>
              </div>
            </div>
            <div className="desc-wrapper">
              <div className="title">{currentAlbum.name}</div>
              <div className="person">
                <div className="avatar">
                  <img src={currentAlbum.creator.avatarUrl} alt="" />
                </div>
                <div className="name">{currentAlbum.creator.nickname}</div>
              </div>
            </div>
          </TopDesc>
          <PlayBtnWrapper>
            <PlayBtn onClick={handlePlay}>
              <i className="iconfont">&#xe6e3;</i>
              <span className='text'>播放全部</span>
            </PlayBtn>
          </PlayBtnWrapper>
          <div className="filter"></div>
        </BgImage>
        <List top="273">
          <WrapperScroll probeType={3} onScroll={handleScroll}>
            <div className="song-list-wrapper">
              <SongList key="1fasdfsa" tracks={currentAlbum.tracks} />
            </div>
          </WrapperScroll>
        </List>
      </Container>
    </CSSTransition>
  )
}

export default memo(Album);
