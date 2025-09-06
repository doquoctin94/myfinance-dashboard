"use client"
import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Badge from "@/components/ui/badge/Badge";
import Pagination from "@/components/tables/Pagination";
import dayjs from "dayjs";
import MenuAction from "@/components/ui/button/MenuAction";
import { useTickets } from "@/hooks/ticket/useTickets";

interface TicketType {
  _id: string;
  name: string;
  email: string;
  title: string;
  images: string[];
  content: string;
  status: string;
  createdAt: Date;
}

const LIMIT = 10;
export default function TicketTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: ticketsData } = useTickets({ page: currentPage, limit: LIMIT });

  const users = useMemo<TicketType[]>(() => {
    return ticketsData ? ticketsData.items : [];
  }, [ticketsData])

  const total = useMemo(() => {
    return ticketsData ? ticketsData.total : 0;
  }, [ticketsData])

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
                Tiêu đề
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nội dung
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
                Thời gian
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
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center bg-brand-500 text-white">
                      {user.name.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {user.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user.title}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-ellipsis overflow-hidden">
                  {user.content}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      user.status === 'NEW' ? "error" : "success"
                    }
                  >
                    {user.status === 'NEW' ? "Mới" : "Đã xử lý"}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.createdAt ? dayjs(user.createdAt).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                  < MenuAction />
                </TableCell>
              </TableRow>
            ))}
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
