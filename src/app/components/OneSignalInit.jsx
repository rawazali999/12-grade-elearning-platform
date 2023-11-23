"use client";
import { useEffect } from "react";

function OneSignalInit() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    script.defer = true;

    const initOneSignal = document.createElement("script");
    initOneSignal.innerHTML = `
      window.OneSignalDeferred = window.OneSignalDeferred || [];
      OneSignalDeferred.push(function(OneSignal) {
        OneSignal.init({
          appId: "80c51936-6644-4d9a-83b1-6e6f8fd5c859",
          safari_web_id: "web.onesignal.auto.68a78e72-ca6b-43d3-aa15-83c87cfb9ced",
          notifyButton: {
            enable: true,
          },
        });
      });
    `;

    document.head.appendChild(script);
    document.head.appendChild(initOneSignal);
  }, []);

  return null;
}

export default OneSignalInit;
