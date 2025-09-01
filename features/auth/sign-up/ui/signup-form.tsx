"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupConstants } from "../consts/signup-constants";
import signupValidation from "../model/signup-validation";
import type { SignupFormValues } from "../model/signup-validation";
import signup from "../api/sign-up";
import Image from "next/image";
import { signInWithGitHub } from "../../sign-in/api/sign-in";
import { successToast } from "../../../../shared/model/success-toast";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupValidation),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitWithEmail = async (data: SignupFormValues) => {
    try {
      const { data: user } = await signup(data);
      if (user) {
        successToast("회원가입에 성공했습니다!");
        router.push("/signin");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "회원가입에 실패했습니다.";
      setError("root", { type: "serverSignupError", message });
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithGitHub();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{signupConstants.signupForm.signupTitle}</CardTitle>
        <CardDescription>
          {signupConstants.signupForm.signupDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmitWithEmail)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{signupConstants.signupForm.nameLabel}</Label>
            <Input
              id="name"
              type="text"
              placeholder={signupConstants.signupForm.namePlaceholder}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              {signupConstants.signupForm.emailLabel}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={signupConstants.signupForm.emailPlaceholder}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              {signupConstants.signupForm.passwordLabel}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={signupConstants.signupForm.passwordPlaceholder}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {signupConstants.signupForm.confirmPasswordLabel}
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder={
                signupConstants.signupForm.confirmPasswordPlaceholder
              }
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting
              ? signupConstants.signupForm.signupLoading
              : signupConstants.signupForm.signupButton}
          </Button>
          {errors.root && (
            <p className="text-sm text-red-500">
              {errors.root.message as string}
            </p>
          )}
        </form>

        <Separator />

        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={handleGithubSignIn}
        >
          <Image
            src={"/github-icon.png"}
            alt="깃헙 로그인"
            width={25}
            height={25}
          />
          {signupConstants.signupForm.gitHubLogin}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">
            {signupConstants.signupForm.alreadyHaveAccount}
          </span>
          <Link href="/signin" className="text-blue-600 hover:underline">
            {signupConstants.signupForm.login}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
