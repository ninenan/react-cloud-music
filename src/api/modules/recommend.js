import http from '../../help/http';

const recommend = {
  getBannerListRequest: () => http.get('/banner'),
  getRecommendListRequest: () => http.get('/personalized')
}

export default recommend
