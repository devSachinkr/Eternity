"use client";
import Spinner from "@/components/global/spinner";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSetting } from "@/hooks/settings";
import React from "react";

const SettingPage = () => {
  const { firstView, switchState, setFirstView, loading } = useSetting();
  return (
    <Spinner
      className="w-full h-full flex items-center justify-center"
      loading={loading}
    >
      <div>
        <h2 className="text-2xl font-bold mt-4">Video Sharing Settings</h2>
        <p className="text-sm text-gray-500 mt-2">
          Enable this feature will send you a notification when someone share
          watched your video for the first time.
        </p>
        <Label className="flex items-center gap-x-3 mt-4 text-md">
          Enable First View
          <Switch
            className="data-[state=checked]:bg-demonGreen"
            checked={firstView}
            onCheckedChange={switchState}
            onClick={() => setFirstView((prev) => !prev)}
            disabled={firstView === undefined || loading}
          />
        </Label>
      </div>
    </Spinner>
  );
};

export default SettingPage;
