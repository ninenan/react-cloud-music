export const getCount = (count) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor (count / 10000) < 10000) {
    return Math.floor (count/1000)/10 + "万";
  } else  {
    return Math.floor (count / 10000000)/ 10 + "亿";
  }
}

export const getName = list => {
  let str = '';

  list.map((item, index) => {
    str += index === 0 ? item.name : `/${item.name}`;

    return item
  })

  return str
}

export const debuounce = (fn, delay) => {
  let timer = null;

  const debuounced = (...rest) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      return fn.apply(this, rest);
    }, delay);
  }

  debuounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  }

  return debuounced
}

export const isEmptyObj = obj => !obj || Object.keys(obj).length === 0;

export const getSongUrl = id => `https://music.163.com/song/media/outer/url?id=${id}.mp3`;

export const formatTime = time => {
  time = time | 0;

  const minute = (((time / 60) | 0) + "").padStart(2, "0");
  const second = (((time % 60) | 0) + "").padStart(2, "0");

  return `${minute}:${second}`;
}

