"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { useProject } from "@/hooks/projects-hook";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/loading";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import LoginComp from "@/components/login";
import { useSession } from "next-auth/react";
import { Matcher } from "react-day-picker";

const projectTypes = [
  "Programming",
  "Design",
  "Management",
  "UI",
  "Artifical Intelligence",
  "Machine Learning",
  "Other",
] as const;
const skillLevelTypes = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
] as const;

const placeholders = {
  interestArea:
    "I want to build a web-based tool for managing smart home devices.",
  preferredTechnology: "React, Next.js, Node.js",
  deadline: "2023-06-30",
  openSource: "Do you want to open source the project?",
  monetizationPlan: "Do you have a monetization plan?",
  educationalPurpose: "Do you have educational purpose?",
  experimentalProject:
    "Do you want to build the project in an experimental manner?",

  resources: `Development Tools: "Visual Studio Code, Git, npm"
APIs/Services: "Google Maps API, Firebase, Stripe for payments"
Design Assets: "Figma for UI/UX design, free icon packs"`,
  inspiration:
    "Inspired by the simplicity and user interface of Todoist for task management.",
  expectedOutcome:
    "A fully responsive web application that allows users to manage tasks, set deadlines, and collaborate with others in real-time.",
  budget: "1000rs",
};
export const formSchema = z.object({
  interestArea: z.string().min(1, { message: "Interest Area is Required" }),
  preferredTechnology: z.string(),
  deadline: z.union([z.date(), z.string()]),

  projectType: z.enum(projectTypes, {
    required_error: "Project Type is required",
  }),
  skillLevel: z.enum(skillLevelTypes, {
    required_error: "Skill Level is required",
  }),

  collaborativeProject: z.boolean(),
  openSource: z.boolean(),
  monetizationPlan: z.boolean(),
  educationalPurpose: z.boolean(),
  experimentalProject: z.boolean(),

  resources: z.string().optional(),
  inspiration: z.string().optional(),
  expectedOutcome: z.string().optional(),
  budget: z.number().optional(),
});

