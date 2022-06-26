import http from '../../help/http';

const album = {
  getAlbumDetailRequest: id => http.get(`/playlist/detail?id=${id}`),
}

export default album;
