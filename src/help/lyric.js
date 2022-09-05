const timeRE = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
const LYRIC_STATE = {
  pause: 0,
  playing: 1,
}

export default class Lyric {
  constructor(lrc, hanlder = () => { }) {
    this.lrc = lrc;
    // 解析后的数组
    this.lines = [];
    // 回调函数
    this.hanlder = hanlder;
    // 歌词播放状态
    this.state = LYRIC_STATE.pause;
    // 当前播放歌词行数
    this.currentLineIndex = 0;
    // 歌曲开始的时间戳
    this.startStamp = 0;
    // 继续播放-定时器
    this.timer = null;
    this._initLine()
  }

  _initLine() {
    const lines = this.lrc.split('\n');
    for (let index = 0; index < lines.length; index++) {
      const currentLine = lines[index];
      let res = timeRE.exec(currentLine);

      if (!res) continue;
      // 去掉时间戳，只剩下歌词
      const txt = currentLine.replace(timeRE, '').trim();
      if (txt) {
        if (res[3].length === 3) {
          res[3] = res[3] / 10
        }
        this.lines.push({
          time: res[1] * 60 * 1000 + res[2] * 1000 + (res[3] || 0) * 10,
          txt
        })
      }
    }
    this.lines.sort((a, b) => a.time - b.time);
  }

  /**
    * offset 时间进度
    * isSeek 用户是否手动调整进度
    */
  play(offset = 0, isSeek = false) {
    if (!this.lines.length) {
      return;
    }

    this.state = LYRIC_STATE.playing;
    // 找到当前所在行
    this.currentLineIndex = this._findCurrentLineIndex(offset);
    // 当前正处于第 currentLineIndex - 1 行
    // 立即定位，触发传过来的回调函数，将当前歌词信息穿过去
    this._callHandler(this.currentLineIndex - 1);
    // 根据当前时间进度来判断歌曲开始的时间戳
    this.startStamp = +new Date() - offset;

    if (this.currentLineIndex < this.lines.length) {
      clearTimeout(this.timer);
      // 继续播放
      this._playRest(isSeek);
    }
  }

  _findCurrentLineIndex(time) {
    for (let index = 0; index < this.lines.length; index++) {
      if (time <= this.lines[index].time) {
        return index;
      }
      return this.lines.length - 1;
    }
  }

  _callHandler(index) {
    if (index < 0) {
      return;
    }
    this.hanlder({
      txt: this.lines[index].txt,
      lineNum: index
    })
  }

  /**
    * isSeek 表示用户是是否是手动调整进度
    */
  _playRest(isSeek = false) {
    const currentLine = this.lines[this.currentLineIndex];
    let delay = 0;

    if (isSeek) {
      delay = currentLine.time - (+new Date() - this.startStamp);
    } else {
      // 获取上一行的歌词开始时间
      let preTime = this.lines[this.currentLineIndex - 1] ? this.lines[this.currentLineIndex - 1].time : 0;
      delay = currentLine.time - preTime;
    }

    this.timer = setTimeout(() => {
      this._callHandler(this.currentLineIndex ++);
      if (this.currentLineIndex < this.lines.length && this.state === LYRIC_STATE.playing) {
        this._playRest()
      }
    }, delay)
  }

  /**
    * 暂停/播放 歌曲
    */
  togglePlay(offset) {
    if (this.state === LYRIC_STATE.playing) {
      this.stop();
    } else {
      this.state = LYRIC_STATE.playing;
      this.play(offset, true);
    }
  }

  stop() {
    this.state = LYRIC_STATE.pause;
    clearTimeout(this.timer);
  }

  /**
    * 切换歌曲播放进度
    */
  seek(offset) {
    this.play(offset, true)
  }
}
