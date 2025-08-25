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
    const paymentId = params.paymentId as string;
    const event = params.event as string;
    return (
        <div>
            <Wallet 
                paymentId={paymentId}
                event={event}
            />
        </div>
    );
}