"use client";

import React from "react";
import PostBanner from "@/components/WritePost/PostBanner";
import PostMain from "@/components/WritePost/PostMain";
import PostResult from "@/components/WritePost/PostResult";

export default function WritePost() {
  return (
    <>
      <PostBanner />
      <PostMain />
      <PostResult />
    </>
  );
}
