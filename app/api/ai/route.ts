import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { formSchema } from "@/app/(root)/(routes)/create/componets/project-form";
import { getSession, useSession } from "next-auth/react";
import connectToDB from "@/lib/database/mongoose";
import { getModel } from "@/lib/database/models/model.project";
import { IProject } from "@/lib/database/models/model.project";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import axios from "axios";

const apiKey = process.env.GEMINI_API_KEY as string;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set in the environment variables");
}
const genAI = new GoogleGenerativeAI(apiKey);
let cachedModel: any | null = null;
let systemInstruction = `Task: Generate a unique and creative project plan based on the provided user inputs. The response should include a specific and imaginative project name, along with a detailed and actionable project plan.
User Inputs:
- **Interest Area:** A brief description of the innovative project idea.
- **Preferred Technologies:** The technologies or tools the user prefers to work with.
- **Expected Outcome:** The goals or deliverables the user wants to achieve.
- **Project Type:** The category of the project (e.g., Web Development, Mobile App, etc.).
- **Skill Level:** The user’s proficiency level (e.g., Beginner, Intermediate, Advanced).
- **Budget:** The user’s estimated budget for the project.
- **Deadline:** The timeline or due date for project completion.
- **Collaborative Project:** Whether the project involves collaboration with others.
- **Open Source:** Whether the project will be open-source.
- **Monetization Plan:** Whether the project is intended to generate revenue.
- **Educational Purpose:** Whether the project is for learning or educational purposes.
- **Experimental Project:** Whether the project is a prototype or an experimental endeavor.
- **Resources:** Any specific resources the user has or needs.
- **Inspiration:** Sources of inspiration for the project.

Response Format:
{
    project_name: "A unique and descriptive project name that reflects the core idea.",
    project_scope: "A summary of the project's objectives, including key goals and deliverables.",
    feature: "A description of the key features that the project will offer.",
    technical_stack: [
        "List of recommended technologies and tools based on user preferences."
    ],
    development_plan: [
        {
            milestone: "Key milestone in the development process.",
            tasks: [
                "Specific tasks required to achieve this milestone."
            ],
            timeline: "Estimated time to complete this milestone."
        },
        ...
    ],
    resource_allocation: [
        "List of resources, tools, or libraries needed to complete the project."
    ],
    risk_assessment: [
        {
            risk: "A potential risk or challenge.",
            mitigation: "Strategy to mitigate this risk."
        },
        ...
    ],
    final_deliverables: [
        "A clear definition of what the user should aim to deliver at the end of the project."
    ],
    youtube_search_keyword: "Optional: A keyword for searching relevant tutorials on YouTube, if applicable., If not, send 'unavailable youtube keyword' as a value for this."
}

Tone and Style:
The response should be clear, actionable, and aligned with the user’s skill level. Provide detailed explanations where necessary, but keep instructions concise. Use a friendly and encouraging tone to motivate the user. Ensure the project plan is unique and creatively aligned with the user's inputs.`;
async function geminiResponse(input: string): Promise<string> {
  // Initialize cached model if not already
  if (!cachedModel) {
    cachedModel = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
    });
  }

  const generationConfig = {
    temperature: 0.7, // Adjusted for more focused responses
    topP: 0.9, //
    topK: 50,
    maxOutputTokens: 4096, // Reduced for faster responses
    responseMimeType: "application/json",
  };

  try {
    const chatSession = cachedModel.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "Interest Area: web dev\\n      Preferred Technology: django\\n      Deadline: 2024-09-02T18:30:00.000Z\\n      Project Type: Programming\\n      Skill Level: Beginner\\n      Collaborative Project: false\\n      Open Source: false\\n      Monetization Plan: false\\n      Educational Purpose: false\\n      Experimental Project: false\\n      Resources:\\n      Inspiration:\\n      Expected Outcome:\\n      Budget: 0\\n    You will replay with a project plan.I Mean Exact Poject Name.You will replay in json format\n",
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: '{\n  "project_name": "Django-Powered Recipe Journal",\n  "project_scope": "Create a web application that allows users to store, organize, and share their favorite recipes. This will include features for adding recipes with ingredients, instructions, and optional images, as well as personal recipe collections and the ability to search for recipes.",\n  "feature": [\n    "User account creation and authentication",\n    "Adding recipes with detailed information (name, ingredients, instructions, image upload)",\n    "Organizing recipes into personalized collections (e.g., Breakfast, Dinner, Desserts)",\n    "Search functionality to find recipes based on keywords or ingredients",\n    "Option to share recipes with others via a unique link or social media",\n    "Option to mark favorite recipes for easy access"\n  ],\n  "technical_stack": [\n    "Django (Python web framework)",\n    "SQLite (database)",\n    "HTML, CSS, JavaScript (front-end)",\n    "Bootstrap (optional: for responsive design)",\n    "ImageKit (optional: for image processing and optimization)"\n  ],\n  "development_plan": [\n    {\n      "milestone": "Project Setup & Database Design",\n      "tasks": [\n        "Install Django and required packages",\n        "Create a new Django project and app",\n        "Define database models for recipes, users, and collections",\n        "Create database migrations",\n        "Set up basic user authentication system"\n      ],\n      "timeline": "2 weeks"\n    },\n    {\n      "milestone": "Recipe Creation and Display",\n      "tasks": [\n        "Create forms for adding recipes",\n        "Implement recipe saving and retrieval from the database",\n        "Design templates to display recipes with ingredients and instructions",\n        "Implement image upload and display functionality"\n      ],\n      "timeline": "3 weeks"\n    },\n    {\n      "milestone": "Recipe Collection and Search",\n      "tasks": [\n        "Create a system for users to organize recipes into collections",\n        "Implement search functionality based on keywords or ingredients",\n        "Design user interfaces for managing collections and searching recipes"\n      ],\n      "timeline": "2 weeks"\n    },\n    {\n      "milestone": "Sharing and Social Features (Optional)",\n      "tasks": [\n        "Implement a system for sharing recipes via a unique link",\n        "Add option to share recipes on social media platforms",\n        "Design user interface for sharing recipes"\n      ],\n      "timeline": "1 week (optional)"\n    },\n    {\n      "milestone": "Testing and Deployment",\n      "tasks": [\n        "Thorough testing of all features",\n        "Fix any bugs or issues",\n        "Deploy the application to a web server (e.g., Heroku, AWS)"\n      ],\n      "timeline": "1 week"\n    }\n  ],\n  "resource_allocation": [\n    "Django documentation",\n    "Python tutorial resources",\n    "Web development tutorials (HTML, CSS, JavaScript)",\n    "Bootstrap documentation",\n    "ImageKit documentation (optional)",\n    "Git version control"\n  ],\n  "risk_assessment": [\n    {\n      "risk": "Complexity of Django features",\n      "mitigation": "Start with basic features and gradually add complexity, break down tasks into smaller steps"\n    },\n    {\n      "risk": "Time management and deadlines",\n      "mitigation": "Use project management tools (e.g., Trello) to track progress, set realistic deadlines for each milestone"\n    },\n    {\n      "risk": "Lack of familiarity with web development",\n      "mitigation": "Utilize online resources and tutorials, ask for help from online communities, work through examples"\n    }\n  ],\n  "final_deliverables": [\n    "Fully functional web application with user authentication, recipe creation, recipe collections, search functionality, and optional sharing features",\n    "Well-documented codebase",\n    "Deployment of the application on a web server"\n  ],\n  "youtube_search_keyword": "Django recipe app tutorial"\n}',
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(input);
    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return "Failed to generate response";
  }
}

