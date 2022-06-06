import Slider from "../../components/Slider";
import RecommendList from "../../components/RecommendList";
import Scroll from '../../baseUI/Scroll';
import { Content } from './style';
import api from '../../api/index';

console.log('api', api);

export default function Recommend() {
  // mock 数据
  const bannerList = [1, 2, 3, 4].map(() => {
    return { imgUrl: "https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/4347386.jpg" }
  });

  const recommendList = (new Array(10)).fill(0).map((item, index) => {
    return {
      id: index + 1,
      picUrl: "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
      playCount: 100,
      name: '朴树、许巍、李建'
    }
  })

  return (
    <Content>
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
      </Scroll>
    </Content>
  )
}
