import { useSelector, useDispatch, connect } from 'react-redux'
import React, { useEffect } from 'react';

import Slider from "../../components/Slider";
import RecommendList from "../../components/RecommendList";
import Scroll from '../../baseUI/Scroll';
import { Content } from './style';
import * as action from "./store/actionCreators";

function Recommend(props) {
  const { bannerList, recommendList, getBannerList, getRecommendList } = props;

  useEffect(() => {
    (async () => {
      await getBannerList();
      await getRecommendList();
    })()
    //eslint-disable-next-line
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerListJS} />
          <RecommendList recommendList={recommendListJS} />
        </div>
      </Scroll>
    </Content>
  )
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommendList', 'bannerList']),
  recommendList: state.getIn(['recommendList', 'bannerList'])
})

const mapDispatchToProps = (dispatch) => {
  return {
    getBannerList() {
      dispatch(action.getBannerList())
    },
    getRecommendList() {
      dispatch(action.getRecommendList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))
