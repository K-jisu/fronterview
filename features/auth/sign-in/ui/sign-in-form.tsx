"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import signInValidation from "../model/sign-in-validation";
import type { SignInFormValues } from "../model/sign-in-validation";
import { signInConstants } from "../consts/sign-in-constants";
import { useRouter } from "next/navigation";
import { signInWithEmail } from "../api/sign-in";

const SignInForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInValidation),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitWithEmail = async (data: SignInFormValues) => {
    try {
      await signInWithEmail(data.email, data.password);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "로그인에 실패했습니다.";
      setError("root", { type: "serverLoginError", message });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{signInConstants.signInForm.signInTitle}</CardTitle>
        <CardDescription>
          {signInConstants.signInForm.signInDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmitWithEmail)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              {signInConstants.signInForm.emailLabel}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={signInConstants.signInForm.emailPlaceholder}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {signInConstants.signInForm.passwordLabel}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={signInConstants.signInForm.passwordPlaceholder}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting
              ? signInConstants.signInForm.signInLoading
              : signInConstants.signInForm.signInButton}
          </Button>
          {errors.root && (
            <p className="text-sm text-red-500">
              {errors.root.message as string}
            </p>
          )}
        </form>

        <Separator />

        <Button variant="outline" className="w-full bg-transparent">
          <Mail className="mr-2 h-4 w-4" />
          {signInConstants.signInForm.googleSignIn}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">
            {signInConstants.signInForm.noAccount}{" "}
          </span>
          <Link href="/signup" className="text-blue-600 hover:underline">
            {signInConstants.signInForm.signUp}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
