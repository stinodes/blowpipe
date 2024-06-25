import { Component } from 'solid-js';

type Props = {
  icon: Component<{ class?: string }>;
  class?: string;
  onClick: () => void;
};
export const ControlButton = (props: Props) => {
  const iconClass =
    'w-full transition-colors text-gray-200 hover:text-violet-300 ';

  const renderIcon = () => {
    const Icon = props.icon;
    return <Icon class={iconClass} />;
  };
  return (
    <button
      class={`p-2 aspect-square text-violet-700 w-12 ${props.class}`}
      onClick={props.onClick}
    >
      {renderIcon()}
    </button>
  );
};
