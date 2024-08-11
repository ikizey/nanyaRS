"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useDetails() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isDetailsPanelOpen = pathname.startsWith("/details");

  function openDetails(newCharacterId: string) {
    router.push(`/details/${newCharacterId}?${searchParams}`);
  }

  function closeDetails() {
    if (isDetailsPanelOpen) {
      router.push(`/?${searchParams}`);
    }
  }

  return {
    isDetailsPanelOpen,
    openDetails,
    closeDetails,
  };
}
