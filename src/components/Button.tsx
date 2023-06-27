import { Loader } from '@components';
import { Component, mergeProps } from 'solid-js';

interface IButtonProps {
  title?: string;
  class?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: Component<IButtonProps> = (_props) => {
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

  return (
    <button
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

export default Button;