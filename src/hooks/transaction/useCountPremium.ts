import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "../account/useInfo";
import axios from "axios";

const useCountPremium = (startAt: string, endAt: string) => {
  const { data: accessToken } = useAccessToken();
  return useQuery<{
    countMonthly: number;
    countYearly: number;
  }>({
    queryKey: ['count-premium'],
    queryFn: async () => {
      return axios.get(`/v1/payment?startAt=${startAt}&endAt=${endAt}`, {
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

export default useCountPremium;