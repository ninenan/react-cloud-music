import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import BetterScroll from "better-scroll";
import PropTypes from "prop-types";
import styled from "styled-components";

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Scroll = forwardRef((props, ref) => {
  const [BScroll, setBScroll] = useState();
  const scrollContainerRef = useRef();
  const { direction, click, refresh, bounceTop, bounceBottom, pullUp, pullDown, onScroll } = props;

  useEffect(() => {
    const scroll = new BetterScroll(scrollContainerRef.current, {
      scrollX: direction === 'horizental',
      startY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bounceBottom: bounceBottom
      }
    });
    setBScroll(scroll);

    return () => setBScroll(null);
  }, []);

  // 滚动事件
  useEffect(() => {
    if (!BScroll || !onScroll) return;

    BScroll.on("scroll", (scroll) => {
      onScroll(scroll);
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

    BScroll.on('touchEnd', (pops) => {
      if (pops.y > 50) {
        pullDown();
      }
    })

    return () => BScroll.off('touchEnd');
  }, [pullDown, BScroll]);

  useEffect(() => {
    if (refresh && BScroll) {
      console.log(BScroll)
      // BScroll.refresh()
    }
  })

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
      {props.children}
    </ScrollContainer>
  )
})

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
}

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizental']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,// 是否支持向上吸顶
  bounceBottom: PropTypes.bool// 是否支持向上吸顶
}

export default Scroll;

