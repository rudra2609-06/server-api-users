import { NextResponse } from "next/server";
import db from "@/app/configs/db.js";
import UserModel from "@/app/models/users.model.js";

// export let users = [];

export async function GET() {
  try {
    
    const response = await UserModel.find({});
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("ran with payload: ", body);
    const data = await UserModel.create(body);
    console.log("data received: ", data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
