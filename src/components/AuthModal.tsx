import React, { useState } from 'react';
import { X, User, Mail, Lock, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string } | null;
  onLogin: (name: string, email: string) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('27-arjun.yadav@fiib.edu.in');
  const [name, setName] = useState('Arjun Yadav');
  const [password, setPassword] = useState('••••••••');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name, email);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {user ? (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto text-xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
              <div className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                Aqua Bliss Club Member
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <button
                onClick={onLogout}
                className="w-full py-2.5 px-4 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {isRegister ? 'Join Aqua Bliss' : 'Welcome Back'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isRegister
                  ? 'Create an account to track orders and earn hydration rewards.'
                  : 'Log in to access your previous orders and exclusive discounts.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                      placeholder="Arjun Yadav"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    placeholder="you@domain.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 hover:bg-sky-600 text-white font-bold rounded-xl text-sm transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 mt-2"
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Logged In!</span>
                  </>
                ) : (
                  <span>{isRegister ? 'Create Account' : 'Log In'}</span>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-xs text-sky-600 hover:text-sky-800 font-semibold cursor-pointer"
              >
                {isRegister
                  ? 'Already have an account? Log In'
                  : "Don't have an account? Create one"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
