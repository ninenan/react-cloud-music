import { CSSTransition } from 'react-transition-group';
import { useState, useRef, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/base/Header';
import SongList from './components/SongList';
import WrapperScroll from '../../components/base/WrapperScroll';
import { TopDesc, BgImage, PlayBtn, PlayBtnWrapper, List, Container } from './style';
// import { currentAlbum } from '../../mock/album';
import { getCount, isEmptyObj } from '../../help/utils';
import { useEffect } from 'react';
import * as action from './store/actionCreators';
import Loading from '../../components/base/Loading';
import { useCallback } from 'react';

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
  const dispatch = useDispatch();
  const { currentAlbum } = useSelector(state => state).toJS().album;
  const { id } = useParams();

  const handleGoBack = useCallback(() => {
    setIsShowStatus(false);
  }, [])

  const handleToBack = useCallback(() => {
    navigate(-1);
  }, [navigate])

  const handleScroll = ({ y }) => {
    const headerEl = headerRef.current || null;
    if (y > 0) {
      const scale = 1 + Math.abs(y / MAX_TRANSLATE_Y);

      setBgImgStyle({
        ...bgImgStyle,
        transform: `scale(${scale}) translateZ(0px)`,
        filter: 'blur(0)'
      })
    }
    if (y < 0) {
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
    if (y === 0) {
      setBgImgStyle({
        filter: 'blur(0)',
        transform: 'scale(1)translateZ(0px)',
        zIndex: 0,
        paddingTop: '70%',
        height: '0',
      })
    }
  }

  const handlePlayAll = (currentAlbum) => {
    console.log('currentAlbum: ', currentAlbum);
  }

  const handlePlay = (current) => {
    console.log('current: ', current);
  }

  const renderTopDec = () => {
    return (
      <>
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
                  <img src={currentAlbum.creator && currentAlbum.creator.avatarUrl} alt="" />
                </div>
                <div className="name">{currentAlbum.creator && currentAlbum.creator.nickname}</div>
              </div>
            </div>
          </TopDesc>
          <PlayBtnWrapper>
            <PlayBtn onClick={() => handlePlayAll(currentAlbum)}>
              <i className="iconfont">&#xe6e3;</i>
              <span className='text'>播放全部</span>
            </PlayBtn>
          </PlayBtnWrapper>
          <div className="filter"></div>
        </BgImage>
      </>
    )
  }

  useEffect(() => {
    dispatch(action.getAlbumList(id));
  }, [dispatch, id]);

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
        {isEmptyObj(currentAlbum) ? <Loading /> :
          <>
            {renderTopDec()}
            <List top="273">
              <WrapperScroll probeType={3} onScroll={handleScroll}>
                <div className="song-list-wrapper">
                  <SongList tracks={currentAlbum.tracks} onPlay={handlePlay}/>
                </div>
              </WrapperScroll>
            </List>
          </>
        }
      </Container>
    </CSSTransition>
  )
}

export default memo(Album);
