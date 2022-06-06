import { useSelector, useDispatch, connect } from 'react-redux'
import React, { useEffect } from 'react';

import Slider from "../../components/Slider";
import RecommendList from "../../components/RecommendList";
import Scroll from '../../baseUI/Scroll';
import { Content } from './style';
import * as actions from "./store/actionCreators";

function Recommend(props) {
  const { bannerList, recommendList, getBannerList, getRecommendList } = props;

  useEffect(() => {
    getBannerList();
    getRecommendList();
    //eslint-disable-next-line
  }, []);

  // const bannerListJS = bannerList ? bannerList.toJS() : [];
  // const recommendListJS = recommendList ? recommendList.toJS() : [];

  console.log('bannerList', bannerList)
  console.log('recommendList', recommendList)

  return (
    <Content>
      <Scroll className="list">
        <div>
          {/* <Slider bannerList={bannerList} /> */}
          {/* <RecommendList recommendList={recommendList} /> */}
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
      dispatch(actions.getBannerList())
    },
    getRecommendList() {
      dispatch(actions.getRecommendList())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))
