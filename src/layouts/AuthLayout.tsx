import { checkCookie } from "../utils";
import { useNavigate } from "@solidjs/router";
import { Sidebar, Navbar, Loader } from "../components";
import { Component, createEffect, createSignal } from "solid-js";

const AuthLayout: Component<{ children: any, onFinish: () => void }> = (props: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = createSignal(false);
  const [loading, setLoading] = createSignal(true);

  createEffect(async () => {
    const isUserLoggedIn = checkCookie("scholarmate_auth_token");

    if (!isUserLoggedIn) {
      navigate("/login");
    } else {
      setLoading(false);
      await props.onFinish()
    }
  });

  return (
    <>
      {loading() ? <Loader title={"Loading"} /> : (
        <div class="flex h-screen bg-gray-200 font-sans">
          <Sidebar open={open} setOpen={setOpen}   />
          <div class="flex-1 flex flex-col overflow-hidden">
            <Navbar open={open} setOpen={setOpen} />
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
              <div class="p-4">
                {props.children}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  )
}

export default AuthLayout;