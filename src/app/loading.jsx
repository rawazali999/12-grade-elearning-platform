import React from "react";
import Layout from "@components/Layout";
import Spinner from "@components/Spinner";

export default function loading() {
  return (
    <Layout>
      <div className=" flex h-screen items-center justify-center ">
        <Spinner />
      </div>
    </Layout>
  );
}
