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
import Link from 'next/link'
import Image from 'next/image'

const formSchema = z.object({
    email: z.string()
        .email({
        message: "Please enter the valid email address.",
    })
     ,
    password: z.string()
        .min(5, {
        message: "Please enter the valid password for your account.",
    })
      
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
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-6 p-4 rounded-3xl ">
      {/* Logo Image */}
      
      <Image
        width={500}
        height={500}
        id="logoImage"
        src="https://static.vecteezy.com/system/resources/thumbnails/027/205/841/small_2x/login-and-password-concept-3d-illustration-computer-and-account-login-and-password-form-page-on-screen-3d-illustration-png.png"
        alt="Login illustration"
        className="rounded-md shadow-md"
      />

      {/* Login Card */}  
      <Card className="w-full max-w-md text-center shadow-lg bg-white p-6">
        <CardHeader>
            {/* 3D Logo Symbol */}
      <div className="relative mb-4 flex items-center justify-center">
       <div className="relative w-12 h-12 flex items-center j bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-xl shadow-lg transform hover:scale-110 hover:rotate-6 transition-all duration-300">
            <div className="absolute inset-0 transform translate-x-1 translate-y-1 w-12 h-12 bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded-xl blur-sm"></div>
       
          <div className="absolute inset-1 bg-gradient-to-br from-white/30 to-transparent rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">S</div>
        </div>
      </div>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Login with your email or Google account</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* OAuth Buttons */}
      

              {/* Email Field */}
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

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="/register"
                          className="text-sm text-blue-600 hover:underline underline-offset-4"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg text-gray-600"
                            tabIndex={-1}
                          >
                            {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                Login
              </Button>
               <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
                      <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  {/* Apple Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Apple
                </Button>

                <Button variant="outline" className="w-full">
                  {/* Google Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Google
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="justify-center">
  <p className="text-sm">
    Don’t have an account?{' '}
    <Link href="/register" className="text-blue-600 hover:underline">
      Register
    </Link>
  </p>
</CardFooter>

      </Card>
    </div>
  );
}

