import React, { useState } from 'react';
import { Check, Star, Zap, Users, Building } from 'lucide-react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: isAnnual ? 25 : 30,
      originalPrice: isAnnual ? 30 : null,
      description: "Perfect for individuals getting started",
      features: [
        "Up to 3 email accounts",
        "Basic keyboard shortcuts",
        "Email scheduling",
        "Mobile apps",
        "Basic support",
        "1GB attachment storage"
      ],
      popular: false,
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Professional",
      icon: Star,
      price: isAnnual ? 25 : 30,
      originalPrice: isAnnual ? 30 : null,
      description: "For professionals who live in email",
      features: [
        "Unlimited email accounts",
        "Advanced keyboard shortcuts",
        "AI-powered compose",
        "Calendar integration",
        "Priority support",
        "10GB attachment storage",
        "Read receipts",
        "Email templates",
        "Advanced search"
      ],
      popular: true,
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Team",
      icon: Users,
      price: isAnnual ? 25 : 30,
      originalPrice: isAnnual ? 30 : null,
      description: "Built for teams and collaboration",
      features: [
        "Everything in Professional",
        "Team collaboration tools",
        "Shared templates",
        "Team analytics",
        "Admin controls",
        "SSO integration",
        "Unlimited attachment storage",
        "Custom integrations",
        "Dedicated support"
      ],
      popular: false,
      color: "from-green-500 to-green-600"
    },
    {
      name: "Enterprise",
      icon: Building,
      price: "Custom",
      description: "For large organizations with custom needs",
      features: [
        "Everything in Team",
        "Custom deployment",
        "Advanced security",
        "Compliance tools",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom training",
        "Priority feature requests"
      ],
      popular: false,
      color: "from-gray-700 to-gray-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple, transparent
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Choose the plan that's right for you. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-16">
            <span className={`text-lg ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Save 17%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                  plan.popular 
                    ? 'border-purple-500 ring-4 ring-purple-100' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className={`bg-gradient-to-r ${plan.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
                    <plan.icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="mb-8">
                    {typeof plan.price === 'number' ? (
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-500 ml-2">
                          /{isAnnual ? 'month' : 'month'}
                        </span>
                        {plan.originalPrice && (
                          <span className="text-lg text-gray-400 line-through ml-2">
                            ${plan.originalPrice}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      </div>
                    )}
                    {isAnnual && typeof plan.price === 'number' && (
                      <p className="text-sm text-gray-500 mt-1">
                        Billed annually (${plan.price * 12})
                      </p>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "Can I change plans anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate the billing."
              },
              {
                question: "What happens after the free trial?",
                answer: "After your 14-day free trial, you'll be automatically enrolled in the plan you selected. You can cancel anytime before the trial ends."
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment in full."
              },
              {
                question: "Is there a setup fee?",
                answer: "No, there are no setup fees or hidden costs. The price you see is the price you pay."
              },
              {
                question: "Can I use SuperSync with any email provider?",
                answer: "Yes, SuperSync works with Gmail, Outlook, Yahoo, and any IMAP-compatible email provider."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have transformed their email workflow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}