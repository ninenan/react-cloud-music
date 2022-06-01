import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Slider(props) {
  const { bannerList } = props

  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true, type: "bullets" }}
      autoplay
    >
      {bannerList.map((slider, index) => {
        return <SwiperSlide key={index}>
          <img
            src={slider.imgUrl}
            width="100%"
            height="100%"
            alt="推荐"
          />
        </SwiperSlide>
      })}
    </Swiper>
  );
};