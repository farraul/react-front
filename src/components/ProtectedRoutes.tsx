import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useApp';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { userInfo } = useAppSelector((state) => state.user);
  if (!userInfo) return <Navigate to="/login" />;

  return <div>{children}</div>;
}
