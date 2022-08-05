import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { forceCheck } from 'react-lazyload';
import { Outlet, useNavigate } from 'react-router-dom';
import Scroll from "../../components/base/Scroll";
import SingerItem from './components/SingerItem';
import { SingerContainer, NavContainer, ListContainer } from './style'
import Horizon from "../../components/base/Horizon";
import api from "../../api";
import * as action from "./store/actionCreators";

export default function Home() {
  const [singerTypes, setSingerTypes] = useState([]);
  const [alphabetTypes, setAlphabetTypes] = useState([]);
  const [currentSinger, setCurrentSinger] = useState('');
  const [currentAlpnabet, setCurrentAlphabet] = useState('');
  // const [isShowPullDownLoading, setIsShowPullDownLoading] = useState(false);
  // const [isShowPullUpLoading, setIsShowPullUpLoading] = useState(false);
  const { isHasMore, pageCount, singerList, isShowPullUpLoading, isShowPullDownLoading } = useSelector(state => state).toJS().singers;
  const { playlist } = useSelector(state => state).toJS().player;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const scrollRef = useRef(null);
  const handleUpdateSinger = val => setCurrentSinger(val);
  const handleUpdateAlphabet = val => setCurrentAlphabet(val);

  // 下拉刷新
  const pullDownRefresh = async () => {
    dispatch(action.changePageCount(0));
    dispatch(action.changeIsShowPullDownLoading(true));

    if (currentSinger || currentAlpnabet) {
      dispatch(action.getSingerListByTypeOrAlphabet(currentSinger, currentAlpnabet));
    } else {
      dispatch(action.getHotSingerList());
    }
  }

  // 上拉加载
  const pullUpLoad = async () => {
    dispatch(action.changePageCount(pageCount + 1));
    dispatch(action.changeIsShowPullUpLoading(true));

    if (currentSinger || currentAlpnabet) {
      dispatch(action.getSingerListByTypeOrAlphabet(currentSinger, currentAlpnabet));
    } else {
      dispatch(action.getHotSingerList());
    }
  }

  const handleToDetail = ({ id }) => {
    navigate(`/singers/${id}`)
  }

  useEffect(() => {
    pullDownRefresh();
  }, [currentSinger, currentAlpnabet]);

  useEffect(() => {
    (async () => {
      const sTypes = await api.singers.getSingerTypes();
      const aTypes = await api.singers.getAlphabetTypes();

      setSingerTypes(sTypes);
      setAlphabetTypes(aTypes);
    })()
  }, [])

  useEffect(() => {
    if (!singerList.length) {
      dispatch(action.getHotSingerList());
    }
  }, [singerList, dispatch])

  useEffect(() => {
    if (scrollRef.current) {
      return scrollRef.current.refresh();
    }
  }, [])

  return (
    <SingerContainer>
      <NavContainer>
        <Horizon list={singerTypes} title="分类（热门）：" currentVal={currentSinger} handleClick={val => handleUpdateSinger(val)} />
        <Horizon list={alphabetTypes} title="首字母" currentVal={currentAlpnabet} handleClick={val => handleUpdateAlphabet(val)} />
      </NavContainer>
      <ListContainer bottom={playlist.length ? '60px' : '0px'}>
        <Scroll
          onScroll={forceCheck}
          probeType={3}
          pullUp={pullUpLoad}
          pullUpLoading={isShowPullUpLoading}
          pullDown={pullDownRefresh}
          pullDownLoading={isShowPullDownLoading}
          isHasMore={isHasMore}
          ref={scrollRef}
        >
          <div>
            {singerList.map((item, index) => {
              return <SingerItem onSelect={handleToDetail} key={`${item.id}${index + ''}`} {...item} />
            })}
          </div>
        </Scroll>
      </ListContainer>
      <Outlet />
    </SingerContainer>
  )
}
