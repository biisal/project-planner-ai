import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDB from "@/lib/database/mongoose";
import { IUser, User } from "@/lib/database/models/model.user";

export async function PUT(req: Request) {
  const session: { user: { email: string } } | null = await getServerSession(
    authOptions
  );
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  let newName = body.name;
  await connectToDB();
  let isUserExist: IUser | null = await User.findOne({
    email: session.user.email,
  });
  if (!isUserExist) {
    return new Response("User not found", { status: 404 });
  }

  isUserExist.name = newName;

  await isUserExist.save();
  return new Response(JSON.stringify(isUserExist), { status: 200 });
}
