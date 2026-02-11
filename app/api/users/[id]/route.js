import { NextResponse } from "next/server";
import db from "@/app/configs/db.js";
import UserModel from "@/app/models/users.model.js";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const response = await UserModel.findById(id);
    if (!response) return NextResponse.json({ message: "User not found" });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse({ message: error.message });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: id }, //find by _id
      { $set: body }, //only replace the available field in body
      { new: true }, //prevents default behaviour of sending old data and send new updated data
    );
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log(updatedUser);
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    // const user = await UserModel.findById(id);
    const updatedUser = await UserModel.findOneAndReplace({ _id: id }, body, {
      new: true,
    });
    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
