import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react';
import { forceCheck } from 'react-lazyload'

import Slider from "../../components/Slider";
import RecommendList from "../../components/RecommendList";
import Scroll from '../../baseUI/Scroll';
import Loading from "../../baseUI/Loading";
import { Content } from './style';
import * as action from "./store/actionCreators";

// redux 不是 hooks 写法
// function Recommend(props) {
//   const { bannerList, recommendList, getBannerList, getRecommendList } = props;

//   useEffect(() => {
//     getBannerList();
//     getRecommendList();
//     //eslint-disable-next-line
//   }, []);

//   const bannerListRes = bannerList ? bannerList.toJS() : [];
//   const recommendListRes = recommendList ? recommendList.toJS() : [];

//   return (
//     <Content>
//       <Scroll className="list">
//         <div>
//           <Slider bannerList={bannerListRes} />
//           <RecommendList recommendList={recommendListRes} />
//         </div>
//       </Scroll>
//     </Content>
//   )
// }

// const mapStateToProps = (state) => ({
//   bannerList: state.getIn(['recommend', 'bannerList']),
//   recommendList: state.getIn(['recommend', 'recommendList'])
// })

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getBannerList() {
//       dispatch(action.getBannerList())
//     },
//     getRecommendList() {
//       dispatch(action.getRecommendList())
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))

// redux hooks 写法
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { recommendList, bannerList, loading } = useSelector(state => state).toJS().recommend
  const dispatch = useDispatch()

  useEffect(() => {
    if (!bannerList.length) dispatch(action.getBannerList())
    if (!recommendList.length) dispatch(action.getRecommendList())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Content>
      {loading ? <Loading /> :
        <Scroll className="list" onScroll={forceCheck} probeType={3}>
          <div>
            <Slider bannerList={bannerList} />
            <RecommendList recommendList={recommendList} />
          </div>
        </Scroll>}
    </Content>
  )
}
