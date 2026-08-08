import { NextResponse } from "next/server";
import { createInquiry } from "@/lib/data";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ success: false, message: "Invalid payload." }, { status: 400 });
    }

    if (!Array.isArray(payload.services) || payload.services.length === 0) {
      return NextResponse.json({ success: false, message: "Select at least one service." }, { status: 400 });
    }

    if (typeof payload.name !== "string" || payload.name.trim().length < 2) {
      return NextResponse.json({ success: false, message: "Name is required." }, { status: 400 });
    }

    if (typeof payload.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return NextResponse.json({ success: false, message: "A valid email address is required." }, { status: 400 });
    }

    if (typeof payload.project_description !== "string" || payload.project_description.trim().length < 20) {
      return NextResponse.json({ success: false, message: "Project description is too short." }, { status: 400 });
    }

    const { data, error } = await createInquiry({
      name: payload.name.trim(),
      email: payload.email.trim(),
      company: payload.company?.trim() || undefined,
      phone: payload.phone?.trim() || undefined,
      services: payload.services,
      budget_range: payload.budget_range,
      estimated_timeline: payload.estimated_timeline?.trim() || undefined,
      project_description: payload.project_description.trim(),
      attachment_url: payload.attachment_url || undefined,
      ip_address: request.headers.get("x-forwarded-for") || "0.0.0.0",
    });

    if (error || !data) {
      return NextResponse.json({ success: false, message: "Unable to save inquiry." }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      inquiry_id: data.id,
      message: "Inquiry received.",
    });
  } catch {
    return NextResponse.json({ success: false, message: "Unable to process inquiry." }, { status: 500 });
  }
}