"use client"
import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Badge from "@/components/ui/badge/Badge";
import Image from "next/image";
import Pagination from "@/components/tables/Pagination";
import { useUsers } from "@/hooks/account/useUsers";
import { getImageApp } from "@/common/helper";
import dayjs from "dayjs";
import MenuAction from "@/components/user/MenuAction";
import useCleanAllData from "@/hooks/account/useCleanAllData";
import { toast } from "react-toastify";

export interface UserType {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  active: boolean;
  visitedAt: Date;
  adsLevel: number;
  createdAt: Date;
  inviteCodeForMe: string;
  proExpiredAt: Date;
  isCancelRequest: boolean;
  fcmTokens: {
    _id: string;
    appVersion: string,
    isRemind: boolean,
    platform: string,
  }[]
}

const LIMIT = 6;
export default function UserTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: usersData } = useUsers({ page: currentPage, limit: LIMIT });
  const { mutate: cleanAllData } = useCleanAllData();

  const users = useMemo<UserType[]>(() => {
    return usersData ? usersData.items : [];
  }, [usersData])

  const total = useMemo(() => {
    return usersData ? usersData.total : 0;
  }, [usersData])

  const onDetail = useCallback((user: UserType) => {
    toast.success(`Chi tiết người dùng ${user.fullName}`);
  }, []);

  const onUpdate = useCallback((user: UserType) => {
    console.log(user);
  }, []);

  const onDelete = useCallback((user: UserType) => {
    const isConfirmed = confirm(`Bạn có chắc chắn muốn xoá ${user.fullName} này không?`);
    if (isConfirmed) {
      cleanAllData({ userId: user._id });
    }
  }, [cleanAllData]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Người dùng
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Platform
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Quảng cáo
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Trạng thái
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Premium
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Truy cập lần cuối
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Yêu cầu xoá
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Hành động
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {users.map((user) => {
              const platform = user.fcmTokens.map(token => `${token.platform}${token.appVersion}${token.isRemind ? " (Đã nhắc)" : ""}`).join(", ");
              return (
                <TableRow key={user._id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          width={40}
                          height={40}
                          src={getImageApp(user.avatar)}
                          alt="image-user"
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {user.fullName}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {platform}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                    {user.adsLevel}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        user.active ? "success" : "warning"
                      }
                    >
                      {user.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {user.proExpiredAt ? dayjs(user.proExpiredAt).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {user.visitedAt ? dayjs(user.visitedAt).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        user.isCancelRequest ? "error" : "success"
                      }
                    >
                      {user.isCancelRequest ? "Có" : "Ko"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    < MenuAction item={user} onDetail={onDetail} onUpdate={onUpdate} onDelete={onDelete} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

      </div>
      <Pagination
        limit={LIMIT}
        totalItems={total}
        currentPage={currentPage}
        totalPages={total / LIMIT}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
