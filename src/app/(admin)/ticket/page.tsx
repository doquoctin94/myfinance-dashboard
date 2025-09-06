import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import TicketTable from "./components/TicketTable";

export const metadata: Metadata = {
  title: "MyFi AI - Danh sách yêu cầu hỗ trợ",
  description: "Danh sách yêu cầu hỗ trợ",
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Danh sách yêu cầu hỗ trợ" />
      <div className="space-y-6">
        <ComponentCard title="Danh sách yêu cầu hỗ trợ">
          <TicketTable />
        </ComponentCard>
      </div>
    </div>
  );
}
