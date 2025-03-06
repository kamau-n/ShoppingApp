
import { Facebook, Instagram, Twitter } from "@material-ui/icons"
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-50 px-4  mx-8 md:px-6 lg:px-8 py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-slate-200 pb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">SHOP</h3>
            <div className="text-slate-600 space-y-2">
              <p className="leading-relaxed">
                This is an online shop that allows you to order for your favorite products and have them delivered to
                your doorstep.
              </p>
              <p>You can order for food, clothes, electronics, and many more.</p>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <Link to ={{pathname:"/"}}
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to ={{pathname:"/"}}
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to ={{pathname:"/"}}
                className="text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-4">SHOP BY CATEGORY</h3>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link to ={{pathname:"/"}}  className="text-slate-600 hover:text-slate-900 transition-colors">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link to ={{pathname:"/"}}  className="text-slate-600 hover:text-slate-900 transition-colors">
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link to ={{pathname:"/"}}  className="text-slate-600 hover:text-slate-900 transition-colors">
                    Home & Garden
                  </Link>
                </li>
                <li>
                  <Link  to ={{pathname:"/"}}  className="text-slate-600 hover:text-slate-900 transition-colors">
                    Sports Equipment
                  </Link>
                </li>
                <li>
                  <Link  to ={{pathname:"/"}}  className="text-slate-600 hover:text-slate-900 transition-colors">
                    Books & Media
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-4">CUSTOMER SERVICE</h3>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link  to ={{pathname:"/contact"}}  className="text-slate-600 hover:text-slate-900 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link  to ={{pathname:"/"}}  className="text-slate-600 hover:text-slate-900 transition-colors">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link  to ={{pathname:"/"}}  className="text-slate-600 hover:text-slate-900 transition-colors">
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link  to ={{pathname:"/faqs"}}  className="text-slate-600 hover:text-slate-900 transition-colors">
                    FAQ 
                  </Link>
                </li>
                <li>
                  <Link to ={{pathname:"/account"}}  className="text-slate-600 hover:text-slate-900 transition-colors">
                    Track Your Order
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-4">ABOUT US</h3>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link to ={{pathname:"/about"}}  className="text-slate-600 hover:text-slate-900 transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link to ={{pathname:"/"}}  className="text-slate-600 hover:text-slate-900 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to ={{pathname:"/policy"}}  className="text-slate-600 hover:text-slate-900 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to ={{pathname:"/"}}  className="text-slate-600 hover:text-slate-900 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to ={{pathname:"/blog"}}  className="text-slate-600 hover:text-slate-900 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-slate-600">
          <p>&copy; {new Date().getFullYear()} <a href="https://awesome.co.ke"> Awesome </a>  . All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

