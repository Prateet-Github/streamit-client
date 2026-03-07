import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex">
        <Sidebar></Sidebar>
        <main className="flex-1">{children}</main>
      </div>
      <Footer></Footer>
    </>
  );
}
