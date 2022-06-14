import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { forceCheck } from 'react-lazyload';
import Scroll from "../../baseUI/Scroll";
import SingerItem from './components/SingerItem';
import { SingerContainer, NavContainer, ListContainer } from './style'
import Horizon from "../../baseUI/Horizon";
import api from "../../api";
import * as action from "./store/actionCreators";

export default function Home() {
  const [singerTypes, setSingerTypes] = useState([]);
  const [alphabetTypes, setAlphabetTypes] = useState([]);
  const [currentSinger, setCurrentSinger] = useState('');
  const [currentAlpnabet, setCurrentAlphabet] = useState('');
  const [isShowPullDownLoading, setIsShowPullDownLoading] = useState(false);
  const { enterLoading, isHasMore, pageCount, singerList } = useSelector(state => state).toJS().singers;
  const dispatch = useDispatch();

  const handleUpdateSinger = val => {
    setCurrentSinger(val);
    if (currentSinger !== val) pullDownRefresh(val, currentAlpnabet);
  }
  const handleUpdateAlphabet = val => {
    setCurrentAlphabet(val);
    if (val !== currentAlpnabet) pullDownRefresh(currentSinger, val);
  }

  // 下拉刷新
  const pullDownRefresh = (currentSinger, currentAlpnabet) => {
    dispatch(action.changePageCount(0));

    if (currentSinger || currentAlpnabet) {
      dispatch(action.getSingerListByTypeOrAlphabet(currentSinger, currentAlpnabet));
    } else {
      dispatch(action.getHotSingerList());
    }
  }

  // 上拉加载
  const pullUpLoad = () => {
    dispatch(action.changePageCount(pageCount + 1));

    if (currentSinger || currentAlpnabet) {
      dispatch(action.getSingerListByTypeOrAlphabet(currentSinger, currentAlpnabet));
    } else {
      dispatch(action.getHotSingerList());
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
        <Scroll onScroll={forceCheck} probeType={3} pullDown={pullDownRefresh} pullDownLoading={isShowPullDownLoading}>
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
