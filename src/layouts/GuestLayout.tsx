import { Loader } from "../components";
import { checkCookie } from "../utils";
import { useNavigate } from "@solidjs/router";
import { Component, createEffect, createSignal } from "solid-js";

const GuestLayout: Component<{ children: any, onFinish: () => void }> = (props: any) => {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal(true);

  createEffect(async () => {
    const isUserLoggedIn = checkCookie("scholarmate_auth_token");

    if (isUserLoggedIn) {
      navigate("/");
    } else {
      setLoading(false);
      await props.onFinish()
    }
  });

  return (
    <>
      {loading() ? <Loader title={"Loading"} /> : (
        <div class="container-fluid position-relative d-flex p-0">
          {props.children}
        </div>
      )}
    </>
  )
}

export default GuestLayout;