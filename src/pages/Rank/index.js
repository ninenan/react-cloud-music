import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { forceCheck } from 'react-lazyload'
import { useNavigate, Outlet, renderMatches } from 'react-router-dom'
import LazyLoadImg from '../../components/base/LazyLoadImg';
import Scroll from '../../components/base/Scroll';
import * as action from './store/actionCreators';
import { Container, List, ListItem, SongList, GlobalList, GlobalListItem } from './style';

export default function Rank() {
  const { rankList } = useSelector(state => state).toJS().rank;
  const dispatch = useDispatch();
  const officialList = rankList.filter((item) => item.tracks.length);
  const globalList = rankList.filter((item) => !item?.tracks.length);
  const navigate = useNavigate()

  const handleToDetails = ({ id }) => {
    navigate(`/rank/${id}`);
  }

  useEffect(() => {
    if (!rankList.length) dispatch(action.getRankList());
  }, [rankList, dispatch]);

  const renderList = () => {
    return (
      <>
        <List>
          {
            officialList.map((item) => {
              return (
                <ListItem key={item.coverImgId} tracks={item.tracks} onClick={() => handleToDetails(item)}>
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
      </>
    )
  }

  const renderGlobalList = () => {
    return (
      <>
        <GlobalList>
          {
            globalList.map((item, index) => {
              return (
                <GlobalListItem key={index} onClick={() => handleToDetails(item)}>
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
      </>
    )
  }

  return (
    <Container>
      <Scroll scrollY={true} probeType={3} onScroll={forceCheck}>
        <div>
          <h2 className='title'>官方榜</h2>
          {renderList()}
          <h2 className='title'>全球榜</h2>
          {renderGlobalList()}
        </div>
      </Scroll>
      <Outlet />
    </Container>
  )
}
