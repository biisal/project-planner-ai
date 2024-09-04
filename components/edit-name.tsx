"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { useUserUpdate } from "@/hooks/user-update";

export function EditName({ userName }: { userName: string }) {
  const [name, setName] = useState<string>(userName);
  const { updateUser } = useUserUpdate();
  return (
    <AlertDialog>
      <AlertDialogTrigger className="absolute top-3 right-3" asChild>
        <div className="bg-primary/10 cursor-pointer hover:bg-primary/20 rounded-full flex items-center justify-center w-6 h-6 absolute top-3 right-3">
          <PenIcon className="h-3 w-3" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change Your Name.</AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => updateUser(name)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
