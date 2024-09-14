import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BlockfrostProvider, resolvePlutusScriptAddress, } from '@meshsdk/core';
import dataScript from '../components/data/plutus.json';
import cbor from 'cbor';
interface MarketContextType {
    marketCredits: any[]; 
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider = ({ children }: { children: ReactNode }) => {
    const [marketCredits, setMarketCredits] = useState<any[]>([]); 
    function subtractStrings(s: string, t: string): string {
        if (s.includes(t)) {
            return s.replace(t, '');
        }
        return s;
    }
    
    async function getCarbonCredits() {
      const blockchainProvider = new BlockfrostProvider(
        'previewGIAPfLo3R0N2P9ooq4FMsravbuLiSUGF'
      );
  
      const script = {
        code: cbor
           .encode(Buffer.from(dataScript.validators[0].compiledCode, "hex")).toString("hex")
          .toString("hex"),
        version: "V3",
      }
  
      const addr = resolvePlutusScriptAddress(script, 0)
      const data = await blockchainProvider.fetchAddressUTxOs(addr);
      
        const size = data.length;
        const credits = [];
        for(let i=0; i<size; i++){
            const txhash = data[i].input.txHash;
            const response = await blockchainProvider.fetchUTxOs(txhash);
            const asset = await blockchainProvider.fetchAssetMetadata(response[1].output.amount[1].unit);
            const utf8Buffer = Buffer.from(asset.name, 'utf8');
            const hexString = utf8Buffer.toString('hex');

            const credit = {
                title: asset.name,
                ownerAddress : response[1].output.address,
                quantity : data[i].output.amount[1].quantity,
                unit : response[1].output.amount[1].unit,
                policyId :  subtractStrings(response[1].output.amount[1].unit, hexString),
                assetName : hexString,
                assetUTxO :data[i],
                image: asset.image,
                script: script,

            }
            credits.push(credit);
        }
        setMarketCredits(credits); 
    }
    useEffect(()=>{
        getCarbonCredits();
    },[]);
  return (
    <MarketContext.Provider value={{marketCredits}}> 
      {children}
    </MarketContext.Provider>
  );
};

export const useMarketContext = () => {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error('useMarketContext must be used within a WalletProvider');
  }
  return context;
};