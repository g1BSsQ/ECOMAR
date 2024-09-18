import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import React, { useEffect, useState} from "react"
import { useRouter } from "next/router";
import { useWalletContext } from "~/context/WalletContext";
import { useMarketContext } from "~/context/MarketContext";


export function Marketplace() {
  const [marketPlaceCredits, setMarketCredits] = useState<any[]>([]);
  const {connected, address} = useWalletContext();
  const router = useRouter();

  function handleClick(connected:any, ownerAddress:any, Credit:any){
    if(connected && ownerAddress === address){
      router.push(`refund//detail/${Credit.unit + Credit.ownerAddress}`);
    }else{
      router.push(`buy/detail/${Credit.unit + Credit.ownerAddress}`);
    }
  }

  const {marketCredits} = useMarketContext();
  useEffect(()=>{
    setMarketCredits(marketCredits);
  },[marketCredits]);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Available Carbon Credits</h1>
        <div className="grid gap-4 md:grid-cols-3">
        {marketPlaceCredits.map((Credit,index)=>(
          <div key={index}>
           <Card className="shadow-md h-full grid grid-rows-1">
            <CardHeader>
              <CardTitle>{Credit.title}</CardTitle>
              <CardDescription>{Credit.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{Credit.price/1000000 + " ₳"}</div>
              <div className="text-sm text-muted-foreground">{Credit.quantity+ " available"}</div>
            </CardContent>
            <CardFooter className="flex justify-center">
            <Button
                            onClick={() => handleClick(connected, Credit.ownerAddress, Credit)}
                            className={`w-full text-white hover:underline ${connected && Credit.ownerAddress === address ? 'bg-blue-700' : 'bg-green-700'}`}
                        >
                            {connected && Credit.ownerAddress === address ? "Refund" : "Buy"}
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