"use client";
import { EditName } from "@/components/edit-name";
import { LoadingSpinner } from "@/components/loading";
import LoginComp from "@/components/login";
import ShineBorder from "@/components/magicui/shine-border";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MailIcon, PenIcon, RocketIcon, User } from "lucide-react";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session, update, status } = useSession();
  let userData = {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
  };
  if (!session && status === "unauthenticated") {
    return <LoginComp />;
  }
  if (status === "loading") {
    return <LoadingSpinner className="" />;
  }
  return (
    <div className="md:pt-20 pt-16 md:px-8 px-4 flex flex-col gap-4 w-full">
      <header className="flex gap-4 items-center">
        <ShineBorder
          className="relative h-[5.4rem] w-[5.4rem] flex  flex-col items-center justify-center overflow-hidden  bg-transparent md:shadow-xl"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          borderRadius={50}
        >
          <Avatar className="h-20 w-20  border shadow-md">
            <AvatarImage src={userData.image!} alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </ShineBorder>
        <div>
          <h1 className="text-3xl font-semibold">{userData.name}</h1>
          <h3 className="text-primary/60 font-light">{userData.email}</h3>
        </div>
      </header>
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-xl text-primary/90 ">Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-3 w-full">
          <Alert className={cn(`min-w-60 h-fit relative`)}>
            <User className="h-4 w-4" />
            <AlertTitle className="mb-3 flex justify-between items-center">
              {userData.name && <EditName userName={userData.name} />}
              Name
            </AlertTitle>
            <AlertDescription className="break-words">
              {userData.name}
            </AlertDescription>
          </Alert>
          <Alert className="min-w-60">
            <MailIcon className="h-4 w-4" />
            <AlertTitle className="mb-3 ">Email</AlertTitle>
            <AlertDescription>{userData.email}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
