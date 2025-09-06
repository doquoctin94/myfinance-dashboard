import type { Metadata } from "next";
import { CustomerMetrics } from "@/components/home/CustomerMetrics";
import React from "react";
import MonthlyTarget from "@/components/home/MonthlyTarget";
import MonthlySalesChart from "@/components/home/MonthlySalesChart";
import StatisticsChart from "@/components/home/StatisticsChart";
import RecentOrders from "@/components/home/RecentOrders";
import DemographicCard from "@/components/home/DemographicCard";

export const metadata: Metadata = {
  title:
    "MyFi AI - Sổ thu chi thông minh",
  description: "Trang quản lý thông tin MyFi AI",
};

export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <CustomerMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}
