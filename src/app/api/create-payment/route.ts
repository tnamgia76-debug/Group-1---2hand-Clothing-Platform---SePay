import { NextRequest, NextResponse } from "next/server";
import payos from "@/lib/payos";
import { PaymentRequest } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body: PaymentRequest = await req.json();

    const paymentData = {
      orderCode: body.orderCode,
      amount: body.amount,
      description: body.description.slice(0, 25), // payOS giới hạn 25 ký tự
      buyerName: body.buyerName,
      buyerPhone: body.buyerPhone,
      buyerEmail: body.buyerEmail,
      items: body.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
    };

    const paymentLink = await payos.createPaymentLink(paymentData);

    return NextResponse.json({
      success: true,
      checkoutUrl: paymentLink.checkoutUrl,
      orderCode: paymentLink.orderCode,
      qrCode: paymentLink.qrCode,
    });
  } catch (error: any) {
    console.error("Create payment error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
