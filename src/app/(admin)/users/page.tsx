import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import UserTable from "./components/UserTable";

export const metadata: Metadata = {
  title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
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
