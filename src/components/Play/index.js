import { memo, useEffect, useReducer, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import MiniPlayer from './MiniPlayer';
import NormalPlayer from './NormalPlayer';
import { 
  changePlayingState, 
  changeCurrenIndex, 
  changeCurrentSong,
  changePlaylist,
  changeSequencePlaylist
} from '../../store/player/actionCreator';
import { playlist as mockPlaylist } from '../../mock/player';
import { getSongUrl } from '../../help/utils';
import { PLAY_MODE_MAP } from "../../help/config";

const Player = () => {
  const dispatch = useDispatch();
  const { isPlaying, currentIndex, playlist, mode, currentSong } = useSelector(state => state).toJS().player;
  // 播放时间
  const [currentTime, setCurrentTime] = useState(0);
  // 歌曲总时长
  const [duration, setDuration] = useState(0);
  const [isSongReady, setIsSongReady] = useState(false);
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

  /**
   * 循环播放
   */
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    dispatch(changePlayingState(true));
    audioRef.current.play()
  }

  /**
   * 上一首
   */
  const handlePrevPlay = () => {
    if (playlist.length === 1) {
      handleLoop();
    } else {
      let index = currentIndex - 1;

      if (index === -1) {
        index = playlist.length - 1
      }

      handlePlay(index);
    }
  }

  /**
   * 下一首
   */
  const handleNextPlay = () => {
    if (playlist.length === 1) {
      handleLoop();
    } else {
      let index = currentIndex + 1;

      if (index === playlist.lenth) {
        index = 0;
      }

      handlePlay(index);
    }
  }

  /**
   * 播放
   */
  const handlePlay = (index) => {
    dispatch(changeCurrenIndex(index));
    dispatch(changeCurrentSong(playlist[index]));
    dispatch(changePlayingState(true));
  }

  /**
   * 处理 audio 状态
   */
  const handleAudioSatus = (current) => {
    setCurrentTime(0);
    setDuration(current.dt / 1000 | 0);
    if (audioRef.current) {
      audioRef.current.src = getSongUrl(current.id);
      audioRef.current.play();
    }
  }

  useEffect(() => {
    setCurrentTime(0);
    setDuration(currentSong.dt / 1000 | 0);

    if (audioRef.current) {
      audioRef.current.src = getSongUrl(currentSong.id);
      audioRef.current.play();
    }
  }, [currentIndex]);

  const handleEnd = () => {
    if (mode === PLAY_MODE_MAP.loop) {
      handleLoop();
    } else {
      handleNextPlay();
    }
  }

  const handleSongReady = () => {
    if (!isSongReady) {
      return;
    }
    console.log(333);
    setIsSongReady(true);
  }

  const handleError = () => {
    setIsSongReady(true);
  }

  return (
    <>
      <MiniPlayer audioRef={audioRef} percent={percent} />
      <NormalPlayer 
        audioRef={audioRef} 
        duration={duration} 
        currentTime={currentTime} 
        percent={percent}
        onProgressChanged={onProgressChanged}
        onHandlePrevPlay={handlePrevPlay}
        onHandleNextPlay={handleNextPlay}
      />
      <audio 
        ref={audioRef} 
        onTimeUpdate={handleTimeUpdate} 
        onEnded={handleEnd}
        onCanPlay={handleSongReady}
        onError={handleError}
      />
    </>
  )
}

export default memo(Player);
