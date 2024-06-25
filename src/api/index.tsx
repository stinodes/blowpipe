import { createSignal } from 'solid-js';

export const baseUrlSignal = createSignal('http://0.0.0.0:3000');

const get = <R = any,>(url: string) => fetch(url).then((r) => r.json() as R);

type VideoThumbnail = {
  quality: string;
  url: string;
  width: number;
  height: number;
};
type AuthorThumbnail = Omit<VideoThumbnail, 'quality'>;
type SearchResult = {
  type: 'video' | 'channel';
  title: string;
  videoId: string;
  author: string;
  authorId: string;
  authorUrl: string;
  videoThumbnails: VideoThumbnail[];
  description: string;
  viewCount: string;
  published: string;
  publishedText: string;
  lengthSeconds: number;
};

type AdaptiveFormat = {
  index: string;
  bitrate: string;
  init: string;
  url: string;
  itag: string;
  type: string;
  clen: string;
  lmt: string;
  projectionType: number;
  container: string;
  encoding: string;
  qualityLabel: string;
  resolution: string;
};
type FormatStream = {
  url: string;
  itag: string;
  type: string;
  quality: string;
  container: string;
  encoding: string;
  qualityLabel: string;
  resolution: string;
  size: string;
};
type Video = {
  title: string;
  videoId: string;

  videoThumbnails: VideoThumbnail[];

  description: string;
  published: string;
  publishedText: string;

  viewCount: string;
  likeCount: string;

  author: string;
  authorId: string;
  authorUrl: string;
  authorThumbnails: AuthorThumbnail[];

  subCountText: string;
  lengthSeconds: number;
  rating: number;

  dashUrl: string;
  adaptiveFormats: AdaptiveFormat[];
  formatStreams: FormatStream[];
};

const prefix = '/api/v1';
const url = (endpoint: string) => `${baseUrlSignal[0]()}${prefix}${endpoint}`;
export const api = {
  video: (id: string) => get<Video>(url(`/videos/${id}`)),
  searchSuggestions: (searchStr: string) =>
    !!searchStr
      ? get<{ suggestions: string[] }>(
          url(`/search/suggestions?q=${encodeURI(searchStr)}`),
        )
      : Promise.resolve({ suggestions: [] as string[] }),

  search: (searchStr: string, page: number) =>
    searchStr.length > 3
      ? get<SearchResult[]>(
          url(`/search?q=${encodeURI(searchStr)}&page=${page}`),
        )
      : Promise.resolve([] as SearchResult[]),
};
