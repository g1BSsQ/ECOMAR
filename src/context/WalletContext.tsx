import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useWallet } from '@meshsdk/react';

// Cập nhật WalletContextType cho phù hợp với useWallet
interface WalletContextType {
  name: string;
  connecting: boolean;
  connected: boolean;
  wallet: any;
  connect: (walletName: string, extensions?: number[]) => Promise<void>;
  disconnect: () => void;
  error: unknown;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  // Sử dụng useWallet để lấy dữ liệu
  const { name, connecting, connected, wallet, connect, disconnect, error } = useWallet(); 

  return (
    <WalletContext.Provider value={{ name, connecting, connected, wallet, connect, disconnect, error }}>
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