"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signupUser } from '@/app/actions'
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'

export default function Signup() {
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const toastId = toast.loading("Signing up...");

    const formData = new FormData(event.currentTarget);

    const result = await signupUser(formData)

    if (!result.success) {
        toast.error("An account with this email already exists.", {
            id: toastId,
        })
    } else {
        toast.success("Congratulations, Account created.", {
            id: toastId,
        });
        router.push('/login')
    }
  };
  return (
    <section className="h-screen flex flex-col justify-cente items-center">
        <h1 className="capitalize text-5xl text-center font-bold mb-10">
            Create a new Account / Signup
        </h1>
        <div className="flex justify-center items-center border-2 w-full max-w-md p-10 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 w-full">
                <Input placeholder="First name" name="first_name" type="text" className="w-full sm:w-3/4" required/>
                <Input placeholder="Last name" name="last_name" type="text" className="w-full sm:w-3/4" required/>
                <Input placeholder="Date of Birth" name="date_of_birth" type="date" className="w-full sm:w-3/4" required/>
                <Input placeholder="Email" name="email" type="email" className="w-full sm:w-3/4" required/>
                <Input placeholder="New Password" name="password" type="password" className="w-full sm:w-3/4" required/>
                <Button type="submit" className="bg-black text-white text-base">Signup</Button>
                <hr className="h-0.5 w-full bg-gray-300" />
            </form>
        </div>
    </section>
  )
}
