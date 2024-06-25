import { JSX } from "solid-js";
import { focusRing } from "../styles/focus";

type Props = JSX.InputHTMLAttributes<HTMLInputElement> & {
  offsetColor?: string;
};

export const TextInput = (props: Props) => {
  return (
    <input
      {...props}
      class={`dark:bg-slate-900 dark:text-gray-200 light:bg-slate-100 rounded-md dark:border-gray-900 dark:hover:border-gray-800  border-solid border-2 py-2 px-3 ${focusRing()} ${
        props.class
      }`}
    />
  );
};
