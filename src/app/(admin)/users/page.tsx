import ComponentCard from "@/components/common/ComponentCard";
import { Metadata } from "next";
import React from "react";
import UserTable from "./components/UserTable";

export const metadata: Metadata = {
  title: "MyFi AI - Danh sách người dùng",
  description: "Danh sách người dùng",
};

export default function Users() {
  return (
    <div className="space-y-6">
      <ComponentCard title="Danh sách người dùng">
        <UserTable />
      </ComponentCard>
    </div>

  );
}
