import { Auth } from '@contexts';
import { useNavigate } from '@solidjs/router';
import { Sidebar, Navbar, Loader } from '@components';
import { Component, createEffect, createSignal, useContext } from 'solid-js';

interface AuthLayoutProps {
  children: any;
  onFinish?: () => void;
}

const AuthLayout: Component<AuthLayoutProps> = (props: any) => {
  const navigate = useNavigate();
  const context = useContext(Auth.Context);
  const contentLoading = context.loading();
  const [open, setOpen] = createSignal(false);
  const [pageLoading, setPageLoading] = createSignal(true);

  const updateOpen = (value: boolean) => {
    setOpen(value);
  };

  // eslint-disable-next-line solid/reactivity
  createEffect(async () => {
    const isUserLoggedIn = context.token();

    if (!isUserLoggedIn) {
      navigate('/login');
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
    <div class="flex h-screen bg-gray-200 font-sans">
      <Sidebar open={open()} setOpen={updateOpen}   />
      <div class="flex-1 flex flex-col overflow-hidden">
        <Navbar setOpen={updateOpen} />
        {contentLoading || pageLoading() ? (
          <div class='h-screen'>
            <div class='justify-center items-center h-full'>
              <Loader title={'Please Wait'} />
            </div>
          </div>
        ) : (
          <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
            <div class="p-4">
              {props.children}
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;