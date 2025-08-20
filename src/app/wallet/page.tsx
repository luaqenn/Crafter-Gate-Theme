import { Metadata } from "next";
import Wallet from "@/components/wallet";
import { paymentService } from "@/lib/api/services/paymentService";
import { WEBSITE_ID } from "@/lib/constants/base";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Cüzdan",
    description: "Cüzdanınızı görüntüleyin ve kredi yükleyin.",
};

interface WalletPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WalletPage({ searchParams }: WalletPageProps) {
    const params = await searchParams;
    let paymentStatus: "COMPLETED" | "FAILED" | "PENDING" | null = null;
    let paymentId: string | null = null;

    // Check if this is a payment verification request
    if (params.event === "check" && params.paymentId) {
        const paymentIdParam = Array.isArray(params.paymentId) 
            ? params.paymentId[0] 
            : params.paymentId;
        
        if (paymentIdParam) {
            paymentId = paymentIdParam;
            
            try {
                const result = await paymentService.checkPayment({
                    website_id: WEBSITE_ID || "",
                    payment_id: paymentIdParam
                });
                
                if (result.success) {
                    paymentStatus = result.status;
                }
            } catch (error) {
                console.error("Payment check failed:", error);
                paymentStatus = "FAILED";
            }
        }
    }

    return (
        <div>
            <Wallet 
                paymentStatus={paymentStatus} 
                paymentId={paymentId}
            />
        </div>
    );
}