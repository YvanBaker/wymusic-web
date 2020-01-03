import {Lyric} from '../../../../services/data-type/common.types';

const timeExp = /\[(\d{1,2}):(\d{2})(?:\.(\d{2,3}))?\]/;

export interface BaseLyricLine {
  txt: string;
  txtCN: string;
}

interface LyricLine extends BaseLyricLine {
  time: number;
}

export class LyricC {

  private lrc: Lyric;
  lines: LyricLine[] = [];

  constructor(lrc: Lyric) {
    this.lrc = lrc;
    this.init();
  }

  private init() {
    if (this.lrc.tlyric.lyric) {
      this.generTLyric();
    } else {
      this.generLyric();
    }
  }

  private generTLyric() {
    const lines = this.lrc.lrc.lyric.split('\n');
    const tlins = this.lrc.tlyric.lyric.split('\n');

    let tempArr = [];
    tempArr = [lines, tlins];

    tempArr[0].forEach(item => {
      this.makeLine(item);
    });
    tempArr[1].forEach(item => {
      const result = timeExp.exec(item);
      if (result) {
        const txtCN = item ? item.replace(timeExp, '').trim() : '';
        // tslint:disable-next-line:radix
        const time = Number(result[1]) * 60 * 1000 + Number(result[2]) * 1000 + parseInt(result[3]);
        console.log(this.lines.find(x => x.time === time).txtCN = txtCN);
      }
    });
  }


  private generLyric() {
    const lines = this.lrc.lrc.lyric.split('\n');
    lines.forEach(line => this.makeLine(line));
  }

  private makeLine(line: string, tline = '') {
    const result = timeExp.exec(line);
    if (result) {
      const txt = line.replace(timeExp, '').trim();
      const txtCN = tline ? tline.replace(timeExp, '').trim() : '';
      // tslint:disable-next-line:radix
      const time = Number(result[1]) * 60 * 1000 + Number(result[2]) * 1000 + parseInt(result[3]);
      if (txt) {
        this.lines.push({txt, txtCN, time});
      } else {
        this.lines.push({txt, txtCN, time});
      }
    }
  }

  stop() {
  }
}
