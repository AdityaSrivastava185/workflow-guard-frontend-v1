"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { submitProgressReport } from "@/action/ProgressSubmit.action"

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(32, "Name must be at most 32 characters"),
  progress: z
    .string()
    .min(20, "Progress must be at least 20 characters")
    .max(500, "Progress must be at most 500 characters"),
  blockers: z
    .string()
    .max(200, "Blockers must be at most 200 characters")
    .optional(),
})

export type FormValues = z.infer<typeof formSchema>

export function ProgressReportForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      progress: "",
      blockers: "",
    },
  })

  const [loading, setLoading] = React.useState(false)

  async function onSubmit(values: FormValues) {
  setLoading(true)

  try {
    await submitProgressReport(values)
    toast.success("Progress submitted successfully")
    form.reset()
  } catch {
    toast.error("Something went wrong. Please try again.")
  } finally {
    setLoading(false)
  }
}

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Daily Progress Update</CardTitle>
        <CardDescription>
          Share what you worked on today. This goes directly to the team.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="progress-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Name */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Aditya"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Progress */}
            <Controller
              name="progress"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>What did you work on today?</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      rows={6}
                      placeholder="Implemented Slack notifications for feedback submissions..."
                      className="resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {field.value.length}/500
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription>
                    Be specific. This is the only part sent to Slack.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Blockers */}
            <Controller
              name="blockers"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Blockers (optional)</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Waiting on API access, flaky tests, etc."
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal" className="justify-between w-full">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="cursor-pointer"
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="progress-form"
            disabled={loading}
            className={
                `cursor-pointer ${
                    loading ? "cursor-not-allowed opacity-60"
                    : "cursor-pointer"
                }`
            }
          >
            {loading ? "Submitting…" : "Submit"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
