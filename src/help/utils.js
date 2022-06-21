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
