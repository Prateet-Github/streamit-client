export type Video = {
  _id: string;
  title: string;
  thumbnailKey: string;
  hlsUrl: string;
  description: string;
  createdAt: string;
  views?: number;
  status: "PROCESSING" | "COMPLETED" | "FAILED";
  processingProgress?: number;
  owner?: {
    id: string;
    name: string;
    username: string;
  };
};

export type VideoCardProps = {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  views: number;
  createdAt: string;
  avatar?: string;
};