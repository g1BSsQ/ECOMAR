import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useWallet } from '@meshsdk/react';
import { BlockfrostProvider } from '@meshsdk/core';

// Cập nhật WalletContextType cho phù hợp với useWallet
interface WalletContextType {
  name: string;
  connecting: boolean;
  connected: boolean;
  wallet: any;
  connect: (walletName: string, extensions?: number[]) => Promise<void>;
  disconnect: () => void;
  error: unknown;
  metadata: any; // Thay đổi kiểu dữ liệu metadata
  getMetadata: () => Promise<void>; // Thêm hàm getMetadata
  address: string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const blockchainProvider = new BlockfrostProvider(
    'previewGIAPfLo3R0N2P9ooq4FMsravbuLiSUGF'
  );
  // Sử dụng useWallet để lấy dữ liệu
  const { name, connecting, connected, wallet, connect, disconnect, error ,} = useWallet(); 
  const [metadata, setMetadata] = useState<any>(null);
  const [address, setAddress] = useState('');
  async function getMetadata() {
    if(connected){
      const fetchedMetadata = [];
      const _assets = await wallet.getAssets();
      const data = await wallet.getChangeAddress();
      console.log(data);
      setAddress(data);
      for(let i =0; i<_assets.length; i++){
        const asset = await blockchainProvider.fetchAssetMetadata(_assets[i].unit);
        const credit = {
          isCredit: asset.isCredit,  
          title : asset.name,
          description : asset.description,
          quantity : _assets[i].quantity,
          unit: _assets[i].unit,
          image : asset.image,
          policyId: _assets[i].policyId,
          assetName: _assets[i].assetName, 
        }
        if(credit.isCredit == "1"){
          fetchedMetadata.push(credit);
        }
      }
      setMetadata(fetchedMetadata);
    }
  }
  useEffect(()=>{
    getMetadata();
  },[wallet]);
  return (
    <WalletContext.Provider value={{ name, connecting, connected, wallet, connect, disconnect, error, metadata, getMetadata, blockchainProvider,address }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};