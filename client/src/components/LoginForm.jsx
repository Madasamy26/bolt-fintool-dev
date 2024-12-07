import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast'; // Import the useToast hook

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export function LoginForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const loginState = useAuthStore(state => state.login);
  const error = useAuthStore(state => state.error);
  const { login } = useAuthStore();


  // useEffect(()=>{
  //   toast({
  //     message: 'Login successful!',
  //     type: 'success', // Show success toast
  //   });
  // },[])

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      await login({email:values.email, password:values.password});
      toast({
        message: 'Login successful!',
        type: 'success', // Show success toast
      });
      navigate('/dashboard');
    } catch (error) {

      console.error('Login failed:', error);
      toast({
        message: 'Login failed. Please try again.',
        type: 'error', // Show error toast
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md">
              {error}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#0C7FDA] text-white shadow-md hover:shadow-lg transition-all duration-200"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>

          {/* <div className="mt-4 text-sm text-gray-500">
            <p className="text-center">Test Credentials:</p>
            <p className="text-center">Email: john@example.com</p>
            <p className="text-center">Password: 123456</p>
          </div> */}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-gray-500 text-center">
            Don't have an account?
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
