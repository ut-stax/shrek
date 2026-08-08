import { NextResponse } from "next/server";
import { updateInquiryStatus } from "@/lib/data";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body?.status) {
      return NextResponse.json({ success: false, message: "Missing status." }, { status: 400 });
    }

    const { data, error } = await updateInquiryStatus(id, body.status);

    if (error || !data) {
      return NextResponse.json({ success: false, message: "Unable to update inquiry." }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, message: "Unable to update inquiry." }, { status: 500 });
  }
}