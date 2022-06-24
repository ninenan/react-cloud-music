import { CSSTransition } from 'react-transition-group';
import { useState, useMemo } from 'react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../../components/base/Header';
import SongList from './components/SongList';
import Scroll from '../../components/base/Scroll';
import { Container, BgImage, PlayBtn, PlayBtnWrapper, List } from './style';
import { currentAlbum } from '../../mock/album';
import { debuounce } from '../../help/utils';

function Album() {
  const [isShowStatus, setIsShowStatus] = useState(true);
  const navigate = useNavigate();
  const maxTranslateY = 250;
  const [scale, setScale] = useState(1);
  const [bgImgStyle, setBgImgStyle] = useState({
    filter: 'blur(0)',
    transform: 'scale(1)'
  });

  const handleGoBack = () => {
    setIsShowStatus(false);
  }

  const toBack = () => {
    navigate(-1);
  }

  const handleScroll = ({ y }) => {
    if (y >= 0) {
      const scale = 1 + Math.abs(y / maxTranslateY);
      setBgImgStyle({
        transform: `scale(${scale})`,
      })
    }
  }

  console.log(bgImgStyle);

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
        <BgImage background={currentAlbum.coverImgUrl} style={bgImgStyle}>
          <PlayBtnWrapper>
            <PlayBtn>
              <i className="iconfont">&#xe6e3;</i>
              <span className='text'>播放全部</span>
            </PlayBtn>
          </PlayBtnWrapper>
        </BgImage>
        <List top="290">
          <Scroll probeType={3} onScroll={handleScroll}>
            <div className="song-list-wrapper">
              <SongList key="1fasdfsa" tracks={currentAlbum.tracks} />
            </div>
          </Scroll>
        </List>
      </Container>
    </CSSTransition>
  )
}

export default memo(Album);
