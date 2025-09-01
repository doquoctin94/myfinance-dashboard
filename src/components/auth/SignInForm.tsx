"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useLogin } from "@/hooks/account/useLogin";
import {  EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useCallback, useState } from "react";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login } = useLogin();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRemember, setIsRemember] = useState<boolean>(false);

  const handleLogin = useCallback(() => {
    if(!email || !password) {
      alert("Vui lòng nhập email và mật khẩu");
      return;
    }

    login({ email, password, isRemember });
  }, [email, login, password, isRemember]);

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Đăng nhập
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Nhập email và mật khẩu để đăng nhập hệ thống!
            </p>
          </div>
          <div>
      
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input placeholder="Nhập email" type="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label>
                    Mật khẩu <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      defaultValue={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isRemember} onChange={setIsRemember} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Giữ phiên đăng nhập
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm" onClick={handleLogin}>
                    Đăng nhập
                  </Button>
                </div>
              </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}
