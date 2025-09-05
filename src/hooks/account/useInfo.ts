import { useQuery } from '@tanstack/react-query';

interface UserInfo {
  id?: string;
  fullName?: string;
  email?: string;
  avatar?: string;
  role?: string;
  [key: string]: string | number | boolean | null | undefined; // Allow for additional properties
}

const getUserInfoFromStorage = (): UserInfo | null => {
  if (typeof window === 'undefined') {
    return null; // Return null for SSR
  }
  
  try {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error('Error parsing user info from localStorage:', error);
    return null;
  }
};

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfoFromStorage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export const useUserInfoSync = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfoFromStorage,
    staleTime: 0, // Always consider data stale
    gcTime: 0, // Don't cache
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};

// Helper function to manually update user info in localStorage
export const updateUserInfo = (userInfo: UserInfo) => {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (error) {
    console.error('Error saving user info to localStorage:', error);
  }
};

// Helper function to clear user info from localStorage
export const clearUserInfo = () => {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.removeItem('userInfo');
  } catch (error) {
    console.error('Error clearing user info from localStorage:', error);
  }
};

export const useAccessToken = () => {
  return useQuery({
    queryKey: ['accessToken'],
    queryFn: () => {
      if (typeof window !== 'undefined') {
        const accessToken = document.cookie.split('; ').find(row => row.startsWith('accessToken='))?.split('=')[1] || sessionStorage.getItem('accessToken');
        if(!accessToken){
          clearUserInfo();
          document.cookie = '';
          window.location.href = '/signin';
          return null;
        }
        return accessToken;
      }
    },
  });
};
