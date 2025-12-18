import { ProgressReportForm } from "@/components/ProgressForm/ProgressForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black m-7 xl:m-0">
      <ProgressReportForm />
    </div>
  );
}
