import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table"
import { Label } from "../ui/label"
import { JSX, SVGProps, useEffect, useState } from "react"
import { useMarketContext } from "~/context/MarketContext"
import { useRouter } from 'next/router';  
import { useContractContext } from "~/context/ContractContext"
import { useWalletContext } from "~/context/WalletContext"
export function RefundCredits() {
  const router = useRouter();
  const { id } = router.query;
  const extractIpfsHash = (url: string) => {
    if (url.startsWith('ipfs://')) {
      return url.split('ipfs://')[1];
    }
    return null;
  };
  const marketCredit = {
    title: '',
    quantity: 0,
    image: '',
    policyId: '',
    ownerAddress: '',
    txhash: '',
    description:'',
  }
  const { marketCredits } = useMarketContext();
  const [image, setImage] = useState('');
  const [Credit, setCredit] = useState(marketCredit);
  const credit = marketCredits.find((credit: any) => credit.unit+ credit.ownerAddress === id);
  const {contract} = useContractContext();
  const {wallet} = useWalletContext();
  async function HandleRefund() {
    const utxo = await contract.getUtxoByTxHash(Credit.txhash);
    const tx = await contract.delistAsset(utxo);
    try
    {
      const signedTx = await wallet.signTx(tx); 
      const txHash = await wallet.submitTx(signedTx);
    }
    catch(e){
      console.log(e);
    }
  }
  useEffect(()=>{
    if(credit){
      setCredit(credit);
      setImage(extractIpfsHash(credit.image));
    }
  },[credit]);
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
                  <span className="font-semibold ">Descriptions:</span>
                  <div className="flex items-center space-x-2 mb-5 ">
                    <span></span>
                  </div>
                </div>{Credit.description}
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
                <Label htmlFor="quantity" className="text-center block mr-4 mb-3 ">
                  {"Quantity:     "  +  Credit.quantity}
                </Label>
              <Button 
              onClick={HandleRefund} 
              className="bg-blue-600 text-white">Refund</Button>
            </div>
          </Card>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Bill</TableHead>
                    <TableHead>Credit Quantity</TableHead>
                    <TableHead>Transaction Hash</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2023-04-15</TableCell>
                    <TableCell>$50</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span>0x123456789abcdef0123456789abcdef</span>
                        <Button variant="ghost" size="icon" className="ml-2">
                          <CopyIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-03-20</TableCell>
                    <TableCell>$25</TableCell>
                    <TableCell>25</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span>0x987654321fedcba0987654321fedcba</span>
                        <Button variant="ghost" size="icon" className="ml-2">
                          <CopyIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-02-10</TableCell>
                    <TableCell>$75</TableCell>
                    <TableCell>75</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span>0xabcdef0123456789abcdef0123456789</span>
                        <Button variant="ghost" size="icon" className="ml-2">
                          <CopyIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
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

