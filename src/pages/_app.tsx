import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import { Header } from "~/components/component/header";

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <MeshProvider>
      <header className="bg-[#1e8449] text-primary-foreground py-4 px-6 flex items-center justify-between">
          <Header></Header>
      </header>
      <Component {...pageProps} />
    </MeshProvider>

  );
}

export default MyApp;