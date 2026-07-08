import { useMutation } from "@tanstack/react-query";
import api from "@/services/api";


type HeartbeatPayload = {
  videoId: string;
  elapsed: number;
  viewerId?: string;
};

async function sendHeartbeat({
  videoId,
  elapsed,
  viewerId
}: HeartbeatPayload): Promise<void> {
  await api.post(`/videocount/${videoId}/view`, {
    elapsed,
    viewerId,
  });
}

export function useHeartbeat() {
  return useMutation({
    mutationFn: sendHeartbeat,
  });
}