import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useWallet } from '@meshsdk/react';
import { BlockfrostProvider, policyId } from '@meshsdk/core';
import { title } from 'process';

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
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const blockchainProvider = new BlockfrostProvider(
    'previewGIAPfLo3R0N2P9ooq4FMsravbuLiSUGF'
  );
  // Sử dụng useWallet để lấy dữ liệu
  const { name, connecting, connected, wallet, connect, disconnect, error ,} = useWallet(); 
  const [metadata, setMetadata] = useState<any>(null);
  async function getMetadata() {
    if(connected){
      const fetchedMetadata = [];
      const _assets = await wallet.getAssets();
      for(let i =0; i<_assets.length; i++){
        const asset = await blockchainProvider.fetchAssetMetadata(_assets[i].unit);
        const data = {
          title : asset.name,
          description : asset.description,
          quantity : _assets[i].quantity,
          unit: _assets[i].unit,
          image : asset.image,
          policyId: _assets[i].policyId,
        }
        fetchedMetadata.push(data);
      }
      setMetadata(fetchedMetadata);
    }
  }
  useEffect(()=>{
    getMetadata();
  },[wallet])
  return (
    <WalletContext.Provider value={{ name, connecting, connected, wallet, connect, disconnect, error, metadata, getMetadata }}>
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