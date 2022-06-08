import Horizon from "../../baseUI/HorizonItem";
import api from "../../api";
import { useEffect, useState } from "react";
import { NavContainer } from './style'

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
    <NavContainer>
      <Horizon list={singerTypes} title="分类（热门）：" currentVal={currentSinger} handleClick={val => handleUpdateSinger(val)}/>
      <Horizon list={alphabetTypes} title="首字母" currentVal={currentAlpnabet} handleClick={val => handleUpdateAlphabet(val)}/>
    </NavContainer>
  )
}
