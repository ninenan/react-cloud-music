import { memo, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import MiniPlayer from './MiniPlayer';
import NormalPlayer from './NormalPlayer';
import { 
  changePlayingState, 
  changeCurrenIndex, 
  changeCurrentSong,
  changePlaylist
} from '../../store/player/actionCreator';
import { playlist } from '../../mock/player';
import { getSongUrl } from '../../help/utils';

const Player = () => {
  const dispatch = useDispatch();
  const { isPlaying } = useSelector(state => state).toJS().player;
  // 播放时间
  const [currentTime, setCurrentTime] = useState(0);
  // 歌曲总时长
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  }

  const onProgressChanged = curPrecent => {
    const time = curPrecent * duration;

    setCurrentTime(time);
    if (!isPlaying) {
      dispatch(changePlayingState(true));
    }
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      audioRef.current.play();
    }

  }

  useEffect(() => {
    let current = playlist[0];

    dispatch(changeCurrenIndex(0));
    dispatch(changeCurrentSong(current));
    dispatch(changePlaylist(playlist));
    setCurrentTime(0);
    setDuration(current.dt / 1000 | 0);
    if (audioRef.current) {
      audioRef.current.src = getSongUrl(current.id);
    }
  }, [audioRef]);

  return (
    <>
      <MiniPlayer audioRef={audioRef} percent={percent} />
      <NormalPlayer 
        audioRef={audioRef} 
        duration={duration} 
        currentTime={currentTime} 
        percent={percent}
        onProgressChanged={onProgressChanged}
      />
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
    </>
  )
}

export default memo(Player);
