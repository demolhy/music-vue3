export type BannersItem = {
  imageUrl: string,
  encodeId: string
}

export type SongMenuListItem = {
  coverImgUrl: string,
  name: string,
  id: number
}

export type NewMusicListItem = {
  picUrl: string,
  name: string,
  singerName: string,
  song: {
    transName: string
  }
}

export type Banners = BannersItem[]
export type SongMenuList = SongMenuListItem[]
export type NewMusicList = NewMusicListItem[]