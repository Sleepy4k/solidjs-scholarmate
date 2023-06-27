import { Loader } from '@components';
import { checkCookie } from '@utils';
import { useNavigate } from '@solidjs/router';
import { Component, createEffect, createSignal } from 'solid-js';

interface GuestLayoutProps {
  children: any;
  onFinish?: () => void;
}

const GuestLayout: Component<GuestLayoutProps> = (props: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal(true);

  // eslint-disable-next-line solid/reactivity
  createEffect(async () => {
    const isUserLoggedIn = checkCookie('scholarmate_auth_token');

    if (isUserLoggedIn) {
      navigate('/');
    } else {
      if (props.onFinish) {
        await props.onFinish();
      }
    }
    
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  return (
    <>
      {loading() ? (
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