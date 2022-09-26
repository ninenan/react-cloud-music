import { ICON_MODE_MAP } from './config';
export const getCount = (count) => {
  if (count < 0) return "";

  if (count < 10000) {
    return count + "";
  } else if (Math.floor (count / 10000) < 10000) {
    return Math.floor (count/1000)/10 + "万";
  } else {
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

export const debounce = (fn, delay, immediate = false) => {
  let timer = null;

  const debuounced = (...rest) => {
    if (timer) clearTimeout(timer);

    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null
      }, delay);

      if (callNow) {
        return fn.apply(this, rest);
      }
    } else {
      timer = setTimeout(() => {
        return fn.apply(this, rest);
      }, delay);
    }
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

export const findIndex = (list, song) => list.findIndex((item) => item.id === song.id);

/**
 * 洗牌数组
 * @param source any[]
 * @returns any[] 
 */
export const shuffle = (source) => {
  const arr = source.slice();
  for (let index = 0; index < arr.length; index++) {
    const j = getRandomInt(index);

    swap(arr, index, j);
  }

  return arr;
}

const getRandomInt = (max) => Math.floor(Math.random() * (max + 1));

const swap = (arr, index, j) => {
  const temp = arr[index];

  arr[index] = arr[j]; 
  arr[j] = temp;
}

export const getPlayModeIcon = (mode) => ICON_MODE_MAP.get(mode);

export const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));

export const isPromise = (p) => p && typeof p.then === 'function';
