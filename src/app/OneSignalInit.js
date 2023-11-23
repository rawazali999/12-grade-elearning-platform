"use client";
import OneSignal from "react-onesignal";

async function runOneSignal() {
  await OneSignal.init({
    appId: "80c51936-6644-4d9a-83b1-6e6f8fd5c859",
    allowLocalhostAsSecureOrigin: true,
  });
  OneSignal.Slidedown.promptPush();
}

import React from "react";

export default function OneSignalInit() {
  React.useEffect(() => {
    runOneSignal();
  }, []);
}
