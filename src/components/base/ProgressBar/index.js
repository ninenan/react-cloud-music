import { memo, startTransition, useReducer, useRef, useState } from 'react';
import { ProgressBarWrapper } from './style';

const ProgressBar = (props) => {
  const progressBarRef = useRef();
  const progressRef = useRef();
  const progressBtnRef = useRef();
  const [touch, setTouch] = useState({});
  const PROGRESS_BTN_WIDTH = 8;

  const setOffset = (offsetWidth) => {
    if (progressRef.current && progressBtnRef.current) {
      progressRef.current.style.width = `${offsetWidth}px`;
      progressBtnRef.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
    }
  }

  const handleProgressTouchStart = (e) => {
    const startTouch = {};

    startTouch.initiated = true;
    startTouch.startX = e.touches[0].pageX;
    if (progressRef.current) {
      startTouch.left = progressRef.current.clientWidth
    }

    setTouch(startTouch);
  };

  const handleProgressTouchMove = (e) => {
    if (!touch.initiated) return;

    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = progressBarRef.current.clientWidth - PROGRESS_BTN_WIDTH;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);

    setOffset(offsetWidth);
  };

  const handleProgressTouchEnd = () => {
    const endTouch = {...touch};
    endTouch.initiated = false;

    setTouch(endTouch);
  };

  const handleProgressBarClick = (e) => {
    const { pageX } = e;
    const { left, right } = progressBarRef.current.getBoundingClientRect();
    let offsetWidth = 0

    if (pageX <= left) {
      offsetWidth = 0
    } else if (pageX - left >= right - left) {
      offsetWidth = right - left - PROGRESS_BTN_WIDTH;
    } else {
      offsetWidth = pageX - left;
    }

    setOffset(offsetWidth);
  }

  return (
    <ProgressBarWrapper>
      <div className='bar-inner' ref={progressBarRef} onClick={handleProgressBarClick}>
        <div className='progress' ref={progressRef}></div>
        <div className='progress-btn-wrapper' 
          ref={progressBtnRef}
          onTouchStart={handleProgressTouchStart}
          onTouchMove={handleProgressTouchMove}
          onTouchEnd={handleProgressTouchEnd}
        >
          <div className='progress-btn'></div>
        </div>
      </div>
    </ProgressBarWrapper>
  )
}

export default memo(ProgressBar);
