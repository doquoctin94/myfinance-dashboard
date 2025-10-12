"use client";

import useCountAds from "@/hooks/admod/useCountAds";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlyTarget() {
  const startAt = dayjs().startOf('month').format('YYYY-MM-DD');
  const endAt = dayjs().endOf('month').format('YYYY-MM-DD');
  const { data: countAds } = useCountAds(startAt, endAt);

  const target = 200000;
  const totalInterstitialShowing = useMemo(() => countAds?.totalInterstitialShowing || 0, [countAds]);
  const totalBannerShowing = useMemo(() => countAds?.totalBannerShowing || 0, [countAds]);
  const totalClickingAdmod = useMemo(() => countAds?.totalClickingAdmod || 0, [countAds]);

  const series = [Math.round((totalInterstitialShowing + totalBannerShowing + totalClickingAdmod) / target) * 100];

  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Mục tiêu quảng cáo
            </h3>
            <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
              Mục tiêu quảng cáo bạn đã đặt cho mỗi tháng
            </p>
          </div>

        </div>
        <div className="relative ">
          <div className="max-h-[330px]">
            <ReactApexChart
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>
        </div>
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          Tháng này đã đạt được {(totalBannerShowing + totalInterstitialShowing).toLocaleString()} lượt hiển thị và {totalClickingAdmod.toLocaleString()} lượt click, tổng cộng {totalInterstitialShowing + totalBannerShowing + totalClickingAdmod} lượt.
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Banner
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {totalBannerShowing.toLocaleString()}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Interstitial
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {totalInterstitialShowing.toLocaleString()}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Click
          </p>
          <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
            {totalClickingAdmod.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
