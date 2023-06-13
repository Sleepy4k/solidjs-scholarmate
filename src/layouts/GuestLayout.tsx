import { Toaster } from "solid-toast";
import { Loader } from "../components";
import { useNavigate } from "@solidjs/router";
import { checkCookie, getStorage } from "../utils";
import { Component, createEffect, createSignal } from "solid-js";

const GuestLayout: Component<{ children: any, onFinish: () => void }> = (props: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal(true);

  createEffect(async () => {
    const user = getStorage("user");
    const isUserLoggedIn = checkCookie("schoolarship_auth_token");

    if (isUserLoggedIn || user) {
      navigate("/");
    } else {
      setLoading(false);
      await props.onFinish()
    }
  });

  return (
    <>
      {loading() ? <Loader title={"Loading ..."} /> : (
        <div class="container-fluid position-relative d-flex p-0">
          {props.children}
          <Toaster />
        </div>
      )}
    </>
  )
}

export default GuestLayout;