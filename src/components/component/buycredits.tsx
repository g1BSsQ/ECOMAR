import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { JSX, SVGProps } from "react"

export function BuyCredits() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 p-4 space-x-4">
        <div className="flex-1 border border-gray-300" />
        <div className="w-[641px]">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Product 1</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">PolicyId:</span>{" "}
                  b9e172a1afad9f6c58dea3e016fe4f37c3cef55d0c1e87cd0b42de
                  <Button variant="ghost" size="icon" className="ml-2">
                    <CopyIcon className="w-4 h-4" />
                  </Button>
                </div>
                <div>
                  <span className="font-semibold">Issuer:</span>
                  <div className="flex Credits-center space-x-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="Issuer" />
                      <AvatarFallback>IS</AvatarFallback>
                    </Avatar>
                    <span>addr_test1qzwu6...</span>
                    <Button variant="ghost" size="icon" className="ml-2">
                      <CopyIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <span className="font-semibold">Owner:</span>
                  <div className="flex Credits-center space-x-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="Owner" />
                      <AvatarFallback>OW</AvatarFallback>
                    </Avatar>
                    <span>addr_test1qpkxr...</span>
                    <Button variant="ghost" size="icon" className="ml-2">
                      <CopyIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="flex Credits-center justify-between p-4 border-t border-gray-300">
          <div className="flex Credits-center space-x-3">
            <Label htmlFor="quantity" className="block">
              Quantity:
            </Label>
            <Input id="quantity" type="number" className="w-25 text-center" defaultValue={1} />
          </div>
          <div className="text-2xl font-bold">$100</div>
            <Button className="bg-green-600 text-white">Buy Credit</Button>
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
                      <div className="flex Credits-center">
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
                      <div className="flex Credits-center">
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
                      <div className="flex Credits-center">
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

