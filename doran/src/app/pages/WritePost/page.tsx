"use client";

import React from "react";
import PostBanner from "@/app/components/WritePost/PostBanner";
import PostMain from "@/app/components/WritePost/PostMain";
import PostResult from "@/app/components/WritePost/PostResult";

export default function WritePost() {
  return (
    <>
      <PostBanner />
      <PostMain />
      <PostResult />
    </>
  );
}
