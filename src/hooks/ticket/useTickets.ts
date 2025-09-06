"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAccessToken } from '../account/useInfo';

export const useTickets = ({page, limit}: {page: number, limit: number}) => {
  const  {data: accessToken}  = useAccessToken();
  return useQuery({
    queryKey: ['tickets', page],
    queryFn: async () => {
      return axios.get('/v1/ticket', {
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
