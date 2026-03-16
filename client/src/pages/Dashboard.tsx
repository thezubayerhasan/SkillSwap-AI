import { FiCreditCard, FiLogOut, FiShield, FiZap } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-14 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Hello{user ? `, ${user.name}` : ''}.</h1>
              <p className="mt-1 text-sm text-white/70">
                Your hub for tracking balances, trust, and active exchanges.
              </p>
              {/* Bio field */}
              <div className="mt-3">
                <span className="block text-white/80 font-medium">Bio:</span>
                <span className="block text-white/60 text-sm mt-1">
                  {user?.bio && user.bio.trim() !== ''
                    ? user.bio
                    : 'Add a bio to personalize your account!'}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                <FiZap className="h-4 w-4" />
                Skill Boost
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                <FiShield className="h-4 w-4" />
                Verified member
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <FiLogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_40px_-15px_rgba(0,0,0,0.7)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_22px_55px_-15px_rgba(0,0,0,0.75)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white/70">Wallet balance</h3>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {user?.walletBalance ?? 0} credits
                </p>
              </div>
              <span className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 p-3 text-white shadow-lg shadow-black/20">
                <FiCreditCard className="h-6 w-6" />
              </span>
            </div>
            <p className="mt-4 text-sm text-white/60">
              Use earned credits to request help or reward active contributors.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_40px_-15px_rgba(0,0,0,0.7)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_22px_55px_-15px_rgba(0,0,0,0.75)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white/70">Trust score</h3>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {user?.trustScore ?? 0}
                </p>
              </div>
              <span className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 p-3 text-white shadow-lg shadow-black/20">
                <FiShield className="h-6 w-6" />
              </span>
            </div>
            <p className="mt-4 text-sm text-white/60">
              Higher trust means higher visibility and faster matches.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_40px_-15px_rgba(0,0,0,0.7)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_22px_55px_-15px_rgba(0,0,0,0.75)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white/70">Active exchanges</h3>
                <p className="mt-2 text-3xl font-semibold text-white">— coming soon</p>
              </div>
              <span className="rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 p-3 text-white shadow-lg shadow-black/20">
                <FiZap className="h-6 w-6" />
              </span>
            </div>
            <p className="mt-4 text-sm text-white/60">
              Find new skill swaps, manage conversations, and keep momentum going.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
