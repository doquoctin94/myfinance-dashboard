import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAccessToken } from "./useInfo";
import { toast } from "react-toastify";

const useSendNotiToUsers = () => {
    const { data: accessToken } = useAccessToken();

  return useMutation({
    mutationKey: ['send-noti-to-users'],
    mutationFn: async ({androidChecked, iosChecked, updateAppChecked, appVersion, title, content}: {androidChecked: boolean, iosChecked: boolean, updateAppChecked: boolean, appVersion: string, title: string, content: string}) => {
      return axios.post(`/v1/firebase/send-noti-to-users`, {
        androidChecked,
        iosChecked,
        appVersion,
        type: !updateAppChecked ? 'NORMAL' : 'UPGRADE',
        title,
        content,
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}` 
        },
      });
    },
    onSuccess: () => {
      toast.success('Gửi thông báo đến người dùng thành công');
    },
    onError: () => {
      toast.error('Gửi thông báo đến người dùng thất bại');
    },
  });
};

export default useSendNotiToUsers;