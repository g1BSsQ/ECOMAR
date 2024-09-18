import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"
import { Label } from "../ui/label"
import { JSX, SVGProps, useEffect, useState } from "react"
import { useMarketContext } from "~/context/MarketContext"
import { useRouter } from 'next/router';
import { useWalletContext } from "~/context/WalletContext"
import { useContractContext } from "~/context/ContractContext"

export function BuyCredits() {
  const router = useRouter();
  const { id } = router.query;
  const extractIpfsHash = (url: string) => {
    if (url.startsWith('ipfs://')) {
      return url.split('ipfs://')[1];
    }
    return url;
  };
  const marketCredit = {
    title: '',
    quantity: 0,
    image: '',
    policyId: '',
    ownerAddress: '',
    txhash: '',
    price: 0,
    description:'',
  }
  
  const {wallet, metadata} = useWalletContext();
  const { marketCredits , setMarketCredits} = useMarketContext(); 
  const [image, setImage] = useState('');
  const [Credit, setCredit] = useState(marketCredit);
  const credit = marketCredits.find((credit: any) => credit.unit+ credit.ownerAddress === id);

  useEffect(()=>{
    if(credit){
      setCredit(credit);
      setImage(extractIpfsHash(credit.image));
    }
  },[credit]);

  const {contract} = useContractContext();

  async function buyCredits() {
    try{
      const utxo = await contract.getUtxoByTxHash(Credit.txhash);   
      const tx = await contract.purchaseAsset(utxo);
      const signedTx = await wallet.signTx(tx); 
      const txHash = await wallet.submitTx(signedTx);
      if(txHash){
        if(metadata.find((credit: any) => credit.unit === id) == undefined){
          setMarketCredits(marketCredits.filter((credit: any) => credit.unit+ credit.ownerAddress !== id));
        } 
      }
    }
    catch(e){
      console.log("Error1365465: ", e);
      console.log(e);
      router.push(id);
    }
  }


  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 p-4 space-x-4">
        <div className="flex-1 border border-gray-300">
        <img
            src={`https://gateway.pinata.cloud/ipfs/${image}`}
            style={{ width: '100%', height: 'auto' }}
            alt="Image"
          />
        </div>
        
        <div className="w-[741px]">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle> {Credit.title} </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">PolicyId:</span>{" "}
                  {Credit.policyId}
                  <Button variant="ghost" size="icon" className="ml-2">
                    <CopyIcon className="w-4 h-4" />
                  </Button>
                </div>
                <div>
                  <span className="font-semibold">Descriptions:</span>
                  <div className="flex items-center space-x-2">
                    <span>  {Credit.description} </span>
                    <Button variant="ghost" size="icon" className="ml-2">
                    </Button>
                  </div>
                </div>
                <div>
                  <span className="font-semibold">Owner:</span>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="Owner" />
                      <AvatarFallback>OW</AvatarFallback>
                    </Avatar>
                    <span style={{ fontSize: '10px' }}> {Credit.ownerAddress} </span>
                    <Button variant="ghost" size="icon" className="ml-2">
                      <CopyIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="p-4 border-t border-gray-300">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center ">
                <Label htmlFor="quantity" className="block mr-4">
                  {"Quantity:     "  +  Credit.quantity}
                </Label>
              <Label htmlFor="price" className="block ml-9 mr-4">
                {"Price:     " + Credit.price/1000000 }
                </Label>
              <h1 style={{fontWeight: 'bold', fontSize: '20px'}}>₳</h1>
              </div>
              <Button className="bg-green-600 text-white" onClick = {() => buyCredits()} >Buy Now</Button>
            </div>
          </Card>
          
        </div>
      </main>
    </div>
  )
}

function CopyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}