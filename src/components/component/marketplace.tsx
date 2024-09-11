import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card"
import React, { useState} from "react"

export function Marketplace() {
  const [marketCredits, setMarketCredits] = useState([]);
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Available Carbon Credits</h1>
        <div className="grid gap-4 md:grid-cols-3">
        {marketCredits.map((Credit)=>(
          <div key={Credit.id}>
           <Card className="shadow-md h-full grid grid-rows-1">
            <CardHeader>
              <CardTitle>{Credit.title}</CardTitle>
              <CardDescription>{Credit.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{"$"+Credit.price}</div>
              <div className="text-sm text-muted-foreground">{Credit.amount+" available"}</div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button className="w-full bg-green-700 text-white">Buy Now</Button>
            </CardFooter>
            </Card>   
          </div>
        ))}
        
      </div>
      </main>
    </div>
  )
}
// export function Marketplace({test}){
//   return(
//     <div className="bg-white">
      
//     </div>
//   );
// }

