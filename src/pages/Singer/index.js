import { memo, useCallback, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import { Container, TopContainer, CollectBtn, CollectBtnWrapper, ListContainer } from './style';
import Header from '../../components/base/Header';
import WrapperScroll from '../../components/base/WrapperScroll';
import SongList from '../Album/components/SongList';
import singerList from '../../mock/singer';

const Singer = () => {
  const [isShow, setIsShow] = useState(true);
  const navigate = useNavigate();

  const hanleExit = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleToBack = () => {
    setIsShow(false);
  };

  const handlePlay = current => {
    console.log('handlepLay: ', current);
  };

  const handleScroll = (pos) => {
    console.log('handlepLay: ', pos);
  };

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
        <Header title={singerList.name} handleClick={handleToBack}/>
        <TopContainer bgUrl={singerList.picUrl}>
          <div className='topWrapper'>
            <CollectBtnWrapper>
              <CollectBtn>
                <i className='iconfont'>&#xe62d;</i>
                <span className='text'>收藏</span>
              </CollectBtn>
            </CollectBtnWrapper>
            <div className='filer'></div>
          </div>
        </TopContainer>
        <ListContainer>
          <WrapperScroll probeType={3} onScroll={handleScroll}>
            <div className='list__wrapper'>
              <SongList isShowIndex onPlay={handlePlay} tracks={singerList.hotSongs} />
            </div>
          </WrapperScroll>
        </ListContainer>
      </Container>
    </CSSTransition>
  )
}

export default memo(Singer);
