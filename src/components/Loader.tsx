import { Component, mergeProps } from 'solid-js';

interface ILoaderProps {
  size?: string;
  title?: string;
}

const Loader: Component<ILoaderProps> = (_props) => {
  const props = mergeProps({ title: '' }, _props);

  return (
    <div class='flex justify-center items-center h-full'>
      <div
        class={`inline-block ${props.size ? `h-${props.size} w-${props.size}` : 'h-16 w-16'} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      >
        <span
          class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >
          {props.title}
        </span>
      </div>
    </div>
  );
};

export default Loader;