import React, { useState, useEffect } from 'react';
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table";
import { Label } from "@radix-ui/react-label";
import { Input } from "~/components/ui/input";
import { JSX, SVGProps } from "react";
import { useRouter } from 'next/router';
import { useWalletContext } from '../../context/WalletContext';

export function SellCredits() {
  const router = useRouter();
  const { id } = router.query;

  const extractIpfsHash = (url: string) => {
    if (url.startsWith('ipfs://')) {
      return url.split('ipfs://')[1];
    }
    return null;
  };

  const credit = {
    policyId: "1234567890",
    title: "Renewable Energy",
    description: "energy carbon credits from a wind farm project",
    quantity: 1000,
    address: "addr_test1qzwu6...",
  };

  const [Credit, setCredit] = useState([credit]);
  const [image, setImage] = useState('');
  const {connected, wallet, metadata } = useWalletContext();
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("₳1");

  useEffect(() => {
    async function getAddress() {
      if (connected) {
        const data = await wallet.getChangeAddress();
        setAddress(data);
      }
    };
    getAddress();
    if (metadata) {
      const asset = metadata.find((item: any) => item.unit === id);
      setCredit(asset);
      const ipfsHash = extractIpfsHash(asset.image);
      setImage(ipfsHash);
    }
  }, [connected]);

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
                  <span className="font-semibold">Issuer:</span>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="Issuer" />
                      <AvatarFallback>IS</AvatarFallback>
                    </Avatar>
                    <span style={{ fontSize: '10px' }}>addr_test1qzwu6...</span>
                    <Button variant="ghost" size="icon" className="ml-2">
                      <CopyIcon className="w-4 h-4" />
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
                    <span style={{ fontSize: '10px' }}> {address} </span>
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
                  Quantity:
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  className="w-25 text-center mr-9"
                  defaultValue={1}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              <Label htmlFor="price" className="block ml-9 mr-4">
                  Price:   
                </Label>
                <Input
                  id="price"
                  type="number"
                  className="w-25 text-center mr-1"
                  placeholder='Input price'
                  onChange={(e) => setPrice(e.target.value)}
                />
              <h1 style={{fontWeight: 'bold', fontSize: '25px'}}>₳</h1>
              </div>
              <Button className="bg-green-600 text-white">Sell Credits</Button>
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
