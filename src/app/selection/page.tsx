"use client";

import { useRouter } from "next/navigation";
import { ProductSelection } from "../components/ProductSelection";

export default function SelectionPage() {
  const router = useRouter();

  return (
    <ProductSelection
      onBack={() => router.push("/")}
      onContinue={() => router.push("/subscription")}
    />
  );
}
