import React, { useState } from 'react';
import { ArrowRight, UserPlus, LogIn, Star, Quote, Briefcase, Users, Shield, Sparkles, MessageCircle, Globe, CheckCircle } from 'lucide-react';
import CardSwap, { Card } from './CardSwap';
import GradientText from './GradientText';

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
        <div className="flex-1 flex flex-col items-start justify-center z-0 select-none pointer-events-none pl-0 ml-0">
          <GradientText
            colors={["#6a11cb", "#2575fc", "#3a1859", "#6a11cb", "#1e215d"]}
            animationSpeed={8}
            className="text-[18vw] font-extrabold tracking-tight text-left -ml-8"
          >
            HIRLY
          </GradientText>
        </div>
        {/* CardSwap Animated Card Stack on the right */}
        <div className="relative z-10 flex flex-col items-center mr-[5vw] -mt-24" style={{ height: 600, position: 'relative' }}>
          <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
            <Card>
              <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-2">Swipe to find</h2>
                <h3 className="text-2xl text-white/70 mb-2">New opportunities</h3>
                <p className="text-white/80 text-lg mb-6">Browse through curated job matches tailored to your skills and preferences.</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-2">Who is it for?</h2>
                <p className="text-white/80 text-lg mb-6">Hirly is for job seekers and employers who want a fast, modern, and AI-powered hiring experience.</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-2">How it works</h2>
                <p className="text-white/80 text-lg mb-6">Create a profile, swipe through jobs or candidates, and connect instantly. Our AI matches you with the best opportunities.</p>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl">
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

      {/* Testimonials Section */}
      <section className="py-24 px-8 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-10">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 rounded-2xl p-8 border border-white/20 shadow-lg flex flex-col items-center">
            <Quote className="w-8 h-8 text-pink-400 mb-4" />
            <p className="text-white/80 mb-4">“Hirly matched me with my dream job in days. The process was smooth and actually fun!”</p>
            <div className="flex items-center gap-2">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Testimonial" className="w-10 h-10 rounded-full border-2 border-pink-400" />
              <span className="text-white/70 font-semibold">Alex J.</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl p-8 border border-white/20 shadow-lg flex flex-col items-center">
            <Quote className="w-8 h-8 text-blue-400 mb-4" />
            <p className="text-white/80 mb-4">“We found top talent for our startup faster than ever. The AI recommendations are spot on.”</p>
            <div className="flex items-center gap-2">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Testimonial" className="w-10 h-10 rounded-full border-2 border-blue-400" />
              <span className="text-white/70 font-semibold">Chris T.</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl p-8 border border-white/20 shadow-lg flex flex-col items-center">
            <Quote className="w-8 h-8 text-green-400 mb-4" />
            <p className="text-white/80 mb-4">“The privacy features and instant messaging made my job search stress-free. Highly recommend!”</p>
            <div className="flex items-center gap-2">
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Testimonial" className="w-10 h-10 rounded-full border-2 border-green-400" />
              <span className="text-white/70 font-semibold">Maya P.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Facts Section */}
      <section className="py-16 px-8 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-10">Job Hunting by the Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <Briefcase className="w-10 h-10 text-purple-400 mb-3" />
            <span className="text-4xl font-bold text-white mb-2">80%</span>
            <span className="text-white/70">of jobs are never posted online</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-10 h-10 text-blue-400 mb-3" />
            <span className="text-4xl font-bold text-white mb-2">2x</span>
            <span className="text-white/70">faster hiring with AI matching</span>
          </div>
          <div className="flex flex-col items-center">
            <Globe className="w-10 h-10 text-green-400 mb-3" />
            <span className="text-4xl font-bold text-white mb-2">50+</span>
            <span className="text-white/70">countries with active users</span>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 px-8 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-10">Why Choose Hirly?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white/10 rounded-2xl p-8 border border-white/20 shadow-lg flex flex-col items-center">
            <Sparkles className="w-10 h-10 text-pink-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">AI Matching</h3>
            <p className="text-white/70">Get matched with jobs and candidates that fit your skills and goals.</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-8 border border-white/20 shadow-lg flex flex-col items-center">
            <MessageCircle className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Instant Messaging</h3>
            <p className="text-white/70">Connect and chat instantly with employers or candidates.</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-8 border border-white/20 shadow-lg flex flex-col items-center">
            <Shield className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Privacy First</h3>
            <p className="text-white/70">Your data is secure and you control your visibility at all times.</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-8 border border-white/20 shadow-lg flex flex-col items-center">
            <CheckCircle className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Modern Design</h3>
            <p className="text-white/70">Enjoy a beautiful, intuitive interface on any device.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white/10 border-t border-white/20 py-10 px-8 mt-16">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-pink-400" />
            <span className="text-2xl font-bold text-white tracking-wide">Hirly</span>
          </div>
          <div className="flex gap-8 text-white/70 text-sm">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#" className="hover:text-white transition">Contact</a>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
          </div>
          <div className="text-white/40 text-xs">&copy; {new Date().getFullYear()} Hirly. All rights reserved.</div>
        </div>
      </footer>

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