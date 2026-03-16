import { FiLogOut, FiShield, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const statCards = [
  {
    title: 'Total Users',
    value: '— coming soon',
    icon: <FiUsers className="h-6 w-6" />,
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Active Exchanges',
    value: '— coming soon',
    icon: <FiTrendingUp className="h-6 w-6" />,
    accent: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Open Disputes',
    value: '— coming soon',
    icon: <FiShield className="h-6 w-6" />,
    accent: 'from-rose-500 to-pink-500',
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

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
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)] backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-white/70">
                Monitor key metrics and keep the marketplace safe and thriving.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                <FiShield className="h-5 w-5" />
                Admin mode
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

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-xl bg-white/10 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-white/15">
              Manage users
            </button>
            <button className="rounded-xl bg-white/10 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-white/15">
              Review disputes
            </button>
            <button className="rounded-xl bg-white/10 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-white/15">
              View reports
            </button>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {statCards.map(card => (
            <div
              key={card.title}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_40px_-15px_rgba(0,0,0,0.7)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_22px_55px_-15px_rgba(0,0,0,0.75)]"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-2xl bg-gradient-to-br p-3 text-white shadow-lg shadow-black/20">
                  {card.icon}
                </div>
                <div className={`rounded-full px-3 py-1 text-xs font-semibold text-white/80 bg-gradient-to-r ${card.accent} bg-clip-text text-transparent`}> 
                  {card.title}
                </div>
              </div>
              <div className="mt-6 text-3xl font-semibold text-white">{card.value}</div>
              <p className="mt-2 text-sm text-white/60">A quick snapshot of the current platform activity.</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
