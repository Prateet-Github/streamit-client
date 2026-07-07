import { useMutation } from "@tanstack/react-query";
import api from "@/services/api";

type HeartbeatPayload = {
  videoId: string;
  elapsed: number;
};

async function sendHeartbeat({
  videoId,
  elapsed,
}: HeartbeatPayload): Promise<void> {
  await api.post(`/videocount/${videoId}/view`, {
    elapsed,
  });
}

export function useHeartbeat() {
  return useMutation({
    mutationFn: sendHeartbeat,
  });
}