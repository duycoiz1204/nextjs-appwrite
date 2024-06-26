'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import appwriteService from '@/appwrite/config';
import useAuth from '@/context/useAuth';

const LogoutPage = () => {
  const router = useRouter();
  const { setAuthStatus } = useAuth();

  useEffect(() => {
    appwriteService.logout().then(() => {
      setAuthStatus(false);
      router.replace('/');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default LogoutPage;
