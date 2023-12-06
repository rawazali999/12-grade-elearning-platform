"use client";
// Importing necessary modules
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import sendNotification from "@/lib/sendNotification";
import { getSession } from "next-auth/react";

// Defining the NameAndEmailUpdate component
export default function NameAndEmailUpdate() {
  // State variables
  const { data: session, update } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      setEmail(session?.user?.email);
      setName(session?.user?.name);
    };
    fetchData();
  }, []);

  // Function to handle the update of name and email
  const handleUpdateNameEmail = async () => {
    if (!name || !email) {
      setMessage("Please fill in all fields");
      setMessageType("error");
    } else {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}/api/account-settings/update-name-email`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: session?.user?.email,
              userName: session?.user?.name,
              name: name,
              email: email,
            }),
          },
        );
        const data = await response.json();

        if (data.message === "nothing") {
          setMessage("Name and email have not been changed");
          setMessageType("info");
        } else if (
          data.message === "name updated" ||
          data.message === "user updated"
        ) {
          update({
            name: name,
            email: email,
          });
          sendNotification(
            "Account Information Updated",
            `Your account information has been updated to ${name} and ${email}`,
            session?.user?.email,
          );
          setMessage("Account name and email updated");
          setMessageType("success");
        } else if (data.error) {
          console.error("Error updating name and email:", data.error);
          setMessage("An error occurred while updating name and email");
          setMessageType("error");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        setMessage("An unexpected error occurred");
        setMessageType("error");
      }
    }
  };

  // JSX structure of the component
  return (
    <div className="mb-6">
      <label
        htmlFor="name"
        className="block text-sm font-medium text-gray-600 dark:text-gray-200"
      >
        Name
      </label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`mt-1 w-full rounded-md border border-gray-800 bg-inherit p-2 font-semibold dark:border-gray-100`}
      />

      <label
        htmlFor="email"
        className="mt-4 block text-sm font-medium text-gray-600 dark:text-gray-200"
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
      {message && (
        <p
          className={`mx-auto w-2/3 rounded-md  py-2 text-center text-sm ${
            messageType === "success"
              ? "text-emerald-500 "
              : messageType === "info"
              ? "text-blue-500 "
              : messageType === "error"
              ? "text-red-500 "
              : ""
          }`}
        >
          {message}
        </p>
      )}
      <button
        onClick={handleUpdateNameEmail}
        className="mt-4 w-full rounded-sm bg-cyan-600 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:border-blue-300 focus:outline-none focus:ring"
      >
        Update Name and Email
      </button>
    </div>
  );
}
