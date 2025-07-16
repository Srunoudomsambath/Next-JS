'use client'
import React,{useState} from 'react'
import {   undefined, z } from 'zod'
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
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
import {
  Card,

  CardAction,

  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Image from 'next/image';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const formSchema = z.object({
  username: z.string()
        .min(8, {
        message: "Username must be at least 8 characters.",
  })
        .max(20, {
        message: "Username must be at most 20 characters.",
    }),
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
      confirmPassword: z.string(),
  file: z
    .any()
    .refine(
      (file) =>
        !file ||
        (file instanceof File &&
          ACCEPTED_FILE_TYPES.includes(file.type) &&
          file.size <= MAX_FILE_SIZE
        ),
      {
        message: `File must be a JPG, PNG, or GIF and less than ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
        path: ["file"],
      }
    )
    }).refine((data) => data.password === data.confirmPassword,{
        message: "Passwords do not match.",
        path: ["confirmPassword"],// show error on confirmPassword field
    })

export default function RegisterForm() {
    const [showPassword,setShowPassword] = useState(false);
    const [preview,setPreview] = useState<string | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            file:undefined
        }
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
    
  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
   <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10">
       
        {/* Username */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Repeat password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Upload File</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => {
                                                const file = e.target.files?.[0];
                                                field.onChange(file);
                                                if (file) {
                                                    setPreview(URL.createObjectURL(file));
                                                } else {
                                                    setPreview(null);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    {preview && (
                                        <Image
                                            src={preview}
                                            alt="Preview"
                                            width={128}
                                            height={128}
                                            className="mt-4 w-32 h-32 object-cover rounded"
                                        />
                                    )}
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
