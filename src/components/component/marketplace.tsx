import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import React, { use, useEffect, useState} from "react"
import { BlockfrostProvider } from '@meshsdk/core';
import Link from "next/link";
import { useRouter } from "next/router";
import { useWalletContext } from "~/context/WalletContext";

export function Marketplace() {
  const [marketCredits, setMarketCredits] = useState([]);
  const [userAddress, setUserAddress] = useState("");
  const {connected, wallet, address} = useWalletContext();
  const router = useRouter();

  function handleClick(connected, ownerAddress, Credit){
    if(connected && ownerAddress === address){
      router.push(`refund//detail/${Credit.unit + Credit.ownerAddress}`);
    }else{
      router.push(`buy/detail/${Credit.unit + Credit.ownerAddress}`);
    }
  }

  useEffect(() => {
    async function getAddress() {
      if (connected) {
        const data = await wallet.getChangeAddress();
        setUserAddress(data);
      }
    };
    getAddress();
  }, [connected]);

  async function getCarbonCredits(){
    const blockchainProvider = new BlockfrostProvider(
      'previewGIAPfLo3R0N2P9ooq4FMsravbuLiSUGF'
    );
    const data = await blockchainProvider.fetchAddressUTxOs(
      'addr_test1wq2n0jl85n3yd9394864vfl837akstgwssu4tp8axekkuuqgretta'
    );
    const size = data.length;
    const credits = [];
    for(let i = 0; i<size; i++){
      const txhash = data[i].input.txHash;
      const response = await blockchainProvider.fetchUTxOs(txhash);
      const asset = await blockchainProvider.fetchAssetMetadata(response[1].output.amount[1].unit);
      const credit = {
        title: asset.name, 
        description: asset.description, 
        price: asset.price, // Giả sử asset.price là giá của asset 
        quantity: data[i].output.amount[1].quantity,
        unit: response[1].output.amount[1].unit,
        ownerAddress: response[1].output.address,
      }
      credits.push(credit);
    }
    setMarketCredits(credits); 
  } 

  // Cập nhật marketCredits khi connected hoặc userAddress thay đổi
  useEffect(()=>{
    getCarbonCredits();
  },[connected, userAddress]); 

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Available Carbon Credits</h1>
        <div className="grid gap-4 md:grid-cols-3">
        {marketCredits.map((Credit,index)=>(
          <div key={index}>
           <Card className="shadow-md h-full grid grid-rows-1">
            <CardHeader>
              <CardTitle>{Credit.title}</CardTitle>
              <CardDescription>{Credit.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{"$"+Credit.price}</div>
              <div className="text-sm text-muted-foreground">{Credit.quantity+ "available"}</div>
            </CardContent>
            <CardFooter className="flex justify-center">
            <Button 
                onClick={() => handleClick(connected , Credit.ownerAddress, Credit)}
                className="w-full bg-green-700 text-white hover:underline">
                { (connected && Credit.ownerAddress === address) ? "Refund" : "Buy" }
          </Button>
            </CardFooter>
            </Card>   
          </div>
        ))}
        
      </div>
      </main>
    </div>
  )
}