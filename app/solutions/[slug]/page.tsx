import { redirect } from "next/navigation";

export default async function LegacySolutionDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    redirect(`/features/${slug}`);
}
