import { z } from "zod";

const signupValidation = z
  .object({
    name: z.string().trim().min(1, { message: "이름은 필수 입력 사항입니다." }),
    email: z.email({ message: "이메일 형식이 올바르지 않습니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(16, { message: "비밀번호는 16자 이하이어야 합니다." }),
    confirmPassword: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(16, { message: "비밀번호는 16자 이하이어야 합니다." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupValidation>;

export default signupValidation;
