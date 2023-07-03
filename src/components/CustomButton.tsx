import { Loader } from '@components';
import { Component, mergeProps, createEffect, createSignal } from 'solid-js';

interface ICustomButtonProps {
  title?: string;
  class?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const CustomButton: Component<ICustomButtonProps> = (_props) => {
  const [id, setId] = createSignal<string>('button-component-123');
  const props = mergeProps({
    title: '',
    class: '',
    disabled: false,
    onClick: () => {}
  }, _props);

  const handleClicked = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  createEffect(() => {
    const RandomNumber = Math.floor(Math.random() * 1000);
    setId(`button-component-${RandomNumber}`);
  });

  return (
    <button
      id={id()}
      type='submit'
      class={props.class}
      data-mdb-ripple='true'
      onClick={handleClicked}
      disabled={props.disabled}
      data-mdb-ripple-color='light'
    >
      {props.disabled ? <Loader size='4' /> : props.title}
    </button>
  );
};

export default CustomButton;