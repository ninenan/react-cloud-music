import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useRef } from 'react';
import { forceCheck } from 'react-lazyload'
import { Outlet } from 'react-router';
import Slider from "../../components/Slider";
import RecommendList from "../../components/RecommendList";
import Scroll from '../../components/base/Scroll';
import Loading from "../../components/base/Loading";
import { Content } from './style';
import * as action from "./store/actionCreators";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { recommendList, bannerList, loading } = useSelector(state => state).toJS().recommend;
  const { playlist } = useSelector(state => state).toJS().player;
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!bannerList.length) dispatch(action.getBannerList());
    if (!recommendList.length) dispatch(action.getRecommendList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      return scrollRef.current.refresh();
    }
  }, []);

  return (
    <Content bottom={playlist.length ? '60px' : '0px'}>
      {loading ? <Loading /> :
        <Scroll className="list" onScroll={forceCheck} probeType={3} ref={scrollRef}>
          <div>
            <Slider bannerList={bannerList} />
            <RecommendList recommendList={recommendList} />
          </div>
        </Scroll>}
      <Outlet />
    </Content>
  )
}
