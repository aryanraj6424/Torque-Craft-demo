import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'superadmin' | 'admin' | 'dealer' | 'distributor' | 'customer';

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  approved?: boolean;
  garage?: any[];
  wishlist?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isBusiness: boolean;
  isCustomer: boolean;
  verifyMFA: (code: string) => Promise<boolean>;
  verifyOTP: (code: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('torque_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, role: UserRole) => {
    // Simulate API call and role-based logic
    const mockUser: User = {
      id: Math.floor(Math.random() * 1000),
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      role: role,
      approved: role === 'dealer' || role === 'distributor' ? true : undefined, // In reality, this would be checked on backend
      garage: role === 'customer' ? [] : undefined,
      wishlist: role === 'customer' ? [] : undefined,
    };

    // For dealers/distributors, simulate approval check
    if ((role === 'dealer' || role === 'distributor') && !mockUser.approved) {
      throw new Error('Your account is pending approval by an administrator.');
    }

    setUser(mockUser);
    localStorage.setItem('torque_user', JSON.stringify(mockUser));
  };

  const signup = async (name: string, email: string, role: UserRole) => {
    // Simulate registration logic
    const mockUser: User = {
      id: Math.floor(Math.random() * 1000),
      name: name,
      email: email,
      role: role,
      approved: role === 'customer' ? true : false, // Business accounts need approval
      garage: role === 'customer' ? [] : undefined,
      wishlist: role === 'customer' ? [] : undefined,
    };

    if (role === 'customer') {
      setUser(mockUser);
      localStorage.setItem('torque_user', JSON.stringify(mockUser));
    } else {
      // For business accounts, we just simulate the application submission
      console.log(`Application submitted for ${role}:`, mockUser);
      // In a real app, we wouldn't log them in immediately
    }
  };

  const verifyMFA = async (code: string) => {
    // Simulate MFA verification
    return code === '123456';
  };

  const verifyOTP = async (code: string) => {
    // Simulate OTP verification
    return code === '654321';
  };

  const logout = () => {
    // Clear all proprietary data and caches
    setUser(null);
    localStorage.removeItem('torque_user');
    localStorage.removeItem('torque_cart');
    localStorage.removeItem('torque_pricing_cache');
    // Redirect logic handled in components
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup,
      logout, 
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin' || user?.role === 'superadmin',
      isSuperAdmin: user?.role === 'superadmin',
      isBusiness: user?.role === 'dealer' || user?.role === 'distributor',
      isCustomer: user?.role === 'customer',
      verifyMFA,
      verifyOTP
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
