import { Button } from "~/components/ui/button"
import { ArrowRightIcon, LeafIcon, BarChartIcon, GlobeIcon, ShieldCheckIcon } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-green-800 mb-4">About Carbon Credit Exchange</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Facilitating the trade of carbon credits to combat climate change and promote sustainable practices globally.
          </p>
        </section>

        {/* Mission Statement */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold text-green-700 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At Carbon Credit Exchange, we're dedicated to creating a transparent, efficient, and accessible marketplace for carbon credits. Our platform connects organizations reducing their carbon footprint with those seeking to offset their emissions, fostering a global community committed to environmental sustainability and climate action.
          </p>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-green-700 mb-8 text-center">Why Choose Carbon Credit Exchange?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <LeafIcon className="w-12 h-12 text-green-500 mb-4" />,
                title: "Verified Carbon Credits",
                description: "All credits on our platform are rigorously vetted and certified by recognized international standards."
              },
              {
                icon: <BarChartIcon className="w-12 h-12 text-green-500 mb-4" />,
                title: "Real-time Trading",
                description: "Our advanced platform enables instant transactions with up-to-the-minute market insights."
              },
              {
                icon: <GlobeIcon className="w-12 h-12 text-green-500 mb-4" />,
                title: "Global Impact",
                description: "Connect with projects and businesses worldwide, maximizing your environmental impact across borders."
              },
              {
                icon: <ShieldCheckIcon className="w-12 h-12 text-green-500 mb-4" />,
                title: "Secure Transactions",
                description: "State-of-the-art security measures ensure the integrity and safety of all trades on our platform."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold text-green-600 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-green-700 text-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold mb-6">How Carbon Credit Exchange Works</h2>
          <ol className="list-decimal list-inside space-y-4">
            <li className="text-lg">
              <span className="font-semibold">Credit Listing:</span> Project developers and companies list their verified carbon credits on our platform.
            </li>
            <li className="text-lg">
              <span className="font-semibold">Buyer Registration:</span> Organizations looking to offset their emissions register and undergo verification.
            </li>
            <li className="text-lg">
              <span className="font-semibold">Trading:</span> Buyers can purchase credits through our user-friendly interface, with real-time pricing and market data.
            </li>
            <li className="text-lg">
              <span className="font-semibold">Verification:</span> All transactions are verified and recorded on our secure ledger.
            </li>
            <li className="text-lg">
              <span className="font-semibold">Retirement:</span> Credits can be retired immediately or held for future use, with full tracking and reporting.
            </li>
          </ol>
        </section>

        {/* About the Company */}
        <section className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold text-green-700 mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Founded in 2023, Carbon Credit Exchange emerged from a shared vision to accelerate the transition to a low-carbon economy. Our team of environmental experts, financial analysts, and tech innovators came together to create a platform that simplifies and democratizes carbon trading.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, we're proud to be at the forefront of the fight against climate change, facilitating the trade of millions of tons of CO2 credits annually through our exchange. Our platform not only supports large corporations in meeting their sustainability goals but also enables smaller businesses and individuals to participate in the global carbon market.
          </p>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-green-700 mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 mb-8">Join Carbon Credit Exchange today and be part of the solution to climate change.</p>
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg">
            Start Trading
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </main>
    </div>
  )
}