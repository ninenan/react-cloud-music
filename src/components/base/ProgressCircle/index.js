import { memo } from 'react';
import PropTypes from 'prop-types';
import { CircleWrapper } from './style.js';

const ProgressCirle = (props) => {
  const { radius, percent, children } = props;
  const dashArray = Math.PI * 100;
  const dashOffset = (1 - percent) * dashArray;

  return (
    <CircleWrapper>
      <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle className="progress-background" r="50" cx="50" cy="50" fill="transparent" />
        <circle className="progress-bar" r="50" cx="50" cy="50" fill="transparent"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      {children}
    </CircleWrapper>
  )
}

ProgressCirle.defaultProps = {
  redius: 0,
  precent: 0,
}

ProgressCirle.propTypes = {
  radius: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
}

export default memo(ProgressCirle);


