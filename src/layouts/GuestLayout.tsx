import { Toaster } from "solid-toast";
import { checkCookie } from "../utils";
import { useNavigate } from "@solidjs/router";
import { Component, createEffect, createSignal } from "solid-js";

const GuestLayout: Component<{ children: any, onFinish: () => void }> = (props: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal(true);

  createEffect(async () => {
    const isUserLoggedIn = checkCookie("schoolarship_auth_token");

    if (isUserLoggedIn) {
      navigate("/");
    } else {
      setLoading(false);
      await props.onFinish()
    }
  });

  return (
    <>
      {loading() ? null : (
        <div class="container-fluid position-relative d-flex p-0">
          {props.children}
          <Toaster />
        </div>
      )}
    </>
  )
}

export default GuestLayout;