import { useEffect, useState } from "react";
import Scroll from "../../baseUI/Scroll";
import SingerItem from './components/SingerItem';
import { SingerContainer, NavContainer, ListContainer } from './style'
import Horizon from "../../baseUI/Horizon";
import api from "../../api";
import * as action from "./store/actionCreators";
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
  const [singerTypes, setSingerTypes] = useState([]);
  const [alphabetTypes, setAlphabetTypes] = useState([]);
  const [currentSinger, setCurrentSinger] = useState('');
  const [currentAlpnabet, setCurrentAlphabet] = useState('');
  const { enterLoading, isHasMore, pageCount, singerList } = useSelector(state => state).toJS().singers;
  const dispatch = useDispatch();

  const handleUpdateSinger = val => {
    setCurrentSinger(val);
    pullDownRefresh();
  }
  const handleUpdateAlphabet = val => {
    setCurrentAlphabet(val);
    pullDownRefresh();
  }

  // 下拉刷新
  const pullDownRefresh = () => {
    dispatch(action.changePageCount(0));
  
    if (currentSinger || currentAlpnabet) {
      dispatch(action.getSingerListByTypeOrAlphabet());
    } else {
      dispatch(action.getMoreHotSingerList());
    }
  }

  // 上拉加载
  const pullUpLoad = () => {
    dispatch(action.changePageCount(pageCount+1));
    if (currentSinger || currentAlpnabet) {
      dispatch(action.getSingerListByTypeOrAlphabet());
    } else {
      dispatch(action.getMoreHotSingerList());
    }
  }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SingerContainer>
      <NavContainer>
        <Horizon list={singerTypes} title="分类（热门）：" currentVal={currentSinger} handleClick={val => handleUpdateSinger(val)} />
        <Horizon list={alphabetTypes} title="首字母" currentVal={currentAlpnabet} handleClick={val => handleUpdateAlphabet(val)} />
      </NavContainer>
      <ListContainer>
      <Scroll probeType={3}>
        <div>
          {singerList.map(item => {
            return <SingerItem key={item.id} {...item} />
          })}
        </div>
      </Scroll>
      </ListContainer>
    </SingerContainer>
  )
}
