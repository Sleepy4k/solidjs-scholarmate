import { Toaster } from "solid-toast";
import { checkCookie } from "../utils";
import { useNavigate } from "@solidjs/router";
import { Sidebar, Navbar, Loader } from "../components";
import { Component, createEffect, createSignal } from "solid-js";

const AuthLayout: Component<{ children: any, onFinish: () => void }> = (props: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = createSignal(true);
  const [loading, setLoading] = createSignal(true);

  createEffect(async () => {
    const isUserLoggedIn = checkCookie("schoolarship_auth_token");

    if (!isUserLoggedIn) {
      navigate("/login");
    } else {
      setLoading(false);
      await props.onFinish()
    }
  });

  return (
    <div class="flex h-screen bg-gray-200 font-roboto">
      {loading() ? <Loader title={"Loading"} /> : (
        <>
          <Sidebar open={open} setOpen={setOpen}   />
          <div class="flex-1 flex flex-col overflow-hidden">
            <Navbar open={open} setOpen={setOpen} />

            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
              <div class="p-4">
                {props.children}
              </div>
            </main>
          </div>
          <Toaster />
        </>
      )}
      </div>
  )
}

export default AuthLayout;