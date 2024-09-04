"use client";
import Link from "next/link";
import { BookAIcon, HomeIcon, SquarePen, User } from "lucide-react";
import { usePathname } from "next/navigation";
interface SidebarProps {
  setSheetOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
const Sidebar = ({ setSheetOpen }: SidebarProps) => {
  let routes = [
    { title: "Home", icon: HomeIcon, link: "/" },
    { title: "Create Project", icon: SquarePen, link: "/create" },
    { title: "All Project", icon: BookAIcon, link: "/projects" },
    { title: "Profile", icon: User, link: "/profile" },
  ];

  const pathname = usePathname();
  return (
    <div className="w-full flex items-center flex-col justify-center gap-1 py-4 px-2">
      {routes.map((route, index) => (
        <Link
          key={index}
          href={route.link}
          onClick={() => setSheetOpen && setSheetOpen(false)}
          className={`w-full flex items-center hover:bg-primary/10 bg-primary/${
            pathname === route.link ? "10" : "5"
          } rounded-sm p-2 transition-all duration-300`}
        >
          <route.icon className="w-6 h-6 opacity-50 mr-2" />
          {route.title}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
