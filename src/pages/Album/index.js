import { CSSTransition } from 'react-transition-group';
import { useState, useMemo } from 'react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../../components/base/Header';
import SongList from './components/SongList';
import Scroll from '../../components/base/Scroll';
import { Container, BgImage, PlayBtn, PlayBtnWrapper, List } from './style';
import { currentAlbum } from '../../mock/album';
import Test from './components/Test';

function Album() {
  const [isShowStatus, setIsShowStatus] = useState(true);
  const navigate = useNavigate();
  const maxTranslateY = 233;
  const [y, setY] = useState(0);
  // const [bgStyle, setBgStyle] = useState({});

  const handleGoBack = () => {
    setIsShowStatus(false);
  }

  const toBack = () => {
    navigate(-1);
  }

  const handleScroll = ({ x, y }) => {
    console.log('y', y)
    setY(() => y)
  }

  const yy = useMemo(() => {
    return 33
  }, [y])



  return (
    <CSSTransition
      in={isShowStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={toBack}
    >
      <Container>
        <Header title="返回" handleClick={handleGoBack} />
        <BgImage background={currentAlbum.coverImgUrl}>
          <PlayBtnWrapper>
            <PlayBtn>
              <i className="iconfont">&#xe6e3;</i>
              <span className='text'>播放全部</span>
            </PlayBtn>
          </PlayBtnWrapper>
        </BgImage>
        <Test handleScroll={handleScroll} />
        {/* <List top="273">
          <Scroll probeType={3} onScroll={handleScroll}>
            <div className="song-list-wrapper">
              <SongList key="1fasdfsa" tracks={currentAlbum.tracks} />
            </div>
          </Scroll>
        </List> */}
      </Container>
    </CSSTransition>
  )
}

export default memo(Album);