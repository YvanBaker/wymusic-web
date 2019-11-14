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
export interface SongSheet {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
}

// 歌手
export interface Singer {
  id: number;
  name: string;
  picUrl: string;
  albumSize: number;
}
