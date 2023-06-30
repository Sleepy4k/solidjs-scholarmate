import swal from 'sweetalert';
import { Icons } from './Icons';
import { Auth } from '@contexts';
import { Println } from '@utils';
import { Dynamic } from 'solid-js/web';
import { AuthService } from '@services';
import { useNavigate, A } from '@solidjs/router';
import { Show, Component, createSignal, useContext, lazy } from 'solid-js';

const Loader = lazy(() => import('./Loader'));

interface INavbarProps {
  // eslint-disable-next-line no-unused-vars
  setOpen: (value: boolean) => void;
}

const Navbar: Component<INavbarProps> = (props) => {
  const burgerIcon: any = 'Menu';
  const navigate = useNavigate();
  const context = useContext(Auth.Context);
  const user = context.user();
  const [openMatMenu, setOpenMatMenu] = createSignal(false);

  const onLogout = () => {
    swal({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      buttons: ['Cancel', 'Logout'],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        AuthService.post({
          url: 'logout',
          token: context.token(),
          success: (res: any) => {
            const value = res.data;

            context.updateData('user', null);
            context.updateData('token', null);
            context.updateData('student', null);
            navigate('/login');
            Println('Dashboard', value.message, 'success');
          },
          error: (err: any) => {
            if (err.response) {
              Println('Dashboard', err.response.data.message, 'error');
            } else {
              Println('Dashboard', err.message, 'error');
            }
          }
        });
      }
    });
  };

  return (
    <header class='flex items-center justify-between px-6 py-2 bg-white border-b border-dark-purple drop-shadow-md h-20'>
      <div class='flex items-center'>
        <button class='text-gray-500 focus:outline-none cursor-pointer lg:hidden' onClick={() => props.setOpen(true)}>
          <Dynamic component={Icons[burgerIcon]} />
        </button>
      </div>
      <div class='flex items-center'>
        <h1 class='m-5'>{user?.email ? user.email : <Loader size='8' />}</h1>
        <div class='relative'>
          <button class='relative z-10 block w-16 h-16 overflow-hidden rounded-full shadow focus:outline-none border-4 border-blue-400' onClick={() => setOpenMatMenu(!openMatMenu())}>
            <img
              class='object-cover w-full h-full'
              src='./src/assets/profile.jpg'
              alt='Avatar'
            />
          </button>
          <Show when={openMatMenu() == true}>
            <div class='fixed inset-0 z-10 w-full h-screen' onClick={() => setOpenMatMenu(!openMatMenu())} />
          </Show>
          <div>
            <Show when={openMatMenu() == true} fallback={<></>}>
              <div class='transition delay-100 duration-700 ease-in-out absolute right-0 z-20 w-48 py-2 bg-white rounded-b-lg shadow-xl'>
                <A
                  href='#'
                  onclick={onLogout}
                  class='block border-t px-4 py-2 text-sm text-dark-purple hover:bg-dark-purple hover:text-white'
                >Log out</A>                    
              </div>
            </Show>
          </div>
        </div>
      </div >
    </header >
  );
};

export default Navbar;