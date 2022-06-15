import http from '../../help/http';

const rank = {
  getRankListRequest: () => {
    return http.get('/toplist/detail');
  }
}

export default rank;



