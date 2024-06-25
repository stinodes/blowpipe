import { A, useSearchParams } from '@solidjs/router';
import { createResource } from 'solid-js';
import { api, baseUrlSignal } from '../api';
import { formatDuration } from '../utils';

export const Search = () => {
  const [params] = useSearchParams();

  const [results] = createResource(
    () => params.q,
    (q) => api.search(q, 1),
  );

  return (
    <div class="flex flex-col flex-initial overflow-hidden pt-4">
      <div class="container mx-auto text-gray-200 py-4">
        <h1 class="text-xl">
          Search results: <span class="font-semibold">{params.q}</span>
        </h1>
      </div>
      <div class="flex-initial overflow-scroll grid grid-cols-3 gap-4 px-6">
        {results()?.map((video) =>
          video.type === 'video' ? (
            <A
              class="rounded-md flex flex-col hover:bg-gray-800/40 transition-colors p-4"
              href={'/watch/' + video.videoId}
            >
              <div class="mb-2 rounded-md overflow-hidden aspect-video relative">
                <img
                  alt={video.title}
                  src={`${baseUrlSignal[0]()}${video.videoThumbnails.find(
                    (t) => t.quality === 'maxresdefault',
                  )?.url}`}
                />
                <p class="text-gray-200 text-sm bg-gray-950/60 px-2 pt-1 absolute bottom-0 right-0 rounded-tl-md">
                  {formatDuration(video.lengthSeconds)}
                </p>
              </div>
              <div class="w-full mb-2 text-gray-200">
                <h3
                  title={video.title}
                  class="font-semibold text-md whitespace-nowrap text-ellipsis overflow-hidden"
                >
                  {video.title}
                </h3>
                <div class="flex justify-between">
                  {video.author && (
                    <a
                      class="text-sm text-violet-300 underline-offset-1 hover:underline hover:text-violet-500 overflow-hidden whitespace-nowrap text-ellipsis"
                      href={video.authorUrl}
                    >
                      {video.author}
                    </a>
                  )}
                  <p class="text-sm text-violet-300 opacity-70">
                    {video.viewCount} views | {video.publishedText}
                  </p>
                </div>
              </div>
            </A>
          ) : null,
        )}
      </div>
    </div>
  );
};
