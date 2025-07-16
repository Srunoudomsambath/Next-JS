'use client'
import React,{useState} from 'react'
import {  z } from 'zod'
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {
  Form, 
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const formSchema = z.object({
    email: z.string()
        .email({
        message: "Invalid email address.",
    })
     ,
    password: z.string()
        .min(8, {
        message: "Password must be at least 8 characters.",
    })
       .regex(passwordRegex,{
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
   })

export default function LoginForm() {
    const [showPassword,setShowPassword] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email: "",
            password: ""
        }
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    
  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Login with your Email or Google account</CardDescription>
      </CardHeader>
      <CardContent>
   <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10">


        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                  <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Strong password"
                {...field}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-xl"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <IoMdEyeOff />  : <IoMdEye />
}
              </button>
            </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

                   <Button type="submit">Register</Button>
      </form> 
      </Form>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}
