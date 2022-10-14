import { Router } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/route-loader/loader";
import { CoffeeStoreProvider } from "../contexts/coffee-store-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [routeLoading, setRouteLoading] = useState(false);

  const routeStartHandler = () => {
    setRouteLoading(true);
  };
  const routeCompleteHandler = () => {
    setRouteLoading(false);
  };
  const routeErrorHandler = () => {
    setRouteLoading(false);
  };

  useEffect(() => {
    Router.events.on("routeChangeStart", routeStartHandler);
    Router.events.on("routeChangeComplete", routeCompleteHandler);
    Router.events.on("routeChangeError", routeErrorHandler);

    return () => {
      Router.events.off("routeChangeStart", routeStartHandler);
      Router.events.off("routeChangeComplete", routeCompleteHandler);
      Router.events.off("routeChangeError", routeErrorHandler);
    };
  }, []);

  return (
    <div className="my-app">
      <Loader loading={routeLoading} />
      <CoffeeStoreProvider>
        <Component {...pageProps} />
      </CoffeeStoreProvider>
    </div>
  );
}

export default MyApp;
