"use client";
import { LoadingSpinner } from "@/components/loading";
import LoginComp from "@/components/login";
import ProjectComp from "@/components/project";
import { useSession } from "next-auth/react";

interface ProjectPageProps {
  params: { _id: string };
}
const ProjectPage = ({ params }: ProjectPageProps) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <LoadingSpinner text="Checking..." />;
  }
  if (!session && status === "unauthenticated") {
    return <LoginComp />;
  }

  return <ProjectComp params={params} />;
};

export default ProjectPage;
