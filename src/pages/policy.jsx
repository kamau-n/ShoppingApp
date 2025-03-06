import { Shield, ChevronRight } from "lucide-react"
import TopNav from "../components/TopNav";

const PrivacyPolicyPage = () => {
  // Last updated date
  const lastUpdated = "June 15, 2023"

  // Table of contents sections
  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "information-collection", title: "Information We Collect" },
    { id: "information-use", title: "How We Use Your Information" },
    { id: "information-sharing", title: "Information Sharing and Disclosure" },
    { id: "cookies", title: "Cookies and Tracking Technologies" },
    { id: "data-security", title: "Data Security" },
    { id: "user-rights", title: "Your Rights and Choices" },
    { id: "children-privacy", title: "Children's Privacy" },
    { id: "international-transfers", title: "International Data Transfers" },
    { id: "policy-changes", title: "Changes to This Privacy Policy" },
    { id: "contact", title: "Contact Us" },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
  <TopNav />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents - Sticky on desktop */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-6">
              <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
              <nav>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="flex items-center text-gray-700 hover:text-blue-600 py-1">
                        <ChevronRight className="h-4 w-4 mr-2" />
                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <section id="introduction" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 mb-4">
                  Welcome to our Privacy Policy. This document explains how we collect, use, and protect your personal
                  information when you use our website and services.
                </p>
                <p className="text-gray-700 mb-4">
                  At [Your Company Name], we are committed to protecting your privacy and ensuring the security of your
                  personal information. We understand the importance of privacy and take our responsibility seriously.
                </p>
                <p className="text-gray-700">
                  This Privacy Policy applies to all information collected through our website, mobile application, and
                  any related services, sales, marketing, or events (collectively, the "Services").
                </p>
              </section>

              <section id="information-collection" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                  We collect several types of information for various purposes to provide and improve our Service to
                  you.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                <p className="text-gray-700 mb-4">
                  While using our Service, we may ask you to provide us with certain personally identifiable information
                  that can be used to contact or identify you. This may include, but is not limited to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Name and contact details (email address, phone number, etc.)</li>
                  <li>Billing and shipping address</li>
                  <li>Payment information</li>
                  <li>Account credentials</li>
                  <li>Profile information</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Data</h3>
                <p className="text-gray-700 mb-4">
                  We may also collect information about how the Service is accessed and used. This Usage Data may
                  include:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>Your computer's Internet Protocol address (e.g., IP address)</li>
                  <li>Browser type and version</li>
                  <li>Pages of our Service that you visit</li>
                  <li>Time and date of your visit</li>
                  <li>Time spent on those pages</li>
                  <li>Device identifiers</li>
                </ul>
              </section>

              <section id="information-use" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">We use the information we collect for various purposes, including:</p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>To provide and maintain our Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information so that we can improve our Service</li>
                  <li>To monitor the usage of our Service</li>
                  <li>To detect, prevent and address technical issues</li>
                  <li>To fulfill any other purpose for which you provide it</li>
                </ul>
              </section>

              <section id="information-sharing" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-gray-700 mb-4">
                  We may share your personal information in the following situations:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>
                    <strong>With Service Providers:</strong> We may share your information with third-party service
                    providers to perform services on our behalf, such as payment processing, data analysis, email
                    delivery, hosting services, and customer service.
                  </li>
                  <li>
                    <strong>For Business Transfers:</strong> We may share or transfer your information in connection
                    with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of
                    all or a portion of our business to another company.
                  </li>
                  <li>
                    <strong>With Affiliates:</strong> We may share your information with our affiliates, in which case
                    we will require those affiliates to honor this Privacy Policy.
                  </li>
                  <li>
                    <strong>With Business Partners:</strong> We may share your information with our business partners to
                    offer you certain products, services, or promotions.
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose
                    with your consent.
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose your information where required to do so by law
                    or in response to valid requests by public authorities.
                  </li>
                </ul>
              </section>

              <section id="cookies" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar tracking technologies to track activity on our Service and hold certain
                  information.
                </p>
                <p className="text-gray-700 mb-4">
                  Cookies are files with a small amount of data which may include an anonymous unique identifier.
                  Cookies are sent to your browser from a website and stored on your device. Tracking technologies also
                  used are beacons, tags, and scripts to collect and track information and to improve and analyze our
                  Service.
                </p>
                <p className="text-gray-700 mb-4">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                  However, if you do not accept cookies, you may not be able to use some portions of our Service.
                </p>
                <p className="text-gray-700">Examples of Cookies we use:</p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>
                    <strong>Session Cookies:</strong> We use Session Cookies to operate our Service.
                  </li>
                  <li>
                    <strong>Preference Cookies:</strong> We use Preference Cookies to remember your preferences and
                    various settings.
                  </li>
                  <li>
                    <strong>Security Cookies:</strong> We use Security Cookies for security purposes.
                  </li>
                  <li>
                    <strong>Advertising Cookies:</strong> Advertising Cookies are used to serve you with advertisements
                    that may be relevant to you and your interests.
                  </li>
                </ul>
              </section>

              <section id="data-security" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Security</h2>
                <p className="text-gray-700 mb-4">
                  The security of your data is important to us, but remember that no method of transmission over the
                  Internet, or method of electronic storage is 100% secure. While we strive to use commercially
                  acceptable means to protect your personal information, we cannot guarantee its absolute security.
                </p>
                <p className="text-gray-700">
                  We implement a variety of security measures to maintain the safety of your personal information when
                  you place an order or enter, submit, or access your personal information, including:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>All sensitive information is transmitted via Secure Socket Layer (SSL) technology</li>
                  <li>All payment information is encrypted in our database</li>
                  <li>Regular malware scanning</li>
                  <li>Regular security assessments</li>
                </ul>
              </section>

              <section id="user-rights" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
                <p className="text-gray-700 mb-4">
                  You have certain rights regarding your personal information. These may include the rights to:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>
                    <strong>Access:</strong> You have the right to request copies of your personal information.
                  </li>
                  <li>
                    <strong>Rectification:</strong> You have the right to request that we correct any information you
                    believe is inaccurate or complete information you believe is incomplete.
                  </li>
                  <li>
                    <strong>Erasure:</strong> You have the right to request that we erase your personal information,
                    under certain conditions.
                  </li>
                  <li>
                    <strong>Restrict processing:</strong> You have the right to request that we restrict the processing
                    of your personal information, under certain conditions.
                  </li>
                  <li>
                    <strong>Object to processing:</strong> You have the right to object to our processing of your
                    personal information, under certain conditions.
                  </li>
                  <li>
                    <strong>Data portability:</strong> You have the right to request that we transfer the data we have
                    collected to another organization, or directly to you, under certain conditions.
                  </li>
                </ul>
                <p className="text-gray-700 mb-4">
                  If you wish to exercise any of these rights, please contact us using the contact information provided
                  below. We may ask you to verify your identity before responding to such requests.
                </p>
              </section>

              <section id="children-privacy" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
                <p className="text-gray-700 mb-4">
                  Our Service does not address anyone under the age of 13. We do not knowingly collect personally
                  identifiable information from anyone under the age of 13. If you are a parent or guardian and you are
                  aware that your child has provided us with personal information, please contact us. If we become aware
                  that we have collected personal information from children without verification of parental consent, we
                  take steps to remove that information from our servers.
                </p>
              </section>

              <section id="international-transfers" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
                <p className="text-gray-700 mb-4">
                  Your information, including personal information, may be transferred to — and maintained on —
                  computers located outside of your state, province, country, or other governmental jurisdiction where
                  the data protection laws may differ from those of your jurisdiction.
                </p>
                <p className="text-gray-700 mb-4">
                  If you are located outside Kenya and choose to provide information to us, please note that we transfer
                  the information, including personal information, to Kenya and process it there.
                </p>
                <p className="text-gray-700">
                  Your consent to this Privacy Policy followed by your submission of such information represents your
                  agreement to that transfer.
                </p>
              </section>

              <section id="policy-changes" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy
                  Policy.
                </p>
                <p className="text-gray-700 mb-4">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                  Policy are effective when they are posted on this page.
                </p>
              </section>

              <section id="contact" className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                  <li>By email: privacy@awesome.co.ke</li>
                  <li>By phone: +254 759155650</li>
                  <li>By mail: 123 Business Avenue, Nairobi, Kenya</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage

