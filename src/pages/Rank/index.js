import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Scroll from '../../baseUI/Scroll';
import * as action from './store/actionCreators';
import { Container, List, ListItem, SongList } from './style';


export default function Home() {
  let { rankList } = useSelector(state => state).toJS().rank;
  const dispatch = useDispatch();
  rankList = rankList.filter((item) => item.tracks.length);
  console.log(rankList);

  useEffect(() => {
    dispatch(action.getRankList());
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
                    <div className="img-wrapper">
                      <img src={item.coverImgUrl} alt="music" />
                      {/* <div className="decorate"></div> */}
                      <span className="update-frequecy">{item.updateFrequency}</span>
                    </div>
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
