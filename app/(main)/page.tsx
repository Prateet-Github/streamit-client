import VideoCard from "@/components/ui/videoCard";

const videos = [
  {
    id: "1",
    title: "Learn Next.js in 10 Minutes",
    thumbnail: "/image.png",
    channelName: "Code Academy",
    views: 12000,
    createdAt: "2 days ago",
  },
  {
    id: "2",
    title: "React Tutorial for Beginners",
    thumbnail: "/image.png",
    channelName: "Dev Tutorials",
    views: 45000,
    createdAt: "1 week ago",
  },
  {
    id: "3",
    title: "JavaScript ES6 Features Explained",
    thumbnail: "/image.png",
    channelName: "JS Mastery",
    views: 30000,
    createdAt: "3 days ago",
  },
  {
    id: "4",
    title: "CSS Flexbox Crash Course",
    thumbnail: "/image.png",
    channelName: "Design Hub",
    views: 15000,
    createdAt: "5 days ago",
  },
  {
    id: "5",
    title: "TypeScript for Beginners",
    thumbnail: "/image.png",
    channelName: "Code Academy",
    views: 22000,
    createdAt: "1 week ago",
  },
  {
    id: "6",
    title: "Building a REST API with Node.js",
    thumbnail: "/image.png",
    channelName: "Dev Tutorials",
    views: 35000,
    createdAt: "4 days ago",
  },
  {
    id: "7",
    title: "Understanding React Hooks",
    thumbnail: "/image.png",
    channelName: "JS Mastery",
    views: 40000,
    createdAt: "2 days ago",
  },
  {
    id: "8",
    title: "CSS Grid Layout Tutorial",
    thumbnail: "/image.png",
    channelName: "Design Hub",
    views: 18000,
    createdAt: "6 days ago",
  },
  {
    id: "9",
    title: "Next.js vs Gatsby: Which One to Choose?",
    thumbnail: "/image.png",
    channelName: "Code Academy",
    views: 27000,
    createdAt: "3 days ago",
  },
  {
    id: "10",
    title: "Advanced JavaScript Concepts",
    thumbnail: "/image.png",
    channelName: "Dev Tutorials",
    views: 32000,
    createdAt: "1 week ago",
  },
  {
    id: "11",
    title: "React Performance Optimization Tips",
    thumbnail: "/image.png",
    channelName: "JS Mastery",
    views: 45000,
    createdAt: "2 days ago",
  },
];

export default function Home() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  );
}
