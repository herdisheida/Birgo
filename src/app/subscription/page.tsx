"use client";

import { useRouter } from "next/navigation";
import { SubscriptionSettings } from "@birgo/components/SubscriptionSettings";

export default function Subscription() {
  const router = useRouter();

  return (
    <SubscriptionSettings
      onBack={() => router.push("/selection")}
      onSave={() => router.push("/checkout")}
    />
  );
}
