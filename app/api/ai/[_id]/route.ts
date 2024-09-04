import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getModel } from "@/lib/database/models/model.project";
import connectToDB from "@/lib/database/mongoose";

export async function GET(
  request: Request,
  { params }: { params: { _id: string } }
) {
  const session: { user: { email: string } } | null = await getServerSession(
    authOptions
  );
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    let email = session?.user.email as string;
    // return new Response(JSON.stringify({ email, _id: params._id }), {status: 200,});
    const model = getModel(email);
    if (!model) {
      return new Response("Model not found", { status: 404 });
    }
    await connectToDB();
    const project = await model.findById(params._id);
    if (!project) {
      return new Response("Project not found", { status: 404 });
    }
    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return new Response("Error processing request", { status: 500 });
  }
}
