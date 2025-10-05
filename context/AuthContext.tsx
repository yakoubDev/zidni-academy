// context/AuthContext.tsx
'use client';

import { AuthContextType, User } from '@/types';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    async function fetchUser() {
      try {
        const res = await fetch('/api/get-user', {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
  useEffect(() => {

    fetchUser();
  }, []);

    const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        router.push("/login");
        setUser(null);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isLoggedIn: !!user, setUser, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

