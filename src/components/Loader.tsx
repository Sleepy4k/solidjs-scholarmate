import { Component, mergeProps, createSignal, createEffect } from 'solid-js';

interface ILoaderProps {
  size?: string;
  title?: string;
}

const Loader: Component<ILoaderProps> = (_props) => {
  const [classes, setClasses] = createSignal<string>('h-16 w-16');
  const props = mergeProps({ title: '' }, _props);

  createEffect(() => {
    if (props.size) {
      setClasses(`h-${props.size} w-${props.size}`);
    }
  });

  return (
    <div class='flex justify-center items-center h-full'>
      <img class={classes()} src='https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif' alt={props.title} />
      <div>{props.title}</div>
    </div>
  );
};

export default Loader;