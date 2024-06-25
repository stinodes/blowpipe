import { JSX } from 'solid-js';
import { Nav } from './Nav';

type Props = {
  children?: JSX.Element;
};
export const Layout = (props: Props) => {
  return (
    <>
      <div class="w-full h-full bg-gray-950 bg-gradient-to-bl from-slate-900 via-gray-950 to-gray-950 pt-20 flex flex-col">
        {props.children}
      </div>
      <Nav />
    </>
  );
};
