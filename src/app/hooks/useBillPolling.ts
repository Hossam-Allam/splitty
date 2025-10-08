"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useBillPolling(billCode: string, interval = 3000) {
  const router = useRouter();

  useEffect(() => {
    let prevData: unknown = null;
    let isActive = true;

    async function poll() {
      if (!isActive) return;
      try {
        const res = await fetch(`/api/poll/${billCode}`, { cache: "no-store" });
        const data = await res.json();

        if (prevData && JSON.stringify(data) !== JSON.stringify(prevData)) {
          router.refresh(); 
        }

        prevData = data;
      } catch (err) {
        console.error("Polling failed:", err);
      } finally {
        setTimeout(poll, interval);
      }
    }

    poll();
    return () => {
      isActive = false;
    };
  }, [billCode, interval, router]);
}
