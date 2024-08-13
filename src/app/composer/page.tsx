"use client";

import dynamic from "next/dynamic";
import type React from "react";
/* import Composer from "@/components/element-composer/Composer"; */

const Composer = dynamic(
  () => import("@/components/element-composer/Composer"),
  {
    ssr: false,
  }
);

export default function Editor() {
  return <Composer />;
}
