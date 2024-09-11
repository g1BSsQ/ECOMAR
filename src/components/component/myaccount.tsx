import Link from "next/link"
import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import {  useEffect, useState } from "react"
import React from "react"
import { useWalletContext } from '../../context/WalletContext';


export function Myaccount() {

  const credit = {
    policyId: "1234567890",
    title: "Renewable Energy",
    description: "energy carbon credits from a wind farm project",
    quantity: 1000,
    address : "addr_test1qzwu6...",
  };
  const [Credits, setCredits] = useState([credit]); 
  const { connected, wallet } = useWalletContext();

  async function getAssets() {
    if (connected) {
      const _assets = await wallet.getAssets();
      setCredits(_assets);
    }
  }
  useEffect(()=>{
    getAssets();
  },[connected])
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Carbon Credit</h1>
        <div className="grid gap-4 md:grid-cols-3">
          {Credits.map((credit, index) => (
            <div key={index}>
              <Card className="shadow-md h-full grid grid-rows-1">
                <CardHeader>
                  <CardTitle>{credit.title}</CardTitle>
                  <CardDescription>{credit.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">{credit.quantity + " available"}</div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link href={`/detail/${credit.policyId + credit.assetName}`} className="hover:underline" prefetch={false}>
                    <Button
                      className="w-full bg-green-700 text-white"
                    >
                      SELL
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}