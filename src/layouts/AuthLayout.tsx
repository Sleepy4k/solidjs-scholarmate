import { Auth } from '@contexts';
import { Println } from '@utils';
import { useNavigate } from '@solidjs/router';
import { Sidebar, Navbar, Loader } from '@components';
import { Component, createEffect, createSignal, useContext, mergeProps } from 'solid-js';

interface AuthLayoutProps {
  children: any;
  canAccess?: string;
  onFinish?: () => void;
}

const AuthLayout: Component<AuthLayoutProps> = (_props: any) => {
  const navigate = useNavigate();
  const context = useContext<Auth.IAuthContext>(Auth.Context);
  const contentLoading = context.loading();
  const [open, setOpen] = createSignal<boolean>(false);
  const [pageLoading, setPageLoading] = createSignal<boolean>(true);

  const props = mergeProps({
    canAccess: 'any',
    onFinish: () => {}
  }, _props);

  const updateOpen = (value: boolean) => {
    setOpen(value);
  };

  // eslint-disable-next-line solid/reactivity
  createEffect(async () => {
    const userRole = context.user();
    const isUserLoggedIn = context.token();

    if (!isUserLoggedIn) {
      navigate('/login');
    } else {
      if (userRole === null) {
        navigate('/login');
      } else {
        if (props.canAccess === 'any' || (props.canAccess === 'user' && userRole !== 'admin') || (props.canAccess === 'admin' && userRole !== 'user')) {
          if (props.onFinish) {
            await props.onFinish();
          }
        } else {
          Println('Dashboard', 'You are not allowed to access this page', 'error');
          navigate('/');
        } 
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