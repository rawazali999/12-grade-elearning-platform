"use client";
// Importing necessary modules
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import getUserId from "@/lib/getUserId";

// Defining the DeleteUser component
export default function DeleteUser() {
  // State variables
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const { data: session } = useSession();
  const [message, setMessage] = useState(null);

  // Function to handle the account deletion
  const handleDelete = async () => {
    try {
      const userId = await getUserId(session?.user?.email);

      if (!confirmEmail) {
        setConfirmEmail(true);
      } else if (enteredEmail === session.user.email) {
        // Delete user from the database
        await fetch(
          `${process.env.BASE_URL}/api/account-settings/delete-user`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userId }),
          },
        );

        // Sign out the user and redirect to the login page
        signOut({ callbackUrl: "/login" });
      } else {
        setMessage("Email does not match");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setMessage("An unexpected error occurred");
    }
  };

  // JSX structure of the component
  return (
    <div className="mt-8">
      <p className="font-medium text-red-500">Danger Zone</p>
      <button
        onClick={() => setIsDeleting((prev) => !prev)}
        className="text-red-500 underline focus:outline-none"
      >
        Delete Account
      </button>

      {isDeleting && (
        <div className="mt-4">
          <p className="">
            Are you sure you want to delete your account? This action cannot be
            undone, and all your data will be deleted.
          </p>
          <button
            onClick={() => setConfirmEmail((prev) => !prev)}
            className="mt-2 rounded-sm bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 focus:border-red-300 focus:outline-none focus:ring"
          >
            Confirm Delete
          </button>

          {confirmEmail && (
            <div className="mt-2 flex flex-col">
              <p className="mt-2">Please enter your email to confirm</p>
              <input
                type="email"
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.target.value)}
                className="mt-2 rounded-md border bg-inherit px-4 py-2"
                placeholder="Enter your email to confirm"
              />

              {message && (
                <p className="mt-2 text-center text-sm text-red-500">
                  {message}
                </p>
              )}
              <button
                onClick={handleDelete}
                className="mt-2 rounded-sm bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:border-red-300 focus:outline-none focus:ring"
              >
                Delete Account
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
