import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import BetterScroll from "better-scroll";
import PropTypes from "prop-types";
import styled from "styled-components";

const ScrollContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Scroll = forwardRef((props, ref) => {
  const [BScroll, setBScroll] = useState();
  const scrollContainerRef = useRef();
  const {
    scrollY,
    scrollX,
    click,
    bounceTop,
    bounceBottom,
    onScroll,
    probeType,
  } = props;

  // 创建 scroll 实例
  useEffect(() => {
    const scroll = new BetterScroll(scrollContainerRef.current, {
      scrollX,
      scrollY,
      probeType,
      click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    });

    setBScroll(scroll);

    return () => setBScroll(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 滚动事件
  useEffect(() => {
    if (!BScroll || !onScroll) return;

    BScroll.on("scroll", (position) => {
      onScroll(position);
    })

    return () => BScroll.off('scroll');
  }, [onScroll, BScroll]);
  // https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle
  // refresh 和 getScroll 方法 可以被父组件调用
  useImperativeHandle(ref, () => ({
    refresh() {
      if (BScroll) {
        BScroll.refresh();
        BScroll.scrollTo(0, 0);
      }
    },
    getScroll() {
      if (BScroll) {
        return BScroll;
      }
      return null;
    }
  }))

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
    </ScrollContainer>
  )
})

// props 的默认参数
Scroll.defaultProps = {
  scrollY: true,
  scrollX: false,
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
  probeType: 1,
  isHasMore: true
}

// 规定 prop 的 type 类型
Scroll.propTypes = {
  scrollY: PropTypes.bool,
  scrollX: PropTypes.bool,
  refresh: PropTypes.bool,
  // 滚动事件
  onScroll: PropTypes.func,
  // 上拉事件
  pullUp: PropTypes.func,
  // 下拉事件
  pullDown: PropTypes.func,
  // 是否支持向上吸顶动画
  bounceTop: PropTypes.bool,
  // 是否开启向下吸顶动画
  bounceBottom: PropTypes.bool,
  probeType: PropTypes.number,
}

export default Scroll;

