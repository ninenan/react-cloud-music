import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { forceCheck } from 'react-lazyload'
import LazyLoadImg from '../../baseUI/LazyLoadImg';
import Scroll from '../../components/base/Scroll';
import * as action from './store/actionCreators';
import { Container, List, ListItem, SongList, GlobalList, GlobalListItem } from './style';

export default function Rank() {
  const { rankList } = useSelector(state => state).toJS().rank;
  const dispatch = useDispatch();
  const officialList = rankList.filter((item) => item.tracks.length);
  const globalList = rankList.filter((item) => !item?.tracks.length);

  useEffect(() => {
    if (!rankList.length) dispatch(action.getRankList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Scroll scrollY={true} probeType={3} onScroll={forceCheck}>
        <div>
          <h2 className='title'>官方榜</h2>
          <List>
            {
              officialList.map((item) => {
                return (
                  <ListItem key={item.coverImgId} tracks={item.tracks}>
                    <LazyLoadImg>
                      <img src={item.coverImgUrl} alt="music" />
                    </LazyLoadImg>
                    <SongList>
                      {item.tracks.map((track, index) => {
                        return (
                          <li key={index}>{index + 1}. {track.first}</li>
                        )
                      })}
                    </SongList>
                  </ListItem>
                )
              })
            }
          </List>
          <h2 className='title'>全球榜</h2>
          <GlobalList>
            {
              globalList.map((item, index) => {
                return (
                  <GlobalListItem key={index}>
                    <div className='item__container'>
                      <LazyLoadImg>
                        <img src={item.coverImgUrl} alt='music' />
                      </LazyLoadImg>
                      <div className='update-frequency'>{item.updateFrequency}</div>
                    </div>
                  </GlobalListItem>
                )
              })
            }
          </GlobalList>
        </div>
      </Scroll>
    </Container>
  )
}
