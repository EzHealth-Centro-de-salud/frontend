'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter(  );
  const [isLoggingOut, setIsLoggingOut] = useState(true);

  useEffect(() => {
    // Remove the 'rut' variable from localStorage
    localStorage.removeItem('rut');
    localStorage.removeItem('access_token');
    
    // Redirect to the homepage
    router.push('/');
  }, [router]);

  useEffect(() => {
    if (!isLoggingOut) {
      router.push('/');
    }
  }, [isLoggingOut, router]);

  return <div></div>;
};

export default Logout;
