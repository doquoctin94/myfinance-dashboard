import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import UserTable from "./components/UserTable";

export const metadata: Metadata = {
  title: "MyFi AI - Danh sách người dùng",
  description: "Danh sách người dùng",
};

export default function Users() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Danh sách người dùng" />
      <div className="space-y-6">
        <ComponentCard title="Danh sách người dùng">
          <UserTable />
        </ComponentCard>
      </div>
    </div>
  );
}
