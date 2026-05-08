import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bus, UserPlus } from 'lucide-react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Store the user's full name
    localStorage.setItem('guzo_auth', 'true');
    localStorage.setItem('guzo_user_name', name);
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8 border border-[var(--color-guzo-yellow-100)]">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[var(--color-guzo-yellow-500)] rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm">
            <Bus size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-guzo-yellow-950)]">Join ጉዞ Smart</h2>
          <p className="text-[var(--color-guzo-yellow-700)] font-medium mt-1">Create an account to save routes</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-[var(--color-guzo-yellow-950)] mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-guzo-yellow-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-400)] bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-950)] transition-all placeholder-gray-400"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[var(--color-guzo-yellow-950)] mb-1">Email or Phone</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-guzo-yellow-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-400)] bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-950)] transition-all placeholder-gray-400"
              placeholder="Enter your email or phone"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[var(--color-guzo-yellow-950)] mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[var(--color-guzo-yellow-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-guzo-yellow-400)] bg-[var(--color-guzo-yellow-50)] text-[var(--color-guzo-yellow-950)] transition-all placeholder-gray-400"
              placeholder="Create a password (min. 6 characters)"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--color-guzo-yellow-500)] hover:bg-[var(--color-guzo-yellow-600)] text-white font-bold py-3.5 rounded-xl transition-colors shadow-md flex justify-center items-center group mt-2"
          >
            Create Account
            <UserPlus size={18} className="ml-2" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-[var(--color-guzo-yellow-700)]">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[var(--color-guzo-yellow-950)] hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
