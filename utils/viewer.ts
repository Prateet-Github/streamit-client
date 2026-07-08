const STORAGE_KEY = "streamit-viewer-id";

export function getViewerId(): string {
  let viewerId = localStorage.getItem(STORAGE_KEY);

  if (!viewerId) {
    viewerId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, viewerId);
  }

  return viewerId;
}