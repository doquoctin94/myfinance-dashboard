"use client";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { updateUserInfo } from './useInfo';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['email-login'],
    mutationFn: async (data: { email: string; password: string; isRemember: boolean }) => {
      return axios.post('/v1/user/email-login', data, {
        params: {
          langKey: 'viVN',
        },
      }).then(res => res.data);
    },
    onSuccess: (data, {isRemember}) => {
      const payload = {
        userInfo: data.userData,
        accessToken: data.accessToken,
      };

      updateUserInfo(payload.userInfo);

      if (isRemember) {
        document.cookie = `accessToken=${data.accessToken}; path=/`;
      } else {
        document.cookie = `accessToken=${data.accessToken}; path=/; expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()}`;
      }

      window.location.href = '/';
    },

    onError: (error: unknown) => {
        if (axios.isAxiosError(error)) {
            alert(error.response?.data?.message);
        } else {
            alert('Đăng nhập thất bại');
        }
    },
  });
};
