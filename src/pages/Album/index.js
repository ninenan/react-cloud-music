import { CSSTransition } from 'react-transition-group';
import { useState } from 'react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../../components/base/Header';
import SongList from './components/SongList';
import Scroll from '../../components/base/Scroll';
import { Container, BgImage, PlayBtn, PlayBtnWrapper, List } from './style';
import { currentAlbum } from '../../mock/album';

function Album(props) {
  const [isShowStatus, setIsShowStatus] = useState(true);
  const navigate = useNavigate();

  const handleGoBack = () => {
    setIsShowStatus(false);
  }

  const toBack = () => {
    navigate(-1);
  }

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
        <List top="273">
          <Scroll>
            <div className="song-list-wrapper">
              <SongList tracks={currentAlbum.tracks} />
            </div>
          </Scroll>
        </List>
      </Container>
    </CSSTransition>
  )
}

export default memo(Album);
