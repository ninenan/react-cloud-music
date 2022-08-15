import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Popup from '../../base/Popup';
import { getPlayModeIcon, getName, sleep } from '../../../help/utils';
import { ListHeader, ListContent } from './style';
import { PLAY_MODE_MAP } from '../../../help/config';
import { changeCurrentIndex, changePlayMode, deleteSong } from '../../../store/player/actionCreator';
import WrapperScroll from '../../base/WrapperScroll';
import { useEffect, useRef } from 'react';

const PlayPopup = (props) => {
  const { visable, onClose } = props;
  const { mode, playlist, currentSong } = useSelector(state => state).toJS().player;
  const dispatch = useDispatch();
  const wrapperScrollRef = useRef(null);

  const getPlayMode = () => {
    const icon = getPlayModeIcon(mode);
    const text = mode === PLAY_MODE_MAP.loop ? '单曲循环' : mode === PLAY_MODE_MAP.seuqence ? '顺序播放' : '随机播放';

    return (
      <div>
        <i className="iconfont" onClick={(e) => handleChangeMode(e)} dangerouslySetInnerHTML={{ __html: icon }}></i>
        <span className="text" onClick={(e) => handleChangeMode(e)}>{text}</span>
      </div>
    )
  }

  const handleChangeMode = () => {
    const nextMode = (mode + 1) % 3;

    dispatch(changePlayMode(nextMode))
  }

  const handleShowClear = () => {
    console.log('handleShowClear');
  }

  const getCurrentIcon = (item) => {
    const current = currentSong.id === item.id;
    const className = current ? 'icon-play' : '';
    const icon = current ? '&#xe6e3;' : '';

    return (
      <i className={`current iconfont ${className}`} dangerouslySetInnerHTML={{ __html: icon }}></i>
    )
  }

  const handleChangeCurrenIndex = (index) => {
    console.log(index);
    dispatch(changeCurrentIndex(index));
  }

  useEffect(() => {
    // 或者使用 requestAnimationFrame
    const initRefresh = async () => {
      await sleep(300);
      wrapperScrollRef.current.refresh();
    }
    if (wrapperScrollRef.current) {
      initRefresh()
    }
  }, [visable]);

  const handleDeleteSong = (e, song) => {
    e.stopPropagation();
    dispatch(deleteSong(song));
  }
  return (
    <Popup onClose={onClose} visable={visable}>
      <ListHeader>
        <div className='title'>
          {getPlayMode()}
          <span className="iconfont clear" onClick={handleShowClear}>&#xe63d;</span>
        </div>
      </ListHeader>
      <ListContent>
        <WrapperScroll ref={wrapperScrollRef}>
          <ul>
            {
              playlist.map((item, index) => {
                return (
                  <li className="item" key={item.id} onClick={() => handleChangeCurrenIndex(index)}>
                    {getCurrentIcon(item)}
                    <span className="text">{item.name} - {getName(item.ar)}</span>
                    <span className="like">
                      <i className="iconfont">&#xe601;</i>
                    </span>
                    <span className="delete" onClick={(e) => handleDeleteSong(e, item)}>
                      <i className="iconfont">&#xe63d;</i>
                    </span>
                  </li>
                )
              })
            }
          </ul>
        </WrapperScroll>
      </ListContent>
    </Popup>
  )
}

PlayPopup.defaultProps = {
  visable: false,
  onClose: () => {}
}

PlayPopup.prototypes = {
  visable: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default PlayPopup;
