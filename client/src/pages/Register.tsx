import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        university: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(form.name, form.email, form.password, form.university);
            toast.success('Account created! Please confirm OTP.');
            navigate('/otp-confirm', { state: { email: form.email } });
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : 'Registration failed. Please try again.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '80px auto', padding: '0 16px' }}>
            <h1>Create Account</h1>
            <p>Join SkillSwap AI and start exchanging skills</p>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label>Full Name</label><br />
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label>Email</label><br />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label>Password</label><br />
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        placeholder="At least 6 characters"
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                </div>

                <div style={{ marginBottom: 16 }}>
                    <label>University (optional)</label><br />
                    <input
                        type="text"
                        name="university"
                        value={form.university}
                        onChange={handleChange}
                        placeholder="Your university"
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{ width: '100%', padding: 10, cursor: 'pointer' }}
                >
                    {loading ? 'Creating account...' : 'Create Account'}
                </button>
            </form>

            <p style={{ marginTop: 16 }}>
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    );
};

export default Register;
