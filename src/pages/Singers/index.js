import { useEffect, useState } from "react";
import Scroll from "../../baseUI/Scroll";
import SingerItem from './components/SingerItem';
import { SingerContainer, NavContainer } from './style'
import Horizon from "../../baseUI/Horizon";
import api from "../../api";

const singerList = (new Array(20)).fill(0).map((item, index) => {
  return {
    picUrl: 'https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg',
    name: '朴树',
    accountId: 22 + index
  }
})

export default function Home() {
  const [singerTypes, setSingerTypes] = useState([]);
  const [alphabetTypes, setAlphabetTypes] = useState([]);
  const [currentSinger, setCurrentSinger] = useState('');
  const [currentAlpnabet, setCurrentAlphabet] = useState('');

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

  return (
    <SingerContainer>
      <NavContainer>
        <Horizon list={singerTypes} title="分类（热门）：" currentVal={currentSinger} handleClick={val => handleUpdateSinger(val)} />
        <Horizon list={alphabetTypes} title="首字母" currentVal={currentAlpnabet} handleClick={val => handleUpdateAlphabet(val)} />
      </NavContainer>
      <Scroll>
        <div>
          {singerList.map(item => {
            return <SingerItem {...item} />
          })}
        </div>
      </Scroll>
    </SingerContainer>
  )
}
