import { Icons } from "./Icons";
import { Dynamic } from "solid-js/web";
import { Component, createSignal, Show } from "solid-js";

const Header: Component<any> = (props) => {
  const menu: any = "MENU"
  const [openMatMenu, setOpenMatMenu] = createSignal(false);

  return (
    <>
      <header class="flex items-center justify-between px-6 py-2 bg-white border-b border-dark-purple drop-shadow-md">
        <div class="flex items-center">
          <button class="text-gray-500 focus:outline-none cursor-pointer lg:hidden" onClick={() => props.setOpen(true)}>
            <Dynamic component={Icons[menu]} />
          </button>
        </div>

        <div class="flex items-center">
          <div class="relative">
            <button class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none" onClick={() => setOpenMatMenu(!openMatMenu())}>
              <img
                class="object-cover w-full h-full"
                src="./src/assets/logo.png"
                alt="Your avatar"
              />
            </button>
            <Show when={openMatMenu() == true}>
              <div class="fixed inset-0 z-10 w-full h-screen" onClick={() => setOpenMatMenu(!openMatMenu())}></div>
            </Show>

            <div>
                <Show when={openMatMenu() == true} fallback={<></>}>
                <div class="transition delay-100 duration-700 ease-in-out absolute right-0 z-20 w-48 py-2 bg-white rounded-b-lg shadow-xl">
                  <a
                    href="#"
                    class="block px-4 py-2   border-t  text-sm text-dark-purple hover:bg-dark-purple hover:text-white">Profile</a>
                  <a href="#"
                    class="block border-t px-4 py-2 text-sm text-dark-purple hover:bg-dark-purple hover:text-white">Log out</a>                    
                </div>
              </Show>
            </div>
          </div>
        </div >
      </header >
    </>
  );
}

export default Header;