async function getYoutubeVideoId(keyword: string) {
  const youtube_api = process.env.YOUTUBE_API_KEY as string;
  if (!youtube_api) {
    throw new Error("YOUTUBE_API_KEY is not set in the environment variables");
  }
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${keyword}&type=video&key=${youtube_api}`;
  const response = await axios.get(url);
  // const videoId = response.data.items[0]?.id?.videoId;
  const video_id_list = response.data.items.map((item: any) => item.id.videoId);
  return video_id_list;
}

export async function POST(request: Request): Promise<Response> {
  const session: { user: { email: string } } | null = await getServerSession(
    authOptions
  );
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const body: z.infer<typeof formSchema> = await request.json();
    let email = session.user.email as string;
    let expectedOutput =
      "You will replay with a project plan.I Mean Exact Poject Name.You will replay in json format.If you unable to create project plan just reply with 'I am unable to create project plan' without any extra instructions.";
    const stringFormat = `
      Interest Area: ${body.interestArea}
      Preferred Technology: ${body.preferredTechnology}
      Deadline: ${body.deadline}
      Project Type: ${body.projectType}
      Skill Level: ${body.skillLevel}
      Collaborative Project: ${body.collaborativeProject}
      Open Source: ${body.openSource}
      Monetization Plan: ${body.monetizationPlan}
      Educational Purpose: ${body.educationalPurpose}
      Experimental Project: ${body.experimentalProject}
      Resources: ${body.resources}
      Inspiration: ${body.inspiration}
      Expected Outcome: ${body.expectedOutcome}
      Budget: ${body.budget}
    `;
    let finalPromt = stringFormat + expectedOutput;
    const result = await geminiResponse(finalPromt);
    if (result.toLowerCase().includes("i am unable to create project plan")) {
      return new Response("Error processing request", { status: 500 });
    }
    await connectToDB();
    let jsonRes = await JSON.parse(result);
    let yotube_keyword = jsonRes.youtube_search_keyword;
    if (!yotube_keyword.toLowerCase().includes("unavailable youtube keyword")) {
      let video_id_list = await getYoutubeVideoId(yotube_keyword);
      jsonRes.youtube_videos_id = video_id_list;
    }
    delete jsonRes.youtube_search_keyword;
    let projectModel = getModel(email);
    let newProject = new projectModel(jsonRes);
    await newProject.save();
    return new Response(JSON.stringify(newProject), { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return new Response("Error processing request", { status: 500 });
  }
}

export async function GET(req: Request) {
  const session: { user: { email: string } } | null = await getServerSession(
    authOptions
  );
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const countParam = searchParams.get("count");

  try {
    let model = getModel(session.user.email as string);
    await connectToDB();
    let data: IProject[];
    if (countParam === "all") {
      data = await model.find().sort({ _id: -1 }).exec();
    } else if (countParam && !isNaN(Number(countParam))) {
      data = await model
        .find()
        .limit(Number(countParam))
        .sort({ _id: -1 })
        .exec();
    } else {
      return new NextResponse("Invalid 'count' parameter", { status: 400 });
    }
    return NextResponse.json(data);
    // return new Response(data, { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
