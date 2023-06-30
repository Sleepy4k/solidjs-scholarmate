import { Component, mergeProps } from 'solid-js';

interface BoxProps {
  title: string;
  value: string;
  smSize?: string;
  xlSize?: string;
}

const Box: Component<BoxProps> = (_props) => {
  const props = mergeProps({
    smSize: '6',
    xlSize: '3',
  }, _props);

  return (
    <div class={`col-span-12 sm:col-span-${props.smSize} xl:col-span-${props.xlSize}`}>
      <div class="flex align-middle py-4 h-20 pl-4 pr-4 items-center rounded-lg  bg-white space-x-4 border shadow-md  dark:bg-gray-500 dark:border-gray-700">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
            {props.title}
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {props.value}
        </div>
      </div>
    </div>
  );
};

export default Box;