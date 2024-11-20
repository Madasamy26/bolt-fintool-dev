import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { WorkDetailsForm } from './WorkDetailsForm'

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dob: z.string().min(1, 'Date of birth is required'),
});

export function PersonalDetailsForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-[400px] grid-cols-2 gap-2 mb-4 bg-transparent">
        <TabsTrigger 
          value="personal"
          className="data-[state=active]:bg-[hsl(var(--primary)_/_0.9)] data-[state=active]:text-white bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Personal Details
        </TabsTrigger>
        <TabsTrigger 
          value="work"
          className="data-[state=active]:bg-[hsl(var(--primary)_/_0.9)] data-[state=active]:text-white bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Work Details
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="personal">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end mt-6">
          <Button type="submit">
           Next
          </Button>
        </div>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="work">
        <WorkDetailsForm />
      </TabsContent>
    </Tabs>
  );
}
