import { useDeferredValue, useEffect, useState } from "react";
import Scroll from "../../baseUI/Scroll";
import SingerItem from './components/SingerItem';
import { SingerContainer, NavContainer } from './style'
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
  const dispatch = useDispatch()

  const handleUpdateSinger = val => setCurrentSinger(val)
  const handleUpdateAlphabet = val => setCurrentAlphabet(val)


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
  }, [])

  return (
    <SingerContainer>
      <NavContainer>
        <Horizon list={singerTypes} title="分类（热门）：" currentVal={currentSinger} handleClick={val => handleUpdateSinger(val)} />
        <Horizon list={alphabetTypes} title="首字母" currentVal={currentAlpnabet} handleClick={val => handleUpdateAlphabet(val)} />
      </NavContainer>
      <Scroll probeType={3}>
        <div>
          {singerList.map(item => {
            return <SingerItem key={item.id} {...item} />
          })}
        </div>
      </Scroll>
    </SingerContainer>
  )
}
