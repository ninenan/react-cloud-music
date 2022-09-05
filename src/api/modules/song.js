import http from '../../help/http'

const song = {
  getLyricRequest: id => http.get(`/lyric?id=${id}`),
}

export default song;
