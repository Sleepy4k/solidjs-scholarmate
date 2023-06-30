import { createFormControl, IFormControl } from 'solid-forms';
import { Show, mergeProps, Component, For, createEffect, createSignal } from 'solid-js';

interface ITextInputProps {
  name: string;
  type: string;
  label: string;
  class?: string;
  disabled?: boolean;
  placeholder?: string;
  control?: IFormControl<string>;
}

const TextInput: Component<ITextInputProps> = (_props) => {
  const [inputId, setInputId] = createSignal<string>('textinput-component-123');
  const props = mergeProps({
    class: '',
    disabled: false,
    placeholder: '',
    control: createFormControl('')
  }, _props);

  createEffect(() => {
    const RandomNumber = Math.floor(Math.random() * 1000);
    setInputId(`textinput-component-${RandomNumber}`);
  });

  return (
    <div
      classList={{
        'is-invalid': !!props.control.errors,
        'is-touched': props.control.isTouched,
        'is-required': props.control.isRequired,
        'is-disabled': props.control.isDisabled,
      }}
    >
      <label for={inputId()}>{props.label}</label>
      <input
        id={inputId()}
        name={props.name}
        type={props.type}
        class={props.class}
        disabled={props.disabled}
        value={props.control.value}
        placeholder={props.placeholder}
        required={props.control.isRequired}
        onBlur={() => props.control.markTouched(true)}
        onInput={(e) => {
          props.control.setValue(e.currentTarget.value);
        }}
      />

      <Show when={props.control.isTouched && !!props.control.errors}>
        <For each={Object.values(props.control.errors || {})}>
          {(errorMsg, index) => (
            <>
              {index() > 0 && <br />}
              <small class='text-red-500'>{`${props.label} ${errorMsg}`}</small>
            </>
          )}
        </For>
      </Show>
    </div>
  );
};

export default TextInput;