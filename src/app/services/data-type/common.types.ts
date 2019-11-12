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
  id: string;
  name: string;
  picUrl: string;
  playCount: number;
}
