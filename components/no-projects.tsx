import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Ban } from "lucide-react";
import Link from "next/link";

const NoProjects = () => {
  return (
    <div className="w-full flex items-center justify-center px-4">
      <Alert className="w-fit">
        <Ban className="h-4 w-4" />
        <AlertTitle>No Plans Found 🙄</AlertTitle>
        <AlertDescription className="flex flex-col gap-1">
          <p>Our AI is ready to create a plan for you ! 😗</p>
          <Link
            href="/create"
            className="py-1.5 px-3 bg-primary/5 w-fit rounded"
          >
            Create
          </Link>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default NoProjects;
