import swal from "sweetalert";
import { Icons } from "./Icons";
import { Api } from "../services";
import { Dynamic } from "solid-js/web";
import { useNavigate, A } from "@solidjs/router";
import { Component, createSignal, Show } from "solid-js";
import { Println, deleteStorage, getStorage } from "../utils";

const Navbar: Component<any> = (props) => {
  const menu: any = "Menu"
  const navigate = useNavigate()
  const user = getStorage("user")
  const [openMatMenu, setOpenMatMenu] = createSignal(false);

  const onLogout = () => {
    swal({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      buttons: ["Cancel", "Logout"],
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        Api.post("/logout")
        .then((res) => {
          const value = res.data;
  
          if (value.status === "success") {
            deleteStorage("user");
            deleteStorage("student");
            navigate("/login");
            Println("Dashboard", value.message, "success");
          } else if (value.status === "failed") {
            Println("Dashboard", value.message, "error");
          } else {
            Println("Dashboard", "Something went wrong!", "error");
          }
        })
        .catch((err) => {
          if (err.response) {
            Println("Students", err.response.data.message, "error")
          } else {
            Println("Students", err.message, "error")
          }
        });
      }
    });
  }

  return (
    <header class="flex items-center justify-between px-6 py-2 bg-white border-b border-dark-purple drop-shadow-md h-20">
      <div class="flex items-center">
        <button class="text-gray-500 focus:outline-none cursor-pointer lg:hidden" onClick={() => props.setOpen(true)}>
          <Dynamic component={Icons[menu]} />
        </button>
      </div>
      <div class="flex items-center">
        <h1 class="m-5">{user.email}</h1>
        <div class="relative">
          <button class="relative z-10 block w-16 h-16 overflow-hidden rounded-full shadow focus:outline-none border-4 border-blue-400" onClick={() => setOpenMatMenu(!openMatMenu())}>
            <img
              class="object-cover w-full h-full"
              src="./src/assets/profile.jpg"
              alt="Your avatar"
            />
          </button>
          <Show when={openMatMenu() == true}>
            <div class="fixed inset-0 z-10 w-full h-screen" onClick={() => setOpenMatMenu(!openMatMenu())}></div>
          </Show>
          <div>
            <Show when={openMatMenu() == true} fallback={<></>}>
              <div class="transition delay-100 duration-700 ease-in-out absolute right-0 z-20 w-48 py-2 bg-white rounded-b-lg shadow-xl">
                <A
                  href="#"
                  onclick={onLogout}
                  class="block border-t px-4 py-2 text-sm text-dark-purple hover:bg-dark-purple hover:text-white"
                >Log out</A>                    
              </div>
            </Show>
          </div>
        </div>
      </div >
    </header >
  );
}

export default Navbar;