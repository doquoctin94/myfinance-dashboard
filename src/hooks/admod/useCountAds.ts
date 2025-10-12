import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAccessToken } from "../account/useInfo";

const useCountAds = (startAt: string, endAt: string) => {
  const { data: accessToken } = useAccessToken();
  return useQuery<{
    totalInterstitialShowing: number;
    totalBannerShowing: number;
    totalClickingAdmod: number;
  }>({
    queryKey: ['count-ads'],
    queryFn: ()  => {
      return axios.get(`/v1/admod?startAt=${startAt}&endAt=${endAt}`, {
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

export default useCountAds;