import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { cn } from "../../lib/utils";
import axios from 'axios';
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {z} from 'zod';
import { authAtom, isCategoryValidAtom } from "../../jotai/atom";
import { useSetAtom } from "jotai";

const UserDataSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required")
})

type UserDataType  = z.infer<typeof UserDataSchema>;

export function SigninForm() {
  const [userData, setUserData] = useState<UserDataType>({
    email: "",
    password: ""
  });
  const setAuth = useSetAtom(authAtom);
  const setIsCategoryValid = useSetAtom(isCategoryValidAtom);
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Data validation
    const parsedData = UserDataSchema.safeParse(userData);
    if(!parsedData.success){
      const formattedErrors = parsedData.error.format();
      if(formattedErrors.password) toast.error(formattedErrors.password?._errors[0])
      if(formattedErrors.email) toast.error(formattedErrors.email?._errors[0])
      return;
    }

    // Api call
    try {
      const response = await axios.post('http://localhost:3000/api/v1/signin', userData);
      toast.success(response.data.msg);
      localStorage.setItem('token', response.data.token);
      if(response.data.categories == null || response.data.categories == ""){
        navigate('/categories');
      }
      setIsCategoryValid(true);
      setAuth(true);
      navigate('/');
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };
  
  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome Back to InstaNews
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Access your personalized news feed. Log in to continue.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" onChange={(e) => setUserData({...userData, email: e.target.value.trim()})}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" onChange={(e) => setUserData({...userData, password: e.target.value})}/>
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign in &rarr;
          <BottomGradient />
        </button>
      </form>
      <p className="text-white text-sm">Don't have an account? <span className="text-[#978bda] cursor-pointer" onClick={() => navigate('/signup')}>Sign up</span></p>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
