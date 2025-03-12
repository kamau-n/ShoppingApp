import { ShoppingBag, ArrowRight } from "lucide-react"
import { cn } from "../lib/utils"

export default function Advertiser() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-lg">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-100 opacity-50"></div>
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-blue-100 opacity-50"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16">
        <div className="md:w-1/2 text-center md:text-left space-y-4 md:pr-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full font-medium text-sm mb-2">
            <ShoppingBag size={16} />
            <span>My Shop</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Everything in <span className="text-blue-600">one place</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-md">
            Discover our exclusive collection with <span className="font-semibold">35-70% off</span> on all items.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center md:justify-start gap-3 md:gap-4">
            <button
              className={cn(
                "group flex items-center justify-center gap-2 bg-blue-600 text-white",
                "px-6 py-3 rounded-lg font-medium transition-all duration-200",
                "hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200",
              )}
            >
              SHOP NOW
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>

            <button
              className={cn(
                "border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium",
                "transition-all duration-200 hover:bg-blue-50",
              )}
            >
              READ MORE
            </button>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt={`Customer ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">2,500+</span> happy customers
            </p>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <div className="relative">
            {/* Price tag */}
            <div className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg transform rotate-12 shadow-lg z-20">
              -50%
            </div>

            {/* Main image with styling */}
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Online Shopping"
              className="w-72 md:w-96 h-auto rounded-lg shadow-xl object-cover transform transition-transform duration-500 hover:scale-105 z-10"
            />

            {/* Decorative elements */}
            <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-blue-400 rounded-lg z-0"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

