import Navbar from "@/components/navbar";
import SessionWrapper from "@/components/session-provider";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="h-screen hidden md:block fixed top-16 bg-primary/5 w-64">
        <Sidebar />
      </div>
      <div className="md:pl-64 flex min-h-screen w-full pt-16">{children}</div>
      <Toaster />
    </div>
  );
};

export default HomeLayout;
