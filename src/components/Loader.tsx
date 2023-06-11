import { Component, createSignal, createEffect } from "solid-js";

const Loader: Component<{ title: string }> = (props) => {
  const [loading, setLoading] = createSignal(true);

  createEffect(() => {
    setLoading(false);
  });

  return (
    <>
      {loading() ? (
        <div id="spinner" class="show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
          <div class='spinner-border text-primary h-12 w-12'>
            <span class="sr-only">{props.title}</span>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Loader;