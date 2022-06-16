import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Scroll from '../../baseUI/Scroll';
import * as action from './store/actionCreators';
import { Container, List, ListItem, SongList } from './style';


export default function Home() {
  let { rankList } = useSelector(state => state).toJS().rank;
  const dispatch = useDispatch();
  console.log(rankList);
  rankList = rankList.filter((item) => item.tracks.length);
  console.log(rankList);

  useEffect(() => {
    if (!rankList.length) dispatch(action.getRankList());
  }, [])

  return (
    <Container>
      <Scroll scrollX={true}>
        <div>
          <h2 className='title'>官方榜</h2>
          <List globalRank={rankList}>
            {
              rankList.map((item) => {
                return (
                  <ListItem key={item.coverImgId} tracks={item.tracks}>
                    <img src={item.coverImgUrl} alt="music" />
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
        </div>
      </Scroll>
    </Container>
  )
}
