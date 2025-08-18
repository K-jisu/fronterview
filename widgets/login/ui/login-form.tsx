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
import { loginConstants } from "../consts/login-constants";
import type { LoginFormValues } from "../model/login-validation";
import loginValidation from "../model/login-validation";
import loginWithEmail from "../api/login";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginValidation),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitWithEmail = async (data: LoginFormValues) => {
    try {
      await loginWithEmail(data.email, data.password);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "로그인에 실패했습니다.";
      setError("root", { type: "serverLoginError", message });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{loginConstants.loginForm.loginTitle}</CardTitle>
        <CardDescription>
          {loginConstants.loginForm.loginDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmitWithEmail)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{loginConstants.loginForm.emailLabel}</Label>
            <Input
              id="email"
              type="email"
              placeholder={loginConstants.loginForm.emailPlaceholder}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {loginConstants.loginForm.passwordLabel}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={loginConstants.loginForm.passwordPlaceholder}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting
              ? loginConstants.loginForm.loginLoading
              : loginConstants.loginForm.loginButton}
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
          {loginConstants.loginForm.googleLogin}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">
            {loginConstants.loginForm.noAccount}{" "}
          </span>
          <Link href="/signup" className="text-blue-600 hover:underline">
            {loginConstants.loginForm.signUp}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
