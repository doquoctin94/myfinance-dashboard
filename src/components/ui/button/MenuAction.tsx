"use client";

import { useState, useRef, useEffect } from "react";

export default function MenuAction() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Đóng popup khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={menuRef}>
            <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 flex items-center justify-center rounded-full border 
                   bg-gray-100 hover:bg-gray-200 
                   dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700"
            >
                <span className="text-xl font-bold text-gray-700 dark:text-gray-200">⋮</span>
            </button>

            {open && (
                <div
                    className="absolute right-0 mt-2 w-36 rounded-lg shadow-lg border p-1 z-50
                     bg-white border-gray-200 
                     dark:bg-gray-800 dark:border-gray-700"
                >
                    <button
                        className="w-full text-left px-3 py-2 rounded-md 
                       hover:bg-gray-100 hover:text-gray-900
                       dark:hover:bg-gray-700 dark:text-gray-200"
                    >
                        👉 Chi tiết
                    </button>
                    <button
                        className="w-full text-left px-3 py-2 rounded-md 
                       hover:bg-gray-100 hover:text-gray-900
                       dark:hover:bg-gray-700 dark:text-gray-200"
                    >
                        ✏️ Cập nhật
                    </button>
                    <button
                        className="w-full text-left px-3 py-2 rounded-md text-red-600
                       hover:bg-gray-100 hover:text-red-700
                       dark:hover:bg-gray-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                        🗑 Xoá
                    </button>
                </div>
            )}
        </div>
    );
}
