import React from "react";
import Layout from "@components/Layout";
import { MdNotificationsNone } from "react-icons/md";

export default function page() {
  return (
    <Layout>
      <h1 className="m-2 flex text-3xl ">
        Notifications <MdNotificationsNone />{" "}
      </h1>
    </Layout>
  );
}
