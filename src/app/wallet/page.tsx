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
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function WalletPage({ searchParams }: WalletPageProps) {
    let paymentStatus: "COMPLETED" | "FAILED" | "PENDING" | null = null;
    let paymentId: string | null = null;

    // Check if this is a payment verification request
    if (searchParams.event === "check" && searchParams.paymentId) {
        const paymentIdParam = Array.isArray(searchParams.paymentId) 
            ? searchParams.paymentId[0] 
            : searchParams.paymentId;
        
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