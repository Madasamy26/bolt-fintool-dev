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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  name: z.string().min(1, { message: "Name field is required " }).min(2, {
    message: "Name must be at least 2 characters.",
  }),
  dob: z.string().min(1, { message: "Date of Birth field is required " }).regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Please enter a valid date in the format YYYY-MM-DD.",
  }),
  retirementAge: z.number().min(50).max(100),
  phoneNumber: z.string().min(1, { message: "Phone Number field is required " }).regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit phone number.",
  }),
  email: z.string().min(1, { message: "Email field is required *" }).email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().min(1, { message: "Address field is required " }).min(5, {
    message: "Address must be at least 5 characters.",
  }),
})

export function PersonalDetailsForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dob: "",
      retirementAge: 65,
      phoneNumber: "",
      email: "",
      address: "",
    },
  })

  const { formState } = form;

  function onSubmit(values) {
    console.log(values)
  }

  const getErrorMessage = (fieldName) => {
    const error = formState.errors[fieldName];
    if (error) {
      if (error.type === 'too_small' && error.minimum === 1) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} field is required *.`;
      }
      return error.message;
    }
    return null;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription>
                  This is your full name.
                </FormDescription>
                {formState.isSubmitted && getErrorMessage('name') && (
                  <p className="text-red-500 text-sm mt-1">{getErrorMessage('name')}</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                {formState.isSubmitted && getErrorMessage('dob') && (
                  <p className="text-red-500 text-sm mt-1">{getErrorMessage('dob')}</p>
                )}
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="retirementAge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Retirement Age</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                </FormControl>
                {formState.isSubmitted && formState.errors.retirementAge && (
                  <p className="text-red-500 text-sm mt-1">{formState.errors.retirementAge.message}</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                {formState.isSubmitted && formState.errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{formState.errors.phoneNumber.message}</p>
                )}
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                {formState.isSubmitted && formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{formState.errors.email.message}</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, City, Country" {...field} />
                </FormControl>
                {formState.isSubmitted && formState.errors.address && (
                  <p className="text-red-500 text-sm mt-1">{formState.errors.address.message}</p>
                )}
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end mt-6">
          <Button 
            type="submit" 
            className="bg-[#0C7FDA] text-white px-6 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
          >
            Next
          </Button>
        </div>
      </form>
    </Form>
  )
}
