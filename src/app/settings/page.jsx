// pages/account-settings.js
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import { getSession } from "next-auth/react";
import sendNotification from "@/lib/sendNotification";
import DeleteUser from "@components/DeleteUser";

const AccountSettings = () => {
  const { data: session, update } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      setEmail(session?.user?.email);
      setName(session?.user?.name);
    };

    fetchData();
  }, []);
  // this update working
  const handleUpdateNameEmail = async () => {
    const response = await fetch(
      `${process.env.BASE_URL}/api/account-settings/update-name-email`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: session?.user?.email,
          name: name,
          email: email,
        }),
      },
    );

    if (response.ok) {
      // update the session object
      update({
        name: name,
        email: email,
      });
      sendNotification({
        title: "Account Name and Email Updated",
        message: "Your account information has been updated.",
        email: session?.user?.email,
      });
    } else {
      console.error("Error updating name and email");
    }
  };

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

  const handleDelete = async () => {
    // Add logic to delete the user account on the server
    // You may want to use an API route for this and handle the logic there

    // Example of using fetch to delete the user account
    const response = await fetch("/api/delete-user", {
      method: "DELETE",
    });

    if (response.ok) {
      // Redirect to the login page or perform other actions after account deletion
    } else {
      // Handle error deleting user account
    }
  };

  return (
    <Layout>
      <div className="m-4 mx-auto mt-20  max-w-md rounded-md p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Account Settings</h2>

        {/* Update Name and Email */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-800 bg-inherit p-2 dark:border-gray-100"
          />

          <label
            htmlFor="email"
            className="mt-4 block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-800 bg-inherit p-2 dark:border-gray-100"
          />
          <span className="m-1 flex text-xs text-gray-400">
            {" "}
            be aware this email will be used for login and get instruction and
            notify about your education...{" "}
          </span>

          <button
            onClick={handleUpdateNameEmail}
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:border-blue-300 focus:outline-none focus:ring"
          >
            Update Name and Email
          </button>
        </div>

        {/* Change Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-800 bg-inherit p-2 dark:border-gray-100"
          />

          <label
            htmlFor="confirmPassword"
            className="mt-4 block text-sm font-medium text-gray-600"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={newPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-800 bg-inherit p-2 dark:border-gray-100"
          />

          <button
            onClick={handleChangePassword}
            className="mt-4 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:border-green-300 focus:outline-none focus:ring"
          >
            Change Password
          </button>
        </div>

         <DeleteUser/>
        
      </div>
    </Layout>
  );
};

export default AccountSettings;
