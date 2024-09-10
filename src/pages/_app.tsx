import '../styles/globals.css';
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import { Header } from "~/components/component/header";
import { ChakraProvider } from "@chakra-ui/react";
import { WalletProvider } from "../context/WalletContext"; // Import WalletProvider

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <WalletProvider> 
        <ChakraProvider
          toastOptions={{
            defaultOptions: {
              position: "top-right",
              variant: "left-accent",
              isClosable: true,
              duration: 10_000,
            },
          }}
        >
          <header className="bg-[#1e8449] text-primary-foreground py-4 px-6 flex items-center justify-between">
            <Header></Header>
          </header>
          <Component {...pageProps} />
        </ChakraProvider>
      </WalletProvider>
    </MeshProvider>
  );
}

export default MyApp;