import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
  switchDemoRole: (role: UserRole) => void;
}

const DEMO_USERS: Record<UserRole, User> = {
  ADMIN: {
    id: 'user-admin-1',
    name: 'Quản Trị Viên (Admin)',
    email: 'admin@luxebistro.vn',
    phone: '0988 999 888',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    createdAt: '2025-01-01'
  },
  STAFF: {
    id: 'user-staff-1',
    name: 'Nhân Viên Bếp & Phục Vụ',
    email: 'staff@luxebistro.vn',
    phone: '0977 111 222',
    role: 'STAFF',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200',
    createdAt: '2025-02-15'
  },
  CUSTOMER: {
    id: 'user-cust-1',
    name: 'Nguyễn Văn Minh',
    email: 'minh.nguyen@gmail.com',
    phone: '0912 345 678',
    role: 'CUSTOMER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    addresses: [
      {
        id: 'addr-1',
        title: 'Nhà Riêng',
        recipientName: 'Nguyễn Văn Minh',
        phone: '0912 345 678',
        street: 'Số 12, Ngõ 45 Lý Nam Đế',
        district: 'Hoàn Kiếm',
        city: 'Hà Nội',
        isDefault: true
      }
    ],
    createdAt: '2025-03-10'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('luxebistro_user');
      return saved ? JSON.parse(saved) : DEMO_USERS.CUSTOMER; // Default logged in as customer for instant experience
    } catch {
      return DEMO_USERS.CUSTOMER;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('luxebistro_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('luxebistro_user');
    }
  }, [user]);

  const login = async (email: string): Promise<boolean> => {
    // Check if matching admin email
    if (email.toLowerCase().includes('admin')) {
      setUser(DEMO_USERS.ADMIN);
    } else if (email.toLowerCase().includes('staff')) {
      setUser(DEMO_USERS.STAFF);
    } else {
      setUser({
        ...DEMO_USERS.CUSTOMER,
        email: email,
        name: email.split('@')[0]
      });
    }
    return true;
  };

  const register = async (name: string, email: string, phone: string): Promise<boolean> => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone,
      role: 'CUSTOMER',
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updatedData });
  };

  const switchDemoRole = (role: UserRole) => {
    setUser(DEMO_USERS[role]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        isStaff: user?.role === 'STAFF',
        login,
        register,
        logout,
        updateUser,
        switchDemoRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
