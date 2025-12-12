import { NextResponse } from "next/server";
import axios from "axios";
import config from "../../../../lib/config";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const form = await req.formData();
    const link = form.get("link");
    const file = form.get("file");

    if (!link || !file) {
      return NextResponse.json({ error: "Masukkan link & upload file" }, { status: 400 });
    }

    const match = link.match(/verificationId=([A-Za-z0-9_-]+)/);
    if (!match)
      return NextResponse.json({ error: "verificationId tidak ditemukan" }, { status: 400 });

    const vid = match[1];

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const upReq = await axios.post(
      `${config.MY}/rest/v2/verification/${vid}/document`,
      {},
      { headers: { "Content-Type": "application/json" } }
    );

    const uploadUrl = upReq.data.uploadUrl;

    await axios.put(uploadUrl, fileBuffer, {
      headers: { "Content-Type": file.type || "image/png" }
    });

    await axios.post(`${config.MY}/rest/v2/verification/${vid}/submit`);

    const status = await axios.get(`${config.MY}/rest/v2/verification/${vid}`);

    return NextResponse.json({
      status: "ok",
      verificationId: vid,
      result: status.data
    });

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
                                                                             }
