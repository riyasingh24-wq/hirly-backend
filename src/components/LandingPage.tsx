import React, { useState } from 'react';
import { ArrowRight, UserPlus, LogIn } from 'lucide-react';
import CardSwap, { Card } from './CardSwap';

interface LandingPageProps {
  onAuthSuccess: (userType: 'candidate' | 'employer') => void;
}

const carouselCards = [
  {
    title: 'Swipe to find',
    subtitle: 'New opportunities',
    description: 'Browse through curated job matches tailored to your skills and preferences.',
  },
  {
    title: 'Who is it for?',
    subtitle: '',
    description: 'Hirly is for job seekers and employers who want a fast, modern, and AI-powered hiring experience.',
  },
  {
    title: 'How it works',
    subtitle: '',
    description: 'Create a profile, swipe through jobs or candidates, and connect instantly. Our AI matches you with the best opportunities.',
  },
  {
    title: 'Ready to get started?',
    subtitle: '',
    description: 'Sign up now to unlock your next opportunity!',
    cta: true,
  },
];

const LandingPage: React.FC<LandingPageProps> = ({ onAuthSuccess }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userType, setUserType] = useState<'candidate' | 'employer'>('candidate');

  const nextCard = () => setCarouselIndex((i) => (i + 1) % carouselCards.length);
  const prevCard = () => setCarouselIndex((i) => (i - 1 + carouselCards.length) % carouselCards.length);

  // Simulate authentication
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSignUp(false);
    setShowLogin(false);
    onAuthSuccess(userType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex flex-col">
      {/* Top Nav */}
      <nav className="flex justify-end items-center px-12 py-6 text-white/90 text-lg gap-10">
        <a href="#about" className="hover:text-white transition">About</a>
        <a href="#how" className="hover:text-white transition">How It Works</a>
        <a href="#pricing" className="hover:text-white transition">Pricing</a>
        <button onClick={() => setShowLogin(true)} className="ml-8 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition flex items-center gap-2"><LogIn className="w-5 h-5" /> Login</button>
      </nav>

      {/* Hero Section */}
      <div className="relative flex-1 flex flex-row items-center justify-end" style={{ minHeight: 600 }}>
        {/* Blurred Background Text on the left */}
        <div className="flex-1 flex items-center pl-[5vw] z-0 select-none pointer-events-none">
          <span className="text-[18vw] font-extrabold text-white/10 tracking-tight" style={{letterSpacing: '-0.1em'}}>HIRLY</span>
        </div>
        {/* CardSwap Animated Card Stack on the right */}
        <div className="relative z-10 flex flex-col items-center mr-[5vw]" style={{ height: 600, position: 'relative' }}>
          <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
            <Card>
              <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-2">Swipe to find</h2>
                <h3 className="text-2xl text-white/70 mb-2">New opportunities</h3>
                <p className="text-white/80 text-lg mb-6">Browse through curated job matches tailored to your skills and preferences.</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-2">Who is it for?</h2>
                <p className="text-white/80 text-lg mb-6">Hirly is for job seekers and employers who want a fast, modern, and AI-powered hiring experience.</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-2">How it works</h2>
                <p className="text-white/80 text-lg mb-6">Create a profile, swipe through jobs or candidates, and connect instantly. Our AI matches you with the best opportunities.</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-2">Ready to get started?</h2>
                <p className="text-white/80 text-lg mb-6">Sign up now to unlock your next opportunity!</p>
                <button
                  className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg flex items-center gap-2 hover:from-pink-600 hover:to-red-600 transition-colors"
                  onClick={() => setShowSignUp(true)}
                >
                  <UserPlus className="w-5 h-5" /> Sign Up Now <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </Card>
          </CardSwap>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-24 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">About Hirly</h2>
        <p className="text-white/80 text-lg">Hirly is on a mission to revolutionize hiring with AI-powered job matching, making the process faster, fairer, and more enjoyable for everyone.</p>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-24 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
        <p className="text-white/80 text-lg">Create a profile, swipe through jobs or candidates, and connect instantly. Our AI matches you with the best opportunities based on your skills and preferences.</p>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Pricing</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center mt-8">
          <div className="flex-1 bg-white/10 rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
            <p className="text-white/70 mb-4">Basic job matching and messaging</p>
            <div className="text-3xl font-bold text-white mb-4">$0</div>
            <ul className="text-white/60 mb-6 space-y-2">
              <li>✔️ Curated job matches</li>
              <li>✔️ Basic messaging</li>
              <li>✔️ Profile creation</li>
            </ul>
            <button className="w-full py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-red-600 transition-colors" onClick={() => setShowSignUp(true)}>Get Started</button>
          </div>
          <div className="flex-1 bg-white/10 rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <p className="text-white/70 mb-4">Advanced features for power users</p>
            <div className="text-3xl font-bold text-white mb-4">$9<span className="text-lg font-normal">/mo</span></div>
            <ul className="text-white/60 mb-6 space-y-2">
              <li>✔️ Everything in Free</li>
              <li>✔️ AI-powered recommendations</li>
              <li>✔️ Priority support</li>
              <li>✔️ Advanced analytics</li>
            </ul>
            <button className="w-full py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-red-600 transition-colors" onClick={() => setShowSignUp(true)}>Start Free Trial</button>
          </div>
        </div>
      </section>

      {/* Authentication Modals (placeholders) */}
      {showSignUp && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={() => setShowSignUp(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            {/* Sign Up Form Placeholder */}
            <form className="flex flex-col gap-4" onSubmit={handleAuth}>
              <input type="email" placeholder="Email" className="p-3 rounded-xl border border-gray-200" required />
              <input type="password" placeholder="Password" className="p-3 rounded-xl border border-gray-200" required />
              <div className="flex gap-4 items-center justify-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="candidate"
                    checked={userType === 'candidate'}
                    onChange={() => setUserType('candidate')}
                    className="accent-pink-500"
                  />
                  <span>Candidate</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="employer"
                    checked={userType === 'employer'}
                    onChange={() => setUserType('employer')}
                    className="accent-pink-500"
                  />
                  <span>Employer</span>
                </label>
              </div>
              <button type="submit" className="py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg">Create Account</button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <button className="text-pink-500 hover:underline" onClick={() => { setShowSignUp(false); setShowLogin(true); }}>Log in</button>
            </div>
          </div>
        </div>
      )}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={() => setShowLogin(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">Log In</h2>
            {/* Login Form Placeholder */}
            <form className="flex flex-col gap-4" onSubmit={handleAuth}>
              <input type="email" placeholder="Email" className="p-3 rounded-xl border border-gray-200" required />
              <input type="password" placeholder="Password" className="p-3 rounded-xl border border-gray-200" required />
              <div className="flex gap-4 items-center justify-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="candidate"
                    checked={userType === 'candidate'}
                    onChange={() => setUserType('candidate')}
                    className="accent-pink-500"
                  />
                  <span>Candidate</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="employer"
                    checked={userType === 'employer'}
                    onChange={() => setUserType('employer')}
                    className="accent-pink-500"
                  />
                  <span>Employer</span>
                </label>
              </div>
              <button type="submit" className="py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg">Log In</button>
            </form>
            <div className="mt-4 text-center text-sm">
              New here?{' '}
              <button className="text-pink-500 hover:underline" onClick={() => { setShowLogin(false); setShowSignUp(true); }}>Create an account</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage; 