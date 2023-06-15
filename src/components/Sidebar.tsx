
import { Icons } from "./Icons";
import { getStorage } from "../utils";
import { Dynamic } from "solid-js/web";
import { SidebarMenu } from "../consts";
import { createStore } from "solid-js/store";
import { Component, For, Show } from "solid-js";
import { A, useLocation } from "@solidjs/router";

const APP_NAME = import.meta.env.VITE_APP_NAME as string;

const Sidebar: Component<any> = (props) => {
  const location = useLocation();
  const user = getStorage("user");
  const [menus, setMenus] = createStore({ Menus: SidebarMenu });

  return (
    <div class="flex">
      <div class={`${props.open() == true ? 'block' : 'hidden'} fixed inset-0 z-20 transition-opacity bg-dark-purple opacity-50 lg:hidden`}  onClick={() => props.setOpen(false)}></div>
      <div class={`${props.open() == true ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'} drop-shadow-md  fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-dark-purple lg:translate-x-0 lg:static lg:inset-0`}>
        <div class="flex items-center justify-center mt-2 border-b pb-2">
          <img src="./src/assets/logo.png" class={`cursor-pointer duration-500 w-8 ${props.open() && 'rotate-[360deg]'}`} />
          <span class="mx-2 text-[22px] font-semibold text-white">{APP_NAME}</span>
        </div>
        <nav class="mt-2 pl-2 pr-2">
          <For each={menus.Menus}>{(menu, index) =>
            <>
              {menu.role === 'any' || menu.role === user.role ? (
                <Show when={menu.Type == 'MENU'} fallback={<div class={`border-dashed border-light-white border origin-left duration-200 mt-4 mb-4`}></div>}>
                  <A href={menu.link}>
                    <div class={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2  ${location.pathname == menu.link && 'bg-light-white'}`}>
                      <Dynamic component={Icons[menu.Icon]} /><span class={`origin-left duration-200`}>  {menu.title}</span>
                    </div>
                  </A>
                </Show>
              ) : <div></div>}
            </>
          }</For>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
