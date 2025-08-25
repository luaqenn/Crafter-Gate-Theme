import { Metadata } from "next"
import Posts from "@/components/posts"

export const metadata: Metadata = {
    title: 'Gönderiler',
    description: 'Gönderiler',
}

export default function PostsPage() {
    return (
        <div>
            <Posts />
        </div>
    )
}