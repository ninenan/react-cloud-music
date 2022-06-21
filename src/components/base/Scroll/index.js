import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import BetterScroll from "better-scroll";
import PropTypes from "prop-types";
import styled from "styled-components";

const ScrollContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const PullDownLoading = styled.div`
  height: 30px;
  line-height: 30px;
  margin: auto;
  z-index: 100;
  text-align: center;
`;

const PullUpLoading = styled.div`
  height: 30px;
  line-height: 30px;
  margin: auto;
  z-index: 100;
  text-align: center;
`;

const Scroll = forwardRef((props, ref) => {
  const [BScroll, setBScroll] = useState();
  const scrollContainerRef = useRef();
  const {
    scrollY,
    scrollX,
    click,
    refresh,
    bounceTop,
    bounceBottom,
    pullUp,
    pullDown,
    onScroll,
    probeType,
    pullUpLoading,
    pullDownLoading,
    isHasMore
  } = props;
  const pullUpText = useMemo(() => isHasMore ? '拼命加载中...' : '我是有底线的', [isHasMore]);

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
  // 上拉事件
  useEffect(() => {
    if (!BScroll || !pullUp) return;

    BScroll.on('scrollEnd', () => {
      if (BScroll.y <= BScroll.maxScrollY + 100) {
        pullUp();
      }
    })

    return () => BScroll.off('scrollEnd');
  }, [pullUp, BScroll]);
  // 下拉事件
  useEffect(() => {
    if (!BScroll || !pullDown) return;

    BScroll.on('touchEnd', (position) => {
      if (position.y > 50) {
        pullDown();
      }
    })

    return () => BScroll.off('touchEnd');
  }, [pullDown, BScroll]);
  // BScroll 自刷新
  useEffect(() => {
    if (refresh && BScroll) {
      BScroll.refresh()
    }
  })
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
    }
  }))

  return (
    <ScrollContainer ref={scrollContainerRef}>
      <div>
        <PullDownLoading style={pullDownLoading ? { display: "block" } : { display: "none" }}>刷新中...</PullDownLoading>
        {props.children}
        <PullUpLoading style={{ display: pullUpLoading ? "block" : "none" }}>{pullUpText}</PullUpLoading>
      </div>
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
  // 下拉刷新 loading
  pullUpLoading: PropTypes.bool,
  // 上拉加载 loading
  pullDownLoading: PropTypes.bool,
  // 是否支持向上吸顶动画
  bounceTop: PropTypes.bool,
  // 是否开启向下吸顶动画
  bounceBottom: PropTypes.bool,
  probeType: PropTypes.number,
  isHasMore: PropTypes.bool
}

export default Scroll;

