import { IProject } from "@/lib/database/models/model.project";
import axios from "axios";
import { useState } from "react";
import z from "zod";
import { formSchema } from "@/app/(root)/(routes)/create/componets/project-form";

export const useProject = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<IProject | null>(null);
  const [projectLoading, setProjectLoading] = useState<boolean>(false);
  const createProject = async (data: z.infer<typeof formSchema>) => {
    setProjectLoading(true);
    try {
      let res = await axios.post("/api/ai", data);
      if (res.status === 200) {
        return res.data._id;
      }
      return false;
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post.");
      return false;
    } finally {
      setProjectLoading(false);
    }
  };

  const getProjects = async (count?: number) => {
    setProjectLoading(true);
    try {
      const response = await axios.get<IProject[]>(
        `/api/ai?count=${count || "all"}`
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects.");
    } finally {
      setProjectLoading(false);
    }
  };
  const getProject = async (_id: string) => {
    setProjectLoading(true);
    try {
      const response = await axios.get<IProject>(`/api/ai/${_id}`);
      setProject(response.data);
    } catch (error) {
      console.error("Error fetching project:", error);
      setError("Failed to fetch project.");
    } finally {
      setProjectLoading(false);
    }
  };
  const markAsDone = async (id: string) => {
    setProjectLoading(true);
    try {
      const res = await axios.patch(`/api/project/${id}`);
      setProject(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setProjectLoading(false);
    }
  };
  const deleteProject = async (_id: string) => {
    try {
      await axios.delete(`/api/project/${_id}`);
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  };

  return {
    projects,
    createProject,
    getProjects,
    error,
    project,
    getProject,
    projectLoading,
    markAsDone,
    deleteProject,
  };
};
