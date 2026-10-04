import { NextRequest, NextResponse } from "next/server";
import payos from "@/lib/payos";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Hàm này của payOS dùng để xác thực webhook gửi đến là an toàn và toàn vẹn dữ liệu
    const webhookData = payos.verifyPaymentWebhookData(body);

    if (webhookData.code === "00") {
      console.log("✅ Giao dịch thành công. Thông tin:", {
        orderCode: webhookData.orderCode,
        amount: webhookData.amount,
        description: webhookData.description,
      });
      // TODO: Cập nhật database đơn hàng của bạn thành "Đã thanh toán" ở đây
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
