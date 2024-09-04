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
import { PenIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useProject } from "@/hooks/projects-hook";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export function DeleteProjectAlert({ _id }: { _id: string }) {
  const [loading, setLoading] = useState<boolean | null>(null);
  const { deleteProject } = useProject();
  let router = useRouter();
  let { toast } = useToast();
  let handelDelete = async () => {
    try {
      setLoading(true);
      await deleteProject(_id);
      setLoading(false);
      router.push("/projects");
      toast({
        title: "Success",
        description: "Your Project Deleted",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Project Deletion Failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      router.refresh();
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="">Delete Project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button onClick={() => handelDelete()} disabled={loading || false}>
            {loading === true ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
