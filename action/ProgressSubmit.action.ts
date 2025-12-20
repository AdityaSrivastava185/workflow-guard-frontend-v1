import {FormValues} from "@/components/ProgressForm/ProgressForm"
import { toast } from "sonner"
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
    toast.success("Progress submitted successfully")

    if (!res.ok) {
        toast.error("Something went wrong. Please try again.")
        throw new Error("Failed to submit feedback")

    }

    return true
}
