import { memo, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import MiniPlayer from './MiniPlayer';
import NormalPlayer from './NormalPlayer';
import { 
  changePlayingState, 
  changeFullScreen, 
  changeCurrenIndex, 
  changeCurrentSong
} from '../../store/player/actionCreator';
import { playList } from '../../mock/player';
import { getSongUrl } from '../../help/utils';
import { set } from "immutable";

const Player = () => {
  const dispatch = useDispatch();
  // 播放时间
  const [currentTime, setCurrentTime] = useState(0);
  // 歌曲总时长
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  }

  useEffect(() => {
    let current = playList[0];

    dispatch(changeCurrenIndex(0));
    dispatch(changeCurrentSong(current));
    dispatch(changePlayingState(true));
    setCurrentTime(0);
    setDuration(current.dt / 1000 | 0);
    if (audioRef.current) {
      audioRef.current.src = getSongUrl(current.id);
    }
  }, [audioRef]);

  return (
    <>
      <MiniPlayer audioRef={audioRef} />
      <NormalPlayer 
        audioRef={audioRef} 
        duration={duration} 
        currentTime={currentTime} 
        percent={percent}
      />
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
    </>
  )
}

export default memo(Player);
