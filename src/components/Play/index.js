import { memo } from "react"
import { useDispatch, useSelector } from 'react-redux';
import MiniPlayer from './MiniPlayer';

const currentSong = {
  al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
  name: "木偶人",
  ar: [{name: "薛之谦"}]
}

const Player = () => {
  const dispatch = useDispatch();
  const player = useSelector(state => state).toJS().player;

  console.log('player: ', player);

  return (
    <>
      <MiniPlayer song={currentSong}/>
    </>
  )
}

export default memo(Player);
