import { Button } from "@/components/ui/button";
import { MenuIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const LandingPageNavbar = () => {
  return (
    <div className="flex w-full  justify-between items-center md:container">
      <div className="text-3xl font-semibold flex items-center gap-x-3">
        <MenuIcon className="w-6 h-6" />
        <Image src={"/assets/logo2.svg"} alt="logo" width={40} height={40} />
        Eternity
      </div>
      <div className="hidden gap-x-10 items-center lg:flex ">
        <Link
          href="/"
          className="text-sm font-medium bg-demonGreen px-4 py-2 rounded-md text-white hover:bg-demonGreen/80"
        >
          Home
        </Link>
        <Link
          href="/"
          className="text-sm font-medium bg-accent px-4 py-2 rounded-md text-white hover:bg-accent/80"
        >
          Pricing
        </Link>
        <Link
          href="/"
          className="text-sm font-medium bg-accent px-4 py-2 rounded-md text-white hover:bg-accent/80"
        >
          Docs
        </Link>
      </div>
      <Link href={"/auth/sign-in"}>
        <Button className="text-white bg-demonGreen hover:bg-demonGreen/80  gap-x-2 flex items-center gap-2">
            <User fill={"#000"}/>
            Login</Button>
      </Link>
    </div>
  );
};

export default LandingPageNavbar;
