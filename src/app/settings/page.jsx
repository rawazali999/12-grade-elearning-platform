// pages/account-settings.js
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
// import sendNotification from "@/lib/sendNotification";
import DeleteUser from "@components/settings/DeleteUser";
import NameAndEmailUpdate from "@components/settings/NameAndEmailUpdate";

const AccountSettings = () => {
  const { data: session } = useSession();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // this update working

  const handleChangePassword = async () => {
    const response = await fetch("/api/account-settings/change-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: session?.user?.email,
        confirmPassword: confirmPassword,
        newPassword: newPassword,
      }),
    });

    if (response.ok) {
      // Password changed successfully
    } else {
      // Handle error changing the password
    }
  };

  return (
    <Layout>
      <div className="m-4 mx-auto mt-20  max-w-md rounded-md p-6 font-semibold shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Account Settings</h2>

        <NameAndEmailUpdate />

        {/* Change Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 dark:text-gray-200"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-800 bg-inherit p-2 font-semibold dark:border-gray-100"
          />

          <label
            htmlFor="confirmPassword"
            className="mt-4 block text-sm font-medium text-gray-600 dark:text-gray-200"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={newPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-800 bg-inherit p-2 font-semibold dark:border-gray-100"
          />

          <button
            onClick={handleChangePassword}
            className="mt-4 rounded-sm bg-sky-700 px-4 py-2 font-semibold text-white hover:bg-sky-900 focus:border-sky-300 focus:outline-none focus:ring"
          >
            Change Password
          </button>
        </div>

        <DeleteUser />
      </div>
    </Layout>
  );
};

export default AccountSettings;
