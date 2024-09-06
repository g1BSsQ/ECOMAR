import { useState } from "react";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';

export function ConnectWallet() {
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getAssets() {
    if (wallet) {
      setLoading(true);
      const _assets = await wallet.getAssets();
      setAssets(_assets);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center"> 
      <div className="mb-4"> 
        <CardanoWallet />
      </div>
      {connected && (
        <>
          <h1 className="text-xl font-bold mb-4">Get Wallet Assets</h1>
          {assets ? (
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60"> 
              <code className="language-js">
                {JSON.stringify(assets, null, 2)}
              </code>
            </pre>
          ) : (
            <>
            <button
              type="button"
              onClick={() => getAssets()}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            >
              Get Wallet Assets
            </button>
            </>
          )}
        </>
      )}
    </div>
  );
};