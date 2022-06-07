import LazyLoad from "react-lazyload";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {
  return (
    <LazyLoad
      placeholder={
        <img
          width="100%"
          height="100%"
          src={require('../../assets/image/music.jpg')}
          alt="music"
        />
      }
    >
      {children}
    </LazyLoad>
  )
}
