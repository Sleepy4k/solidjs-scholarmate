import { Component } from 'solid-js';

interface LoaderProps {
  title: string;
}

const Loader: Component<LoaderProps> = (props) => {
  return (
    <div class='h-screen'>
      <div class='flex justify-center items-center h-full'>
        <img class='h-16 w-16' src='https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif' alt={props.title} />
        <div>{props.title}</div>
      </div>
    </div>
  );
};

export default Loader;