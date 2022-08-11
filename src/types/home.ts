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
    transName: string,
    duration: number
  }
}

export type SongListItem = {
  playlist: {
    id: number,
    coverImgUrl: string,
    name: string,
    subscribedCount: string,
    shareCount: string,
    tags: [],
    trackCount: number,
    playCount: number,
    description: string,
    tracks: {
      name: string,
      ar: { name: string }[],
      al: {
        name: string
      },
      dt: string
    }[],
    creator: {
      avatarUrl: string,
      nickname: string
    }
  }
}

export type SongData = {
  name: string,
  al: {
    picUrl: string,
    name: string
  },
  ar: { name: string }[]
}

export type ObjLyricItem = {
  name: string,
  time: number
}

export type CommentListItem = {
  user: {
    avatarUrl: string,
    nickname: string,
    content: string,
    likedCount: string
  }
}

export type SongItem = {

}

export type Banners = BannersItem[]
export type SongMenuList = SongMenuListItem[]
export type NewMusicList = NewMusicListItem[]
export type SongList = SongListItem[]
export type ObjLyri = ObjLyricItem[]
export type CommentList = CommentListItem[]