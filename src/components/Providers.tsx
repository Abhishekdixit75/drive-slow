"use client";

/**
 * Wrapper component to inject global React Context Providers (like RadioContext) into the component tree.
 */

import { ReactNode } from "react";
import { RadioProvider } from "@/context/RadioContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <RadioProvider>
      {children}
    </RadioProvider>
  );
}
