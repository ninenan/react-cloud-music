import { memo } from "react"
import { useDispatch, useSelector } from 'react-redux';

const Player = () => {
  const dispatch = useDispatch();
  const player = useSelector(state => state).toJS().player;

  console.log('player: ', player);

  return (
    <>
      Player
    </>
  )
}

export default memo(Player);
