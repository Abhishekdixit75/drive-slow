"use client";

import { ReactNode } from "react";
import { RadioProvider } from "@/context/RadioContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <RadioProvider>
      {children}
    </RadioProvider>
  );
}
