import {FormValues} from "@/components/ProgressForm/ProgressForm"
import { toast } from "sonner"
export async function submitProgressReport(data: FormValues) {
    const blockers = data.blockers ?? ""

    const payload = {
        name: data.name,
        progress: data.progress,
        blockers: data.blockers,
    }

    console.log("submitProgressReport: payload", payload)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    })
    // Read and log the response body for debugging (best-effort)
    const respText = await res.text().catch(() => "")
    console.log("submitProgressReport: response status", res.status, respText)

    if (!res.ok) {
        toast.error("Something went wrong. Please try again.")
        throw new Error(`Failed to submit feedback: ${respText}`)
    }

    toast.success("Progress submitted successfully")

    return true
}
