"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabase_client";

export default function Header() {
  const [user] = useUser();
  const router = useRouter();
  if (user == "no user") router.replace("/signin");

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="w-full backdrop-blur-md bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="dashboard"
            prefetch
            className="text-xl font-medium text-white hover:opacity-80 transition-opacity duration-200"
          >
            Imagine
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent font-bold ml-2">
              Space
            </span>
          </Link>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex items-center space-x-3 bg-white/10 rounded-full pl-2 pr-4 py-1.5 hover:bg-white/20 transition-colors duration-200">
                <img
                  src={user?.user_metadata?.picture}
                  alt="avatar"
                  className="h-8 w-8 rounded-full ring-2 ring-white/20"
                />
                <span className="text-white font-medium">
                  {user?.user_metadata?.name}
                </span>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white/10 backdrop-blur-md border-white/20 rounded-xl overflow-hidden mt-2">
              <Link href="/dashboard">
                <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer px-4 py-2">
                  Dashboard
                </DropdownMenuItem>
              </Link>
              <Link href="/usage">
                <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer px-4 py-2">
                  Usage
                </DropdownMenuItem>
              </Link>
              <Link href="/plans">
                <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer px-4 py-2">
                  Plans
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                className="text-red-300 hover:bg-white/10 cursor-pointer px-4 py-2"
                onClick={signOut}
              >
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
