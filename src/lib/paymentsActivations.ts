// Local storage helpers for activations of fees and services per student
// Default is disabled; we only store active entries

const isBrowser = typeof window !== "undefined";

function read<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

function write<T>(key: string, value: T) {
  if (!isBrowser) return;
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

const KEYS = {
  feeActivations: "studentsFeeActivations", // array of "studentId|feeId"
  serviceActivations: "studentsServiceActivations", // array of "studentId|serviceId|mois"
} as const;

// Fees activations
export function getActiveFeeKeys(): string[] {
  return read<string[]>(KEYS.feeActivations, []);
}

export function setActiveFeeKeys(keys: string[]) {
  write(KEYS.feeActivations, Array.from(new Set(keys)));
}

export function feeKey(studentId: string, feeId: string) {
  return `${studentId}|${feeId}`;
}

export function isFeeActive(studentId: string, feeId: string) {
  const k = feeKey(studentId, feeId);
  return getActiveFeeKeys().includes(k);
}

export function setFeeActive(studentId: string, feeId: string, active: boolean) {
  const k = feeKey(studentId, feeId);
  const list = new Set(getActiveFeeKeys());
  if (active) list.add(k); else list.delete(k);
  setActiveFeeKeys(Array.from(list));
  return active;
}

export function bulkSetFeeActive(studentIds: string[], feeId: string, active: boolean) {
  const list = new Set(getActiveFeeKeys());
  for (const sid of studentIds) {
    const k = feeKey(sid, feeId);
    if (active) list.add(k); else list.delete(k);
  }
  setActiveFeeKeys(Array.from(list));
}

// Services activations (month-specific)
export function getActiveServiceKeys(): string[] {
  return read<string[]>(KEYS.serviceActivations, []);
}

export function setActiveServiceKeys(keys: string[]) {
  write(KEYS.serviceActivations, Array.from(new Set(keys)));
}

export function serviceKey(studentId: string, serviceId: string, mois: string) {
  return `${studentId}|${serviceId}|${mois}`;
}

export function isServiceActive(studentId: string, serviceId: string, mois: string) {
  if (!mois) return false;
  const k = serviceKey(studentId, serviceId, mois);
  return getActiveServiceKeys().includes(k);
}

export function setServiceActive(studentId: string, serviceId: string, mois: string, active: boolean) {
  const k = serviceKey(studentId, serviceId, mois);
  const list = new Set(getActiveServiceKeys());
  if (active) list.add(k); else list.delete(k);
  setActiveServiceKeys(Array.from(list));
  return active;
}

export function bulkSetServiceActive(studentIds: string[], serviceId: string, mois: string, active: boolean) {
  const list = new Set(getActiveServiceKeys());
  for (const sid of studentIds) {
    const k = serviceKey(sid, serviceId, mois);
    if (active) list.add(k); else list.delete(k);
  }
  setActiveServiceKeys(Array.from(list));
}
