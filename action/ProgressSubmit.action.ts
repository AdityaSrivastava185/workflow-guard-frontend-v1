import {FormValues} from "@/components/ProgressForm/ProgressForm"
export async function submitProgressReport(data: FormValues) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/feedback`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: data.name,
                progress: data.progress,
                blockers: data.blockers,
            }),
        }
    )

    if (!res.ok) {
        throw new Error("Failed to submit feedback")
    }

    return true
}
