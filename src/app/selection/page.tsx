"use client";

import { useRouter } from "next/navigation";
import { ProductSelectionProps } from "@birgo/types";
import { ProductSelection } from "@birgo/components/ProductSelection";

export default function SelectionPage() {
  const router = useRouter();

  return (
    <ProductSelection
      onBack={() => router.push("/")}
      onContinue={() => router.push("/subscription")}
    />
  );
}
