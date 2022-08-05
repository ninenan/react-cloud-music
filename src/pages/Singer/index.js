import { useSelector, useDispatch } from 'react-redux';
import { memo, useCallback, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, TopContainer, CollectBtn, CollectBtnWrapper, ListContainer } from './style';
import Header from '../../components/base/Header';
import WrapperScroll from '../../components/base/WrapperScroll';
import SongList from '../Album/components/SongList';
import { getSingerDetails } from './store/actionCreators';

const HEIGHT = 270;

const Singer = () => {
  const [isShow, setIsShow] = useState(true);
  const [topContainerStyle, setTopContainerStyle] = useState({
    transform: 'scale(1) translateZ(0)',
    paddingTop: '70%',
    zIndex: 0
  })
  const [btnStyle, setBtnStyle] = useState({
    opacity: 1,
    transform: 'translate3d(0, 0, 0)'
  })
  const navigate = useNavigate();
  const { id } = useParams();
  const disPatch = useDispatch();
  const { artist, songsOfArtist } = useSelector(state => state).toJS().singer;
  const { playlist } = useSelector(state => state).toJS().player;

  const hanleExit = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleToBack = () => {
    setIsShow(false);
  };

  const handlePlay = current => {
    console.log('handlepLay: ', current);
  };

  const handleScroll = useCallback(({ y }) => {
    if (y > 0) {
      const scale = 1 + +Math.abs(y / HEIGHT).toFixed(2);

      setTopContainerStyle({
        ...topContainerStyle,
        transform: `scale(${scale}) translateZ(0)`
      })
      setBtnStyle({
        transform: `translate3d(0, 0, 0)`,
        opacity: 1
      })
    }
    if (y < 0) {
      const percent = Math.abs(y / HEIGHT);

      setBtnStyle({
        transform: `translate3d(0, ${y + 1}px, 0)`,
        opacity: `${1 - percent * 2}`
      })
      if ((HEIGHT + y) <= 40) {
        setTopContainerStyle({
          ...topContainerStyle,
          zIndex: 1,
          height: '40px',
          paddingTop: 0
        })
      }
    }
    if (y === 0 || ((HEIGHT + y) > 40 && y < 0)) {
      setTopContainerStyle({
        transform: 'scale(1) translateZ(0)',
        paddingTop: '70%',
        zIndex: 0
      })
      setBtnStyle({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
      })
    }
  }, [topContainerStyle]);

  useEffect(() => {
    disPatch(getSingerDetails(id));
  }, [id, disPatch]);

  return (
    <CSSTransition
      in={isShow}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={hanleExit}
    >
      <Container>
        <Header title={artist.name} handleClick={handleToBack} />
        <TopContainer bgUrl={artist.picUrl} style={topContainerStyle}>
          <CollectBtnWrapper>
            <CollectBtn style={btnStyle}>
              <i className='iconfont'>&#xe62d;</i>
              <span className='text'>收藏</span>
            </CollectBtn>
          </CollectBtnWrapper>
          <div className='filer'></div>
        </TopContainer>
        <ListContainer bottom={playlist.length ? '60px' : '0px'}>
          <WrapperScroll probeType={3} onScroll={handleScroll}>
            <div className='list__wrapper'>
              <SongList isShowIndex onPlay={handlePlay} tracks={songsOfArtist} />
            </div>
          </WrapperScroll>
        </ListContainer>
      </Container>
    </CSSTransition>
  )
}

export default memo(Singer);
