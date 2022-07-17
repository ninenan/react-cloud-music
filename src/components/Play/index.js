import { memo } from "react"
import { useDispatch, useSelector } from 'react-redux';
import MiniPlayer from './MiniPlayer';
import NormalPlayer from './NormalPlayer';
import { changeFullScreen } from '../../store/player/actionCreator';

const currentSong = {
  al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
  name: "木偶人",
  ar: [{ name: "薛之谦" }]
}

const Player = () => {
  const dispatch = useDispatch();
  const { isFullScreen, isPlaying } = useSelector(state => state).toJS().player;

  const toggleFullScreen = (val) => {
    dispatch(changeFullScreen(val))
  }

  return (
    <>
      <MiniPlayer song={currentSong} isFullScreen={isFullScreen} isPlaying={isPlaying} toggleFullScreen={toggleFullScreen} />
      <NormalPlayer song={currentSong} isFullScreen={isFullScreen} isPlaying={isPlaying} toggleFullScreen={toggleFullScreen} />
    </>
  )
}

export default memo(Player);
