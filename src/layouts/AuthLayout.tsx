import { checkCookie } from '@utils';
import { useNavigate } from '@solidjs/router';
import { Sidebar, Navbar, Loader } from '@components';
import { Component, createEffect, createSignal } from 'solid-js';

interface AuthLayoutProps {
  children: any;
  onFinish?: () => void;
}

const AuthLayout: Component<AuthLayoutProps> = (props: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = createSignal(false);
  const [loading, setLoading] = createSignal(true);

  const updateOpen = (value: boolean) => {
    setOpen(value);
  };

  // eslint-disable-next-line solid/reactivity
  createEffect(async () => {
    const isUserLoggedIn = checkCookie('scholarmate_auth_token');

    if (!isUserLoggedIn) {
      navigate('/login');
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
      {loading() ? <Loader title={'Please Wait'} /> : (
        <div class="flex h-screen bg-gray-200 font-sans">
          <Sidebar open={open()} setOpen={updateOpen}   />
          <div class="flex-1 flex flex-col overflow-hidden">
            <Navbar setOpen={updateOpen} />
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
              <div class="p-4">
                {props.children}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthLayout;