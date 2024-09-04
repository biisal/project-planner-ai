import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useProject } from "@/hooks/projects-hook";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { LoadingSpinner } from "./loading";
import LoginComp from "./login";
import NoProjects from "./no-projects";
import { Check, CheckCircle, Clock, Loader2 } from "lucide-react";
import HoverDoneStatus from "./hover-done-status";

const ProjectCard = ({
  count,
  header,
}: {
  count?: number;
  header?: string;
}) => {
  const { getProjects, projects, projectLoading } = useProject();
  const { data: session, status } = useSession();
  useEffect(() => {
    (async () => {
      if (session?.user?.email) await getProjects(count);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.email]);

  if (status === "loading") {
    return <LoadingSpinner text="Checking..." />;
  } else if (!session && status === "unauthenticated") {
    return <LoginComp />;
  } else if (projectLoading) {
    return <LoadingSpinner text="Cheking For Projects..." />;
  } else if (projects.length === 0) {
    return <NoProjects />;
  }
  return (
    <div className="p-4 flex flex-col gap-3">
      <h1 className="text-3xl font-semibold text-primary/80">
        {header ? header : "Your Plans"}
      </h1>
      <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="bg-background flex flex-col relative h-fit"
          >
            <CardHeader>
              <CardTitle className="text-sm h-10 pt-3 relative">
                <div className="h-4 w-4 absolute top-0 right-0">
                  <HoverDoneStatus isdone={project.isdone} />
                </div>
                {project.project_name.slice(0, 50)}...
              </CardTitle>
              <CardDescription className="text-xs pt-3">
                {project.project_scope.slice(0, 150)}...
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end gap-4">
              <p className="text-xs">
                {project.technical_stack.join(", ").slice(0, 80)}...
              </p>
              <Link href={`/project/${project._id}`}>
                <Button variant="outline">View Project</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
