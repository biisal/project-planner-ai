// "use client";
import ProjectForm from "./componets/project-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Project Plan",
  description: "Create New Project Plan",
  openGraph: {
    title: "Create New Project Plan",
    description: "Create New Project Plan",
    url: "https://nextjs.org",
    siteName: "Create New Project Plan",
    images: [
      {
        url: "https://nextjs.org/og.png",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};
const CeratePage = () => {
  return <ProjectForm />;
};

export default CeratePage;
