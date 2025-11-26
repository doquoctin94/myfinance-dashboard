"use client";
import React, { useCallback, useState } from "react";
import Label from "../form/Label";
import ComponentCard from "../common/ComponentCard";
import Checkbox from "../form/input/Checkbox";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import Button from "../ui/button/Button";
import { ChatIcon } from "@/icons";
import useSendNotiToUsers from "@/hooks/account/useSendNotiToUsers";

export default function PushNotiUser() {
  const { mutate: sendNotiToUsers } = useSendNotiToUsers();

  const [androidChecked, setAndroidChecked] = useState(false);
  const [iosChecked, setIosChecked] = useState(false);
  const [updateAppChecked, setUpdateAppChecked] = useState(false);
  const [appVersion, setAppVersion] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const sendNotification = useCallback(() => {
    const confirm = window.confirm("Bạn muốn gửi thông báo đến cho người dùng?");
    if (confirm) {
      console.log("sendNotification", androidChecked, iosChecked, appVersion, title, content);
      sendNotiToUsers({ androidChecked, iosChecked, updateAppChecked, appVersion, title, content });
    }
  }, [androidChecked, iosChecked, updateAppChecked, appVersion, title, content, sendNotiToUsers]);

  return (
    <ComponentCard title="Gửi thông báo cho user">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Checkbox checked={androidChecked} onChange={setAndroidChecked} />
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Android
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox checked={iosChecked} onChange={setIosChecked} />
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              IOS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox checked={updateAppChecked} onChange={setUpdateAppChecked} />
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-400">
              Update App
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor="tm">Phiên bản ứng dụng hiện tại</Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Phiên bản ứng dụng hiện tại"
              className="pl-[62px]"
              defaultValue={appVersion}
              onChange={(e) => setAppVersion(e.target.value)}
            />
            <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
              <span className="text-gray-500 dark:text-gray-400">v</span>
            </span>
          </div>
        </div>
        <div>
          <Label>Tiêu đề thông báo</Label>
          <Input type="text" placeholder="Tiêu đề thông báo" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label>Nội dung thông báo</Label>
          <TextArea
            rows={6}
            placeholder="Nội dung thông báo"
            value={content}
            onChange={(value) => setContent(value)}
          />
        </div>
        <div className="flex justify-end">
          <Button size="sm" variant="outline" startIcon={<ChatIcon />} onClick={sendNotification}>
            Gửi thông báo
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
}
