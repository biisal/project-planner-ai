import { authOptions } from "@/lib/auth";
import { getModel } from "@/lib/database/models/model.project";
import connectToDB from "@/lib/database/mongoose";
import { getServerSession } from "next-auth";
interface IParams {
  params: {
    _id: string;
  };
}
export async function PATCH(req: Request, { params }: IParams) {
  const session: { user: { email: string } } | null = await getServerSession(
    authOptions
  );
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    let email = session?.user.email as string;
    await connectToDB();
    const model = getModel(email);
    const project = await model.findOne({ _id: params._id });
    if (!project) {
      return new Response("Project not found", { status: 404 });
    }
    project.isdone = !project.isdone || true;
    await project.save();
    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return new Response("Error processing request", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: IParams) {
  const session: { user: { email: string } } | null = await getServerSession(
    authOptions
  );
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    let email = session?.user.email as string;
    await connectToDB();
    const model = getModel(email);
    const project = await model.findOne({ _id: params._id });
    if (!project) {
      return new Response("Project not found", { status: 404 });
    }
    await model.deleteOne({ _id: params._id });
    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
