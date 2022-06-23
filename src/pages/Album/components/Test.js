import { memo, useState } from 'react';
import SongList from './SongList';
import Scroll from '../../../components/base/Scroll';
import { List } from '../style';
import { currentAlbum } from '../../../mock/album';

const maxTranslateY = 233;
function Test(props) {

  const { handleScroll } = props

  return (
    <List top="273">
      <Scroll probeType={3} onScroll={handleScroll}>
        <div className="song-list-wrapper">
          <SongList key="1fasdfsa" tracks={currentAlbum.tracks} />
        </div>
      </Scroll>
    </List>
  )
}

export default memo(Test);