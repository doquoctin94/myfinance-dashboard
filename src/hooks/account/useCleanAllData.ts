import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAccessToken } from "./useInfo";
import { toast } from "react-toastify";

const useCleanAllData = () => {
    const { data: accessToken } = useAccessToken();

  return useMutation({
    mutationKey: ['clean-all-data'],
    mutationFn: async ({userId}: {userId: string}) => {
      return axios.delete(`/v1/user/${userId}/delete-all-info`, {
        headers: {
          'Authorization': `Bearer ${accessToken}` 
        },
      });
    },
    onSuccess: () => {
      toast.success('Xoá người dùng thành công');
    },
    onError: () => {
      toast.error('Xoá người dùng thất bại');
    },
  });
};

export default useCleanAllData;