"use client";
import Layout from "@components/Layout";
// import sendNotification from "@/lib/sendNotification";
import DeleteUser from "@components/settings/DeleteUser";
import NameAndEmailUpdate from "@components/settings/NameAndEmailUpdate";
import ChangePassword from "@components/settings/ChangePassword";

const AccountSettings = () => {
  return (
    <Layout>
      <div className="m-4 mx-auto mt-20 max-w-md space-y-10 rounded-md p-6 font-semibold shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Account Settings</h2>

        <NameAndEmailUpdate />
        <hr />

        <ChangePassword />
        <hr />
        <DeleteUser />
      </div>
    </Layout>
  );
};

export default AccountSettings;
