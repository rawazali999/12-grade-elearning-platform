"use client";
// Importing necessary modules
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import getUserId from "@/lib/getUserId";

// Defining the ChangePassword component
export default function ChangePassword() {
  // State variables
  const { data: session } = useSession();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  // Function to handle the change of password
  const handleChangePassword = async () => {
    try {
      if (!newPassword || !confirmPassword) {
        setMessage("Please fill in all fields");
        setMessageType("error");
      } else if (newPassword.length < 8 || confirmPassword.length < 8) {
        setMessage("Password should be at least 8 characters long");
        setMessageType("error");
      } else if (newPassword !== confirmPassword) {
        setMessage("Passwords do not match");
        setMessageType("error");
      } else {
        const userId = await getUserId(session?.user?.email);
        const response = await fetch("/api/account-settings/change-password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            newPassword: newPassword,
          }),
        });

        if (response.ok) {
          setMessage("Password changed successfully");
          setMessageType("success");
        } else {
          // Handle other response statuses (e.g., 400 Bad Request, 500 Internal Server Error)
          const data = await response.json();
          setMessage(
            data.message || "An error occurred while changing the password",
          );
          setMessageType("error");
        }
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setMessage("An unexpected error occurred");
      setMessageType("error");
    }
  };

  // JSX structure of the component
  return (
    <>
      {/* Change Password */}
      <div className="mb-6">
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-600 dark:text-gray-200"
        >
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 w-full rounded-md border border-gray-800 bg-inherit p-2 font-semibold dark:border-gray-100"
        />

        {message && (
          <p
            className={`mt-2 text-center text-sm ${
              messageType === "error" ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleChangePassword}
          className="mt-4 w-full rounded-sm bg-sky-700 px-4 py-2 font-semibold text-white hover:bg-sky-900 focus:border-sky-300 focus:outline-none focus:ring"
        >
          Change Password
        </button>
      </div>
    </>
  );
}
