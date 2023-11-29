import React from "react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import getUserId from "@/lib/getUserId";

export default function DeleteUser() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const { data: session } = useSession();

  const handleDelete = async () => {
    const userId = await getUserId(session?.user?.email);
    if (enteredEmail === session.user.email) {
      // Delete user from database
      await fetch("/api/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });

      // Sign out user and redirect to login page
      signOut({ callbackUrl: "/login" });
    }
  };
  return (
    <div className="mt-8">
      <p className="font-medium text-red-500">Danger Zone</p>
      <button
        onClick={
          isDeleting ? () => setIsDeleting(false) : () => setIsDeleting(true)
        }
        className="text-red-500 hover:underline focus:outline-none"
      >
        Delete Account
      </button>

      {isDeleting && (
        <div className="mt-4">
          <p className="text-gray-600">
            Are you sure you want to delete your account? this action can not be
            undone,all your data will be deleted.
          </p>
          <button
            onClick={
              confirmEmail
                ? () => setConfirmEmail(false)
                : () => setConfirmEmail(true)
            }
            className="mt-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:border-red-300 focus:outline-none focus:ring"
          >
            Confirm Delete
          </button>
          {confirmEmail ? (
            <div className="mt-2 flex flex-col">
              <p className="mt-2 text-gray-600">
                Please enter your email to confirm
              </p>
              <input
                type="email"
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.target.value)}
                className="mt-2 rounded-md border bg-inherit px-4 py-2"
                placeholder="Enter your email to confirm"
              />
              <button
                onClick={handleDelete}
                className="mt-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:border-red-300 focus:outline-none focus:ring"
              >
                Delete Account
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
