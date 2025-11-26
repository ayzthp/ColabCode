"use client";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  
  // Hide sidebar on rooms-related pages for cleaner collaborative experience
  const hideSidebar = pathname?.startsWith('/room') || pathname === '/rooms';

  return (
    <div className="flex min-h-screen">
      {user && !hideSidebar ? <Sidebar /> : null}
      <main className="flex-1 min-h-screen overflow-x-hidden">{children}</main>
    </div>
  );
} 