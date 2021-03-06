import { useNavigate } from 'react-router-dom';
import { ListWrapper, List, ListItem } from "./style";
import { getCount } from "../../help/utils";
import LazyLoadImg from "../../components/base/LazyLoadImg";

export default function RecommendList(props) {
  const navigate = useNavigate();
  const { recommendList } = props;

  const handleToDetail = (id) => {
    navigate(`/recommend/${id}`);
  }

  return (
    <ListWrapper>
      <h1 className="title">热门歌单推荐</h1>
      <List>
        {recommendList.map(item => {
          return (
            <ListItem key={item.id} onClick={() => handleToDetail(item.id)}>
              <div className="img__wrapper">
                <LazyLoadImg>
                  <img src={`${item.picUrl}?param=300*300`} width="100%" height="100%" alt="music-img" />
                </LazyLoadImg>
                <div className="right__container">
                  <div className="desc">{item.name}</div>
                  <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">{getCount(item.playCount)}</span>
                  </div>
                </div>
              </div>
            </ListItem>
          )
        })}
      </List>
    </ListWrapper>
  )
}
