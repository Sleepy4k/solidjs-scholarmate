import { Auth } from '@contexts';
import { Loader } from '@components';
import { useNavigate } from '@solidjs/router';
import { Component, createEffect, createSignal, useContext } from 'solid-js';

interface GuestLayoutProps {
  children: any;
  onFinish?: () => void;
}

const GuestLayout: Component<GuestLayoutProps> = (props: any) => {
  const navigate = useNavigate();
  const context = useContext(Auth.Context);
  const contentLoading = context.loading();
  const [pageLoading, setPageLoading] = createSignal(true);

  // eslint-disable-next-line solid/reactivity
  createEffect(async () => {
    const isUserLoggedIn = context.token();

    if (isUserLoggedIn) {
      navigate('/');
    } else {
      if (props.onFinish) {
        await props.onFinish();
      }
    }

    setTimeout(() => {
      setPageLoading(false);
    }, 150);
  });

  return (
    <>
      {contentLoading || pageLoading() ? (
        <div class='h-screen'>
          <div class='flex justify-center items-center h-full'>
            <Loader title={'Please Wait'} />
          </div>
        </div>
      ) : (
        <div class="container-fluid position-relative d-flex p-0">
          {props.children}
        </div>
      )}
    </>
  );
};

export default GuestLayout;