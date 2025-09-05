"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAccessToken } from './useInfo';

export const useCountUsers = () => {
  const  {data: accessToken}  = useAccessToken();
  return useQuery<number>({
    queryKey: ['count-users'],
    queryFn: async () => {
      return axios.get('/v1/user/count-total', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        params: {
          langKey: 'viVN'
        },
      }).then(res => res.data);
    },
    enabled: !!accessToken,
  });
};
