import http from '../../help/http';

const recommend = {
  getBannerList: () => http.get('/banner'),
  getRecommendList: () => http.get('/personalized')
}

export default recommend