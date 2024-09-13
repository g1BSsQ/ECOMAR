import Link from "next/link"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "~/components/ui/collapsible"
import { CheckIcon, ChevronDownIcon, CompassIcon, MailIcon, MapPinIcon, PhoneIcon, PieChartIcon, ZapIcon } from "lucide-react"

export function Homepage() {

  return (
    
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section id="about" className="py-12 md:py-20 bg-[#f0f8f0]">
          <div className="container px-4 md:px-6 grid gap-8 md:grid-cols-2 Credits-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Welcome to Carbon Exchange</h1>
              <p className="text-muted-foreground mt-4">
                We are a leading carbon trading platform that connects businesses and individuals looking to offset
                their carbon footprint. Our mission is to facilitate the transition to a low-carbon economy by providing
                a transparent and efficient marketplace for carbon credits.
              </p>
            </div>
          </div>
        </section>
        <section id="services" className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-[#f0f8f0] rounded-lg p-6 grid gap-4">
                <ZapIcon className="w-10 h-10 text-[#1e8449]" />
                <h3 className="text-xl font-bold">Carbon Trading</h3>
                <p className="text-muted-foreground">
                  Buy and sell carbon credits on our secure and transparent platform.
                </p>
              </div>
              <div className="bg-[#f0f8f0] rounded-lg p-6 grid gap-4">
                <PieChartIcon className="w-10 h-10 text-[#1e8449]" />
                <h3 className="text-xl font-bold">Carbon Accounting</h3>
                <p className="text-muted-foreground">
                  Measure, report, and verify your carbon emissions with our advanced tools.
                </p>
              </div>
              <div className="bg-[#f0f8f0] rounded-lg p-6 grid gap-4">
                <CompassIcon className="w-10 h-10 text-[#1e8449]" />
                <h3 className="text-xl font-bold">Carbon Consulting</h3>
                <p className="text-muted-foreground">
                  Get expert advice on carbon reduction strategies and sustainability initiatives.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="benefits" className="py-12 md:py-20 bg-[#f0f8f0]">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-1">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold">The Benefits of Carbon Trading</h2>
                <p className="text-muted-foreground mt-4">
                  By participating in the carbon market, businesses and individuals can:
                </p>
                <ul className="grid gap-4 mt-6 justify-center">
                  <li className="flex Credits-start gap-4">
                    <CheckIcon className="w-6 h-6 text-[#1e8449] shrink-0" />
                    <div>
                      <h4 className="font-bold">Reduce Carbon Footprint</h4>
                      <p className="text-muted-foreground">Offset your emissions by purchasing carbon credits.</p>
                    </div>
                  </li>
                  <li className="flex Credits-start gap-4">
                    <CheckIcon className="w-6 h-6 text-[#1e8449] shrink-0" />
                    <div>
                      <h4 className="font-bold">Generate Revenue</h4>
                      <p className="text-muted-foreground">Sell your carbon credits and earn additional income.</p>
                    </div>
                  </li>
                  <li className="flex Credits-start gap-4">
                    <CheckIcon className="w-6 h-6 text-[#1e8449] shrink-0" />
                    <div>
                      <h4 className="font-bold">Demonstrate Sustainability</h4>
                      <p className="text-muted-foreground">Showcase your commitment to environmental responsibility.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="faq" className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="grid gap-6">
              <Collapsible>
                <CollapsibleTrigger className="flex Credits-center justify-between bg-[#f0f8f0] rounded-lg px-6 py-4 text-lg font-medium">
                  What is a carbon credit?
                  <ChevronDownIcon className="w-5 h-5 transition-transform [&[data-state=open]]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 py-4 text-muted-foreground">
                  A carbon credit is a permit that allows the holder to emit a certain amount of carbon dioxide or other
                  greenhouse gases. One carbon credit typically represents the removal or avoidance of one metric ton of
                  carbon dioxide.
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex Credits-center justify-between bg-[#f0f8f0] rounded-lg px-6 py-4 text-lg font-medium">
                  How does carbon trading work?
                  <ChevronDownIcon className="w-5 h-5 transition-transform [&[data-state=open]]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 py-4 text-muted-foreground">
                  Carbon trading is a market-based approach to reducing greenhouse gas emissions. Companies or
                  individuals who emit less than their allocated amount of carbon can sell their excess credits to those
                  who exceed their allocation. This creates an incentive to reduce emissions and invest in clean
                  technologies.
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex Credits-center justify-between bg-[#f0f8f0] rounded-lg px-6 py-4 text-lg font-medium">
                  Why should I participate in carbon trading?
                  <ChevronDownIcon className="w-5 h-5 transition-transform [&[data-state=open]]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 py-4 text-muted-foreground">
                  Participating in carbon trading can provide several benefits, including reducing your carbon
                  footprint, generating additional revenue, and demonstrating your commitment to sustainability. By
                  offsetting your emissions through the purchase of carbon credits, you can contribute to global efforts
                  to mitigate climate change.
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex Credits-center justify-between bg-[#f0f8f0] rounded-lg px-6 py-4 text-lg font-medium">
                  How do I get started with carbon trading?
                  <ChevronDownIcon className="w-5 h-5 transition-transform [&[data-state=open]]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 py-4 text-muted-foreground">
                  To get started with carbon trading, you can sign up for an account on our platform. We will guide you
                  through the process of measuring your carbon footprint, purchasing or selling carbon credits, and
                  managing your portfolio. Our team of experts is also available to provide personalized support and
                  advice.
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#f0f8f0] text-muted-foreground py-12 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
  <div className="flex flex-col md:flex-row items-center gap-4 ">
    <p className="text-sm">© 2024 Carbon Exchange. All rights reserved.</p>
  </div>
  <div className="flex flex-col md:flex-row items-center gap-4 ">
    <div className="flex flex-col"> {/* Thay đổi thành flex-col */ }
      <div className="flex items-center gap-4 mb-5">
        <Link href="#" className="hover:underline" prefetch={false}>
          Privacy Policy
        </Link>
      </div>
      <div className="flex items-center gap-4 mb-5">
        <Link href="#" className="hover:underline" prefetch={false}>
          Terms of Service
        </Link>
      </div>
    </div>
  </div>
  <div className="mt-4 md:mt-0">  
    <div className="flex items-center gap-2 mb-5">
      <PhoneIcon className="w-5 h-5" />
      <a href="#" className="hover:underline">
        091 267 5677
      </a>
    </div>
    <div className="flex items-center gap-2 mb-5">
      <MailIcon className="w-5 h-5" />
      <a href="#" className="hover:underline">
        hung231230806@lms.utc.edu.vn
      </a>
    </div>
    <div className="flex items-center gap-2 mb-5">
      <MapPinIcon className="w-5 h-5"/>
      <span>University of Transport and Communications - No.3 Cau Giay, Ha Noi, Vietnam</span>
    </div>
  </div>
</footer>
    </div>
  )
}
