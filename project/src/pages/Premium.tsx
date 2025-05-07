import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, X } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  notIncluded?: string[];
  recommended?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Timepass',
    price: 0,
    period: 'Free',
    features: [
      'Read limited news daily',
      'Basic mood-check (sentiment)',
      'Only trending topics',
      'Only on laptop/PC'
    ],
    notIncluded: [
      'Fake news alert system',
      'Customized news feed',
      'Access to old articles',
      'Mobile support'
    ]
  },
  {
    id: 'pro',
    name: 'Serious Mode',
    price: 79,
    period: 'month',
    features: [
      'Unlimited news scrolls',
      'Mood-check with graphs',
      'Basic fake news checker',
      'News feed based on interest'
    ],
    recommended: true
  },
  {
    id: 'ultimate',
    name: 'Very Serious Toolkit',
    price: 149,
    period: 'month',
    features: [
      'Everything in Serious Mode',
      'Strong fake news detection',
      'Access via API (for projects)'
    ]
  }
];

const Premium: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const navigate = useNavigate();

  const handleSubscribe = (id: string) => {
    console.log(`Subscribing to ₹${id} plan`);
    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">Pick a Plan, Boss 😎</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We built this for our minor project at JIIT, so it’s simple but helpful. If you like to track news and vibes (and avoid fake stuff), try out a plan below.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-lg shadow-md border transition-all hover:shadow-xl ${
              selectedPlan === plan.id ? 'border-blue-600 scale-105' : 'border-gray-200'
            } ${plan.recommended ? 'relative z-10' : ''}`}
          >
            {plan.recommended && (
              <div className="bg-blue-700 text-white text-center py-1 text-sm font-medium">
                MOST USED BY STUDENTS
              </div>
            )}

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">₹{plan.price}</span>
                {plan.period !== 'Free' && <span className="text-gray-600">/{plan.period}</span>}
              </div>

              <button
                onClick={() => handleSubscribe(plan.id)}
                className={`w-full py-2 px-4 rounded-md font-medium mb-6 ${
                  plan.id === 'free'
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-blue-700 text-white hover:bg-blue-800'
                } transition-colors`}
              >
                {plan.id === 'free' ? 'Using this now' : 'Try this plan'}
              </button>

              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <CheckCircle size={18} className="text-green-600 mt-0.5 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
                {plan.notIncluded?.map((item, idx) => (
                  <div key={idx} className="flex items-start text-gray-500">
                    <X size={18} className="text-red-500 mt-0.5 mr-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gray-100 rounded-lg p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-serif font-bold mb-4">FAQs (Made simple)</h2>
        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="text-xl font-semibold mb-2">What is this project?</h3>
            <p>It's part of our minor project for college – we use AI to read news and guess the mood (happy/sad/neutral) of the article.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">How do we detect fake news?</h3>
            <p>We check source credibility, article patterns, and some ML models (trained using Indian news data).</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Can I use this for my own project?</h3>
            <p>Yep, go for the Topper’s Toolkit plan and use the API. We believe in sharing the knowledge 💻.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Any free trial?</h3>
            <p>Use Timepass plan free anytime. If you like it, upgrade later when you’re not broke 😅.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
