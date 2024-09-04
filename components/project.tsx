import { useEffect } from "react";

import { useProject } from "@/hooks/projects-hook";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Ban,
  BookOpenCheckIcon,
  Brain,
  CurlyBraces,
  Rocket,
  RocketIcon,
  Settings,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import FormatList from "@/components/format-list";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import YoutubeComp from "@/components/youtube";
import { LoadingSpinner } from "./loading";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { DeleteProjectAlert } from "./delete-project-alert";
interface ProjectPageProps {
  params: { _id: string };
}
const ProjectComp = ({ params }: ProjectPageProps) => {
  const { getProject, project, projectLoading, markAsDone } = useProject();
  useEffect(() => {
    (async () => {
      await getProject(params._id);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (projectLoading) {
    return <LoadingSpinner text="Wait..." />;
  }
  if (!project) {
    return (
      <div className="flex justify-center items-center w-full">
        <Alert className="max-w-64 bg-primary/5">
          <Ban className="h-4 w-4" />
          <AlertTitle className="mb-3">Error 404 !</AlertTitle>
          <AlertDescription>Project not found</AlertDescription>
        </Alert>
      </div>
    );
  }
  return (
    <div className="p-4">
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <h1 className="">{project?.project_name}</h1>
          </CardTitle>
          <CardDescription>{project?.project_scope}</CardDescription>
        </CardHeader>
        <Separator />

        <CardContent className="flex flex-col p-2 gap-6 mt-4">
          <Alert className="w-full">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle className="mb-3">Featues </AlertTitle>
            <AlertDescription>
              <FormatList list={project?.feature} />
            </AlertDescription>
          </Alert>

          <Alert className="w-full">
            <Settings className="h-4 w-4" />
            <AlertTitle className="mb-3">Technical Stack</AlertTitle>
            <AlertDescription>
              <FormatList list={project?.technical_stack} />
            </AlertDescription>
          </Alert>

          <Alert className="w-full">
            <BookOpenCheckIcon className="h-4 w-4" />
            <AlertTitle className="mb-3">Resource Allocation</AlertTitle>
            <AlertDescription>
              <FormatList list={project?.resource_allocation} />
            </AlertDescription>
          </Alert>

          <div>
            <h1 className="text-xl flex items-center gap-1 mb-3">
              <Brain className="h-5 w-5 text-primary/60" /> Development Plan :
            </h1>
            <div className="grid md:grid-cols-2 gap-2">
              {project?.development_plan.map((dev, index) => (
                <Card key={index} className="bg-transparent relative">
                  <p className="absolute top-2 right-2 bg-primary/10 px-2 py-1 rounded text-xs">
                    {" "}
                    {dev.timeline}
                  </p>
                  <CardHeader>
                    <CardTitle className="text-base mt-2 w-[90%]">
                      {dev.milestone}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormatList makeCounter={true} list={dev.tasks} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-xl flex items-center gap-1 mb-3">
              <CurlyBraces className="h-5 w-5 text-primary/60" /> Risk
              Assessment :
            </h1>
            <div className="grid md:grid-cols-2 gap-2">
              {project?.risk_assessment.map((dev, index) => (
                <Card key={index} className="bg-transparent relative">
                  <CardHeader>
                    <CardTitle className="text-base mt-2 text-primary/80">
                      Risk : {dev.risk}
                    </CardTitle>
                    <CardDescription>
                      Assessment : {dev.mitigation}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
          <Separator />
          <Alert className="w-full">
            <BookOpenCheckIcon className="h-4 w-4" />
            <AlertTitle>Final Deliverable</AlertTitle>
            <AlertDescription>
              <FormatList list={project?.final_deliverables} />
            </AlertDescription>
          </Alert>
          <Separator />
          <YoutubeComp ids={project?.youtube_videos_id} />
          <div className="w-full flex md:pl-10 justify-center md:justify-start pb-4 gap-4">
            <Button
              className="max-w-64"
              disabled={project.isdone}
              onClick={() => markAsDone(project._id)}
            >
              {project.isdone ? "Completed" : "Mark As Completed"}
            </Button>
            <DeleteProjectAlert _id={project._id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectComp;
