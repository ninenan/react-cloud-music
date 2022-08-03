import { useState } from 'react';

function usePlayer (audioRef) {
  const handleChangeAudioStatus = (flag) => {
    if (flag) {
      audioRef.current.play();
    } else {
      audioRef.current.pause()
    }
  }

  return {
    handleChangeAudioStatus
  }
  
}

export default usePlayer;
