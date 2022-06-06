import { connect } from 'react-redux'
import React, { useEffect } from 'react';

import Slider from "../../components/Slider";
import RecommendList from "../../components/RecommendList";
import Scroll from '../../baseUI/Scroll';
import { Content } from './style';
import * as action from "./store/actionCreators";

function Recommend(props) {
  const { bannerList, recommendList, getBannerList, getRecommendList } = props;

  useEffect(() => {
    getBannerList();
    getRecommendList();
    //eslint-disable-next-line
  }, []);

  const bannerListRes = bannerList ? bannerList.toJS() : [];
  const recommendListRes = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerListRes} />
          <RecommendList recommendList={recommendListRes} />
        </div>
      </Scroll>
    </Content>
  )
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList'])
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
