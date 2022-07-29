import { memo, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import MiniPlayer from './MiniPlayer';
import NormalPlayer from './NormalPlayer';
import { changePlayingState ,changeFullScreen, changeCurrenIndex, changeCurrentSong } from '../../store/player/actionCreator';
import { playList } from '../../mock/player';
import { getSongUrl } from '../../help/utils';

const Player = () => {
  const dispatch = useDispatch();
  const { isFullScreen, isPlaying, currentIndex, currentSong } = useSelector(state => state).toJS().player;
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const toggleFullScreen = (val) => {
    dispatch(changeFullScreen(val))
  }

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  }

  useEffect(() => {
    let current = playList[0];

    dispatch(changeCurrenIndex(0));
    dispatch(changeCurrentSong(current));
    if (audioRef.current) {
      audioRef.current.src = getSongUrl(current.id);
    }
    dispatch(changePlayingState(true));
    setCurrentTime(0);
    setDuration(current.dt / 1000 | 0);
  }, [audioRef]);

  return (
    <>
      <MiniPlayer audioRef={audioRef} />
      <NormalPlayer audioRef={audioRef} />
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}></audio>
    </>
  )
}

export default memo(Player);
