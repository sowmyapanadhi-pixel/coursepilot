import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useAppContext();
  
  const [isRegistering, setIsRegistering] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save login/registration data into global global state
    setUserData(prev => ({
      ...prev,
      name: name || 'Guest User',
      email: email,
      phone: phone
    }));

    // Navigate to onboarding
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf2f8] via-[#f5f3ff] to-[#f0f9ff] flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-violet-200/40 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="glass-panel max-w-md w-full p-10 relative z-10 animate-in fade-in zoom-in duration-700 border border-white shadow-2xl shadow-purple-100/50">
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-tr from-violet-400 to-rose-400 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-purple-200 mb-8 rotate-6 hover:rotate-0 transition-transform duration-500 transform scale-110">
            <span className="text-5xl">🚀</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-3 uppercase">
            {isRegistering ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-slate-500 font-black italic uppercase tracking-tighter opacity-80">
            {isRegistering ? 'Join CoursePilot to start your journey' : 'Sign in to continue your career journey'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegistering && (
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 ml-1 uppercase tracking-widest">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe" 
                className="input-field" 
                required={isRegistering}
              />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-black text-slate-400 mb-2 ml-1 uppercase tracking-widest">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" 
              className="input-field"  
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 mb-2 ml-1 uppercase tracking-widest">Phone Number</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000" 
              className="input-field" 
              required 
            />
          </div>

          <div>
            <label className="block text-xs font-black text-slate-400 mb-2 ml-1 uppercase tracking-widest">Security Access</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="input-field"  
              required 
            />
          </div>

          <button type="submit" className="bg-gradient-to-r from-violet-600 to-rose-500 hover:from-violet-500 hover:to-rose-400 text-white font-black w-full py-5 mt-6 rounded-[2rem] transition-all text-xl shadow-2xl shadow-purple-200 active:scale-[0.98] border-b-8 border-black/10 uppercase tracking-widest">
            {isRegistering ? 'Sign Up Now' : 'Sign In'}
          </button>
        </form>

        <div className="mt-10 text-center text-slate-400 font-bold text-sm">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          <button 
            type="button"
            onClick={() => setIsRegistering(!isRegistering)} 
            className="text-rose-500 hover:text-rose-400 font-black ml-2 underline underline-offset-8 decoration-2 uppercase tracking-widest text-xs"
          >
            {isRegistering ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
