import { MeshMarketplaceContract } from "@meshsdk/contract";
import { BlockfrostProvider, MeshTxBuilder } from "@meshsdk/core";  
import { createContext, ReactNode, useContext } from "react";
import { useWalletContext } from "./WalletContext";

interface ContractContextType {
    contract : any;
}
const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider = ({ children }: { children: ReactNode }) => {
    const blockchainProvider = new BlockfrostProvider('previewGIAPfLo3R0N2P9ooq4FMsravbuLiSUGF');
    const meshTxBuilder = new MeshTxBuilder({
      fetcher: blockchainProvider,
      submitter: blockchainProvider,
    });
    const {wallet} = useWalletContext(); 
    const contract = new MeshMarketplaceContract(
      {
        mesh: meshTxBuilder,
        fetcher: blockchainProvider,
        wallet: wallet,
        networkId: 0,
      },
      'addr_test1qqtw7yae4ppt6fymg3xfwupf2rm8pc288722fm74q3t3l3ykh33g35mz823z82af33xr82r6jxk09vgkccsggg3etnyqrl7t0n',
       200, 
    );
    return (
        <ContractContext.Provider value={{ contract }}>
            {children}
        </ContractContext.Provider>
    );
}
export const useContractContext = () => {
    const context = useContext(ContractContext);
    if (context === undefined) {
        throw new Error('useContractContext must be used within a ContractProvider');
    }
    return context;
}