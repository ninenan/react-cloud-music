import { memo, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Scroll from "../../components/base/Scroll";
import { List, ListItem } from "./style";

const Horizon = (props) => {
  const { list, currentVal, title, handleClick } = props
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      return scrollRef.current.refresh();
    }
  })

  return (
    <Scroll scrollY={false} scrollX={true} ref={scrollRef}>
      <List>
        <span>{title}</span>
        {list.map((item) => {
          return (
            <ListItem
              key={item.key}
              className={currentVal === item.key ? 'active' : ''}
              onClick={() => handleClick(item.key)}
            >
              {item.name}
            </ListItem>
          )
        })}
      </List>
    </Scroll>
  )
}

Horizon.defaultProps = {
  list: [], // 列表数据
  currentVal: '',
  title: '', // 标题
  handleClick: null // 点击事件
}

Horizon.propTypes = {
  list: PropTypes.array,
  currentVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
}

export default memo(Horizon)
