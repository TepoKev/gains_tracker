import { NextRequest, NextResponse } from "next/server";
import db from "@/libs/db";
import { hashPassword } from "@/libs/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password } = body;
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "Missing fields", status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password too short", status: 400 });
    }
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (user) {
      return NextResponse.json({ error: "User already exists", status: 409 });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
    const {password: _, ...userResult} = newUser;
    return NextResponse.json({ userResult, status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}
