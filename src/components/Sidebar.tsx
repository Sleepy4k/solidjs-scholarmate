import { Icons } from './Icons';
import { Auth } from '@contexts';
import { SidebarMenu } from '@consts';
import { Dynamic } from 'solid-js/web';
import { createStore } from 'solid-js/store';
import { A, useLocation } from '@solidjs/router';
import { For, Show, Component, createEffect, useContext } from 'solid-js';

const APP_NAME = import.meta.env.VITE_APP_NAME as string;

interface ISidebarProps {
  open: boolean
  // eslint-disable-next-line no-unused-vars
  setOpen: (value: boolean) => void
}

const Sidebar: Component<ISidebarProps> = (props) => {
  const location = useLocation();
  const context = useContext(Auth.Context);
  const user = context.user();
  const [menus, setMenus] = createStore({
    Menus: []
  });

  createEffect(() => {
    setMenus({
      Menus: SidebarMenu
    });
  });

  return (
    <div class="flex">
      <div class={`${props.open == true ? 'block' : 'hidden'} fixed inset-0 z-20 transition-opacity bg-blue-400 opacity-50 lg:hidden`} onClick={() => props.setOpen(false)} />
      <div class={`${props.open == true ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'} drop-shadow-md  fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0`}>
        <div class='flex items-center justify-center border-b p-5 bg-black'>
          <img src='./src/assets/logo.png' class={`cursor-pointer duration-500 w-8 ${props.open && 'rotate-[360deg]'}`} alt='image' />
          <span class='mx-2 text-[22px] font-semibold text-white'>{APP_NAME}</span>
        </div>
        <nav class='mt-2 pl-2 pr-2'>
          <For each={menus.Menus}>{(menu) =>
            <>
              {menu.role === 'any' || menu.role === user?.role ? (
                <Show when={menu.Type == 'MENU'} fallback={(
                  <div class='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5' >
                    {menu.title ? <p class='text-center font-semibold mx-4 mb-0'>{menu.title}</p> : null}
                  </div>
                )}>
                  <A href={menu.link}>
                    <div class={`text-neutral-700 font-semibold text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-blue-100 rounded-md mt-2 ${location.pathname == menu.link && 'bg-blue-300'}`}>
                      <Dynamic component={Icons[menu.Icon]} />
                      <span class={'origin-left duration-200'}>{menu.title}</span>
                    </div>
                  </A>
                </Show>
              ) : null}
            </>
          }</For>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