const ProjectForm = () => {
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interestArea: "",
      preferredTechnology: "",
      deadline: new Date(),
      projectType: projectTypes[0],
      skillLevel: skillLevelTypes[0],
      collaborativeProject: false,
      openSource: false,
      monetizationPlan: false,
      educationalPurpose: false,
      experimentalProject: false,
      resources: "",
      inspiration: "",
      expectedOutcome: "",
      budget: 0,
    },
  });
  const { toast } = useToast();
  const { createProject, projects } = useProject();
  const handelSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      let today = new Date();
      let deadlineDay = new Date(data.deadline as Date);
      const timeDifference = deadlineDay.getTime() - today.getTime();
      let newdeadline = Math.ceil(timeDifference / (1000 * 3600 * 24));
      if (newdeadline < 0 || newdeadline === 0) {
        newdeadline = 1;
      }
      data.deadline = newdeadline + " days";
      let isAdded: string | boolean = await createProject(data);
      // let isAdded = true;
      if (isAdded) {
        toast({
          title: "Success",
          description: "Your Project Plan Created",
          variant: "default",
          action: (
            <ToastAction altText="Your Project Plan Created">
              <Link href={`/project/${isAdded}`}>View</Link>
            </ToastAction>
          ),
        });

        form.reset();
      } else {
        toast({
          title: "Error",
          description: "Project Plan Creation Failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Project Plan Creation Failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  if (!session && status === "unauthenticated") {
    return <LoginComp />;
  }
  if (status === "loading") {
    return <LoadingSpinner className=" min-h-screen min-w-full" />;
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handelSubmit)}
        className="w-full h-full p-4"
      >
        <h1 className="text-2xl font-bold mb-4">Create Project Plan</h1>
        <h1 className="text-xl mt-8 mb-4">Project Details</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="interestArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Area **</FormLabel>
                <FormDescription>
                  A brief description of Your Interest or Skills
                </FormDescription>
                <FormControl>
                  <Textarea
                    rows={6}
                    className="resize-none focus:scale-y-105 transition-all duration-300"
                    {...field}
                    placeholder={placeholders.interestArea}
                  ></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferredTechnology"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Technology **</FormLabel>
                <FormDescription>
                  What is the Preferred Technology You Want to use?
                </FormDescription>
                <FormControl>
                  <Textarea
                    rows={6}
                    className="resize-none focus:scale-y-105 transition-all duration-300"
                    {...field}
                    placeholder={placeholders.preferredTechnology}
                  ></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deadline **</FormLabel>
                <FormDescription>
                  Approximately from today to which date you want to finish your
                  project
                </FormDescription>
                <FormControl>
                  <Calendar
                    className="w-fit bg-primary/5 rounded-md"
                    fromDate={new Date()}
                    mode="single"
                    selected={field.value as Date}
                    onSelect={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h1 className="text-xl mt-14 mb-4">Project Characteristics</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Type **</FormLabel>
                <FormDescription>
                  What type of project are you looking for?
                </FormDescription>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Project Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((projectType) => (
                      <SelectItem key={projectType} value={projectType}>
                        {projectType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="skillLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill Level **</FormLabel>
                <FormDescription>What is your skill level?</FormDescription>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Your Skill Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillLevelTypes.map((skillsType) => (
                      <SelectItem key={skillsType} value={skillsType}>
                        {skillsType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h1 className="text-xl mt-14 mb-4">Project Scope</h1>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="openSource"
            render={({ field }) => {
              let val = field.value ? "true" : "false";
              return (
                <FormItem>
                  <FormLabel>Open Source</FormLabel>
                  <FormDescription>{placeholders.openSource}</FormDescription>
                  <RadioGroup
                    className="space-x-2 flex"
                    value={val}
                    onValueChange={(value) => field.onChange(value === "true")}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="true" id="os-true" />
                      <label htmlFor="os-true">Yes</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        defaultChecked={true}
                        value="false"
                        id="os-false"
                      />
                      <label htmlFor="os-false">No</label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="monetizationPlan"
            render={({ field }) => {
              let val = field.value ? "true" : "false";
              return (
                <FormItem>
                  <FormLabel>Monitization Plan</FormLabel>
                  <FormDescription>
                    {placeholders.monetizationPlan}
                  </FormDescription>
                  <RadioGroup
                    className="space-x-2 flex"
                    value={val}
                    onValueChange={(value) => field.onChange(value === "true")}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="true" id="mp-true" />
                      <label htmlFor="mp-true">Yes</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        defaultChecked={true}
                        value="false"
                        id="mp-false"
                      />
                      <label htmlFor="mp-false">No</label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="educationalPurpose"
            render={({ field }) => {
              let val = field.value ? "true" : "false";
              return (
                <FormItem>
                  <FormLabel>Educational Purpose</FormLabel>
                  <FormDescription>
                    {placeholders.educationalPurpose}
                  </FormDescription>
                  <RadioGroup
                    className="space-x-2 flex"
                    value={val}
                    onValueChange={(value) => field.onChange(value === "true")}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="true" id="edp-true" />
                      <label htmlFor="edp-true">Yes</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        defaultChecked={true}
                        value="false"
                        id="edp-false"
                      />
                      <label htmlFor="edp-false">No</label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="experimentalProject"
            render={({ field }) => {
              let val = field.value ? "true" : "false";
              return (
                <FormItem>
                  <FormLabel>Experimental Project</FormLabel>
                  <FormDescription>
                    {placeholders.experimentalProject}
                  </FormDescription>
                  <RadioGroup
                    className="space-x-2 flex"
                    value={val}
                    onValueChange={(value) => field.onChange(value === "true")}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="true" id="exp-true" />
                      <label htmlFor="exp-true">Yes</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        defaultChecked={true}
                        value="false"
                        id="exp-false"
                      />
                      <label htmlFor="exp-false">No</label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <h1 className="text-xl mt-14 mb-4">Optional Fields</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="resources"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resources</FormLabel>
                <FormDescription>
                  Do you have any resources that you would like to share?
                </FormDescription>
                <FormControl>
                  <Textarea
                    rows={6}
                    className="resize-none focus:scale-y-105 transition-all duration-300"
                    {...field}
                    placeholder={placeholders.resources}
                  ></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="inspiration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inspiration</FormLabel>
                <FormDescription>
                  Do you have inspiration for your project?
                </FormDescription>
                <FormControl>
                  <Textarea
                    rows={6}
                    className="resize-none focus:scale-y-105 transition-all duration-300"
                    {...field}
                    placeholder={placeholders.inspiration}
                  ></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expectedOutcome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expected Outcome</FormLabel>
                <FormDescription>
                  What is the expected outcome of your project?
                </FormDescription>
                <FormControl>
                  <Textarea
                    rows={6}
                    className="resize-none focus:scale-y-105 transition-all duration-300"
                    {...field}
                    placeholder={placeholders.expectedOutcome}
                  ></Textarea>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormDescription>
                  Do you have a budget for your project?
                </FormDescription>
                <FormControl>
                  <Input
                    type="number"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="resize-none focus:scale-y-105 transition-all duration-300"
                    placeholder={placeholders.budget}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex items-center justify-center mt-8">
          <Button className="w-full sm:w-fit px-16" disabled={loading}>
            {loading ? (
              <LoadingSpinner text="Generating Project Plan..." />
            ) : (
              "Generate Project Plan"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
