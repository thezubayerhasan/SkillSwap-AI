import { createContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';

interface User {
  _id: string;
  name: string;
  email: string;
  university?: string;
  role: string;
  walletBalance: number;
  trustScore?: number;
  avatarUrl?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, university?: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Try to restore session on mount via refresh token cookie
  useEffect(() => {
    const restore = async () => {
      try {
        const res = await authService.refreshToken();
        setAccessToken(res.data.accessToken);
        const me = await authService.getMe(res.data.accessToken);
        setUser(me.data.user);
      } catch {
        // No valid session
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await authService.login({ email, password });
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
  };

  const register = async (name: string, email: string, password: string, university?: string) => {
    const res = await authService.register({ name, email, password, university });
    // Do NOT set user or token yet; wait for OTP verification
    return res.data.user.email;
  };

  const logout = async () => {
    await authService.logout();
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
