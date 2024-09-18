import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BlockfrostProvider} from '@meshsdk/core';
import axios from 'axios';
interface MarketContextType {
    marketCredits: any[]; 
    setMarketCredits: (marketCredits: any[]) => void;
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
    
    
    interface DatumResponse {
      hash: string;
      datum: string;
    }
    
  
  const blockfrostApiKey = 'previewGIAPfLo3R0N2P9ooq4FMsravbuLiSUGF'; // Thay thế bằng API key của bạn
  const baseUrl = 'https://cardano-preview.blockfrost.io/api/v0';
  
  async function getDatumByHash(datumHash: string): Promise<DatumResponse> {
    try {
      const response = await axios.get(`${baseUrl}/scripts/datum/${datumHash}`, {
        headers: {
          project_id: blockfrostApiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy datum:', error);
      throw error; 
    }
  }
  

    async function getCarbonCredits() {
      const blockchainProvider = new BlockfrostProvider(
        blockfrostApiKey
      );   
  
      const data = await blockchainProvider.fetchAddressUTxOs("addr_test1wzgzy45su6jzj67zthwrgwddgxem0zyqu9yz4w8kg7du8dc9acfsj");
        console.log(data);
        const size = data.length;
        const credits = [];
        for(let i=0; i<size; i++){
            const txhash = data[i].input.txHash;
            console.log(getDatumByHash(data[i].output.dataHash as string));
            const jsonObj = await getDatumByHash(data[i].output.dataHash as string);
            console.log(jsonObj.json_value.fields[1].int);
            const response = await blockchainProvider.fetchUTxOs(txhash);

            console.log(22222);
            console.log(response);
            const asset = await blockchainProvider.fetchAssetMetadata(response[0].output.amount[1].unit);
            const utf8Buffer = Buffer.from(asset.name, 'utf8');
            const hexString = utf8Buffer.toString('hex');

            const credit = {
                title: asset.name,
                ownerAddress : response[1].output.address,
                quantity : data[i].output.amount[1].quantity,
                unit : response[0].output.amount[1].unit,
                policyId :  subtractStrings(response[0].output.amount[1].unit, hexString),
                assetName : hexString,
                image: asset.image,
                txhash: txhash,
                description: asset.description,
                price: jsonObj.json_value.fields[1].int,
            }
            credits.push(credit);
        }
        setMarketCredits(credits); 
    }
    useEffect(()=>{
        getCarbonCredits();
    },[]);
  return (
    <MarketContext.Provider value={{marketCredits, setMarketCredits}}> 
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