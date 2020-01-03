export interface Banner {
  targetId: number;
  url: string;
  imageUrl: string;
}

// 热门标签
export interface HotTag {
  id: number;
  name: string;
  position: number;
}


// 热门歌单
export interface HotSongSheet {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
}

// 歌手
export interface Singer {
  id: number;
  name: string;
  img1v1Url: string;
  albumSize: number;
}

// 歌单
export interface SongSheet {
  id: number;
  tags: string[];
  name: string;
  coverImgUrl: string;
  description: string;
  tracks: SongSheetList[];
}

// 歌单列表
export interface SongSheetList {
  name: string;
  id: number;
  ar: Singer[];
  al: {id: number; name: string; picUrl: string};
  mv: number;
  dt: number;
  url: string;
}

// 歌曲信息
export interface Song {
  id: number;
  url: string;
  encodeType: string;
}

export interface Lyric {
  lrc: {version: number; lyric: string};
  tlyric: {version: number; lyric: string};
}
