import blowpipe from '../assets/blowpipe.png';
import { Search } from './Search';

export const Nav = () => {
  return (
    <nav
      class={`fixed top-0 left-0 right-0 h-20 bg-gray-50 dark:bg-gray-950 dark:border-b-gray-900 dark:shadow-slate-900/40
 shadow-lg border-b-gray-50 border-b-2 border-solid px-12`}
    >
      <div class="flex items-center h-full justify-between">
        <div class="flex items-center w-64">
          <img class="w-12 h-12 rotate-45" src={blowpipe} alt="Blowpipe" />
          <h1
            style="margin-left: -4px;"
            class="text-gray-200 font-extrabold text-2xl"
          >
            Pipe
          </h1>
        </div>

        <div class="w-1/2">
          <Search />
        </div>

        <div class="w-64" />
      </div>
    </nav>
  );
};
