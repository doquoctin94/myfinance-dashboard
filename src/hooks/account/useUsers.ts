"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAccessToken } from './useInfo';

export const useUsers = ({page, limit}: {page: number, limit: number}) => {
  const  {data: accessToken}  = useAccessToken();
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: async () => {
      return axios.get('/v1/user', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        params: {
          langKey: 'viVN',
          offset: (page - 1) * limit,
          limit
        },
      }).then(res => res.data);
    },
    enabled: !!accessToken,
  });
};
