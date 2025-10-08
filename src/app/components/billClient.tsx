"use client";

import { useBillPolling } from "../hooks/useBillPolling";

export function BillClient({ code }: { code: string }) {
  useBillPolling(code);
  return null;
}
