import Link from "next/link"
import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import {  useEffect, useState } from "react"
import React from "react"
import { useWalletContext } from '../../context/WalletContext';



export function Myaccount() {

  const [Credits, setCredits] = useState([]); 
  const {connected, metadata} = useWalletContext();
  useEffect(() => {
    if (metadata) {
      setCredits(metadata);
    }
  }, [metadata]);
  useEffect(()=>{
    if(!connected){
      setCredits([]);
    }
  },[connected]);
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
                  <Link href={`/sell/detail/${credit.unit}`} className="hover:underline" prefetch={false}>
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