import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  yearsOfExperience: z.number().min(0).max(50),
  annualIncome: z.number().min(0),
})

export function WorkDetailsForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      position: "",
      yearsOfExperience: 0,
      annualIncome: 0,
    },
  })

  function onSubmit(values) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormDescription>
                Your current employer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="yearsOfExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="annualIncome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Income</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end mt-6">
          <Button type="submit">
           Next
          </Button>
        </div>
      </form>
    </Form>
  )
}