"use client";
import Layout from "@components/Layout";
// import sendNotification from "@/lib/sendNotification";
import DeleteUser from "@components/settings/DeleteUser";
import NameAndEmailUpdate from "@components/settings/NameAndEmailUpdate";
import ChangePassword from "@components/settings/ChangePassword";
import { useSession } from "next-auth/react";
import UserInfo from "@components/UserInfo";

const AccountSettings = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <Layout>
      <div className="m-4 mx-auto mt-20 max-w-md space-y-10 rounded-md p-6 font-semibold shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Account Settings</h2>
        {/* {session?.provider === "google" ? null : ( */}
        <>
          <UserInfo />
          <NameAndEmailUpdate />
          <hr />
          <ChangePassword />
          <hr />
        </>
        {/* )} */}
        <DeleteUser />
      </div>
    </Layout>
  );
};

export default AccountSettings;
