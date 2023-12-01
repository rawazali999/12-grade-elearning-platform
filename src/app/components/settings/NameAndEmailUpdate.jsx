"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import sendNotification from "@/lib/sendNotification";
import { getSession } from "next-auth/react";


export default function NameAndEmailUpdate() {
  const { data: session, update } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameAndEmailMessage, setNameAndEmailMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      setEmail(session?.user?.email);
      setName(session?.user?.name);
    };

    fetchData();
  }, []);

  const handleUpdateNameEmail = async () => {
    if (!name || !email) {
      setNameAndEmailMessage("Please fill in all fields");
      return;
    } else {
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

      if (data.message == "nothing") {
        setNameAndEmailMessage("name and email have not been changed ");
      }

      if (data.message == "name updated") {
        setNameAndEmailMessage("account  name updated");
        sendNotification(
          "Account information  Updated",
          "Your account name has been updated.",
          session?.user?.email,
        );
      }

      if (data.error) {
        console.error("Error updating name and email");
        setNameAndEmailMessage("You can't update to this email");
      } else {
        if (data.message == "user updated") {
          update({
            name: name,
            email: email,
          });
          sendNotification(
            "Account Name and Email Updated",
            "Your account information has been updated.",
            session?.user?.email,
          );
        }
      }
    }
  };
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
        className={`mt-1 w-full  rounded-md border border-gray-800 bg-inherit p-2 font-semibold dark:border-gray-100`}
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
      {nameAndEmailMessage && (
        <p className=" mx-auto w-2/3 rounded-md bg-emerald-500 py-2  text-center text-sm">
          {nameAndEmailMessage}
        </p>
      )}

      <button
        onClick={handleUpdateNameEmail}
        className="mt-4 rounded-sm bg-cyan-600 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:border-blue-300 focus:outline-none focus:ring"
      >
        Update Name and Email
      </button>
    </div>
  );
}
