import { Button } from "~/components/ui/button"
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import React, { useState} from "react";
import { ForgeScript, Transaction } from "@meshsdk/core";
import { useWalletContext } from '../../context/WalletContext';


export function Mint() {

  const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJjNTdiMGY1My1mOTU1LTQzYjctYmIyNS02MWMyNDE5Y2Y1MzUiLCJlbWFpbCI6Imh1bmdib3ljbEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYjk2MzNhMmZkNTA4N2I0NGI5ZGUiLCJzY29wZWRLZXlTZWNyZXQiOiI5ZDU3YTM5YTM3NDYzZmY4NzQ3YjUwNTIxNzE4NWYwMjBlZWQwZWMzMjY1ZDFlZWUxNzdmZmU3YTM2OGQ4YTA2IiwiZXhwIjoxNzU4MDMyMjYwfQ.tsE5inMYRRUmJJAO18dbg89xpq5zaSU3kRlo2YbMLqM";

  const [credit, setCredit] = useState<File | null>(null); 
  const onFileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredit(e.target.files?.[0] || null); 
  }

  const handleClick = () => {
    document.getElementById('upload-file')?.click();
  }

  const {wallet} = useWalletContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  async function mintToken() {
    const usedAddress = await wallet.getUsedAddresses(); 
    const address = usedAddress[0]; 
    const forgingScript = ForgeScript.withOneSignature(address);

    const assetMetadata: AssetMetadata = {
      "name": title, 
      "image": "",
      "mediaType": "image/jpg",
      "isCredit": "1",
      "description": description, 
    };

    const asset: Mint = {
      assetName: title, 
      assetQuantity: quantity.toString(), 
      metadata: assetMetadata,
      label: '721',
      recipient: address,
    };

    const tx = new Transaction({ initiator: wallet });
    tx.mintAsset(
      forgingScript,
      asset,
    );

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
  }



  async function pinFileToIPFS() {
    try {
      const formData = new FormData();
  
      const file = credit? new File(["upload-file"], credit.name, { type: "image/jpg" }) : null;
      formData.append("file", file);
  
      const request = await fetch("https://uploads.pinata.cloud/v3/files", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`
        },
        body: formData,
      });
      const response = await request.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    
    <div className="min-h-screen bg-white">
      <main className="flex flex-col items-center py-8">
        <h1 className="text-3xl font-bold text-[#1E834B] mb-4">Mint Your Asset</h1>
        <section className="w-full max-w-2xl p-4">
          <h2 className="text-xl font-semibold mb-2">Upload Your Credit Carbon</h2>
          <div className="border-2 border-dashed border-gray-400 p-8 mb-4 text-center"> 
            <p className="text-gray-500 mb-4">
              {credit ? credit.name : 'UPLOAD YOUR CARBON CREDITS'}
            </p>
            <Button onClick = {handleClick} className="bg-[#1E834B] text-white cursor-pointer">Upload</Button>
            <input 
                 hidden name = ""
                 type ="file"
                 id="upload-file" 
                 accept="image/*" 
                 onChange={onFileUploadHandler}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="title" className="block mb-1">
              Your Title
            </Label>
            <Input 
              id="title" 
              placeholder="Enter your title" 
              className="w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="description" className="block mb-1">
              Description
            </Label>
            <Textarea 
              id="description" 
              placeholder="Description of the PNG" 
              className="w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center space-x-3">
            <Label htmlFor="quantity" className="block">
              Quantity:
            </Label>
            <Input 
              id="quantity" 
              type="number" 
              className="w-25 text-center" 
              defaultValue={1}
              value={quantity.toString()}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            />
          </div>
          
          <Button onClick = {() => mintToken()}className="bg-[#1E834B] text-white w-full">Mint</Button>
        </section>
      </main>
    </div>
  )
}