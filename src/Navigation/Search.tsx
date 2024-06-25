import { createResource, createSignal } from 'solid-js';
import { TextInput } from '../common/components/TextInput';
import { focusRing } from '../common/styles/focus';
import { PopOut } from '../common/components/PopOut';
import { api } from '../api';
import { A, useNavigate } from '@solidjs/router';

const toSearchParams = (search: string) => new URLSearchParams([['q', search]]);
export const Search = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = createSignal<string>('', {
    name: 'Search value',
  });
  const [isFocused, setFocused] = createSignal(false, { name: 'Focus' });
  const [isHovered, setHovered] = createSignal(false, { name: 'Hover' });

  const [results] = createResource<{ suggestions: string[] }, string>(
    searchValue,
    api.searchSuggestions,
  );

  const suggestions = () => results()?.suggestions;

  const onSearch = (e: Event) => {
    e.preventDefault();
    navigate(`/search?${toSearchParams(searchValue())}`);
  };

  return (
    <form class="w-full relative flex" onSubmit={onSearch}>
      <div class="w-full flex flex-col mr-2">
        <TextInput
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 50)}
          class="w-full font-medium"
          value={searchValue()}
          onInput={(v) => setSearchValue(v.target.value)}
          placeholder="Search..."
        />
        {(isHovered() || isFocused()) && suggestions()?.length && (
          <div class="relative">
            <div
              class="absolute left-0 right-0 top-2 px-4 py-2 rounded-md bg-slate-900"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {suggestions()?.map((str) => {
                return (
                  <A
                    onClick={() => setSearchValue(str)}
                    href={`/search?${toSearchParams(str)}`}
                    class="block rounded-md hover:bg-slate-800/40 px-4 py-2 text-gray-200"
                  >
                    {str}
                  </A>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <button
        type="submit"
        class={`bg-violet-700 hover:bg-violet-500 active:bg-violet-900 text-gray-200 px-4 rounded-md font-medium ${focusRing()}`}
      >
        Search
      </button>
    </form>
  );
};
