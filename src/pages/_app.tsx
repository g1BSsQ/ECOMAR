import '../styles/globals.css';
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import { Header } from "~/components/component/header";
import { ChakraProvider } from "@chakra-ui/react";
<<<<<<< HEAD
import { Wallet } from "lucide-react";
import { WalletProvider } from '../context/WalletContext'; // Import WalletProvider
=======
import { WalletProvider } from "../context/WalletContext"; // Import WalletProvider

>>>>>>> da2b6f82d734293a4c38ea2874f1fef9e0239dc7
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
<<<<<<< HEAD
      <WalletProvider>
      <ChakraProvider
       toastOptions={{
        defaultOptions: {
          position: "top-right",
          variant: "left-accent",
          isClosable: true,
          duration: 10_000
        }
      }}>
      <header className="bg-[#1e8449] text-primary-foreground py-4 px-6 flex Credits-center justify-between">
          <Header></Header>
      </header>
      <Component {...pageProps} />
      </ChakraProvider>
=======
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
>>>>>>> da2b6f82d734293a4c38ea2874f1fef9e0239dc7
      </WalletProvider>
    </MeshProvider>
  );
}

export default MyApp;