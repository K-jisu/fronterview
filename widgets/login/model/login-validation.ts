import { z } from "zod";

const loginValidation = z.object({
  email: z.email({ message: "이메일 형식이 올바르지 않습니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
    .max(16, { message: "비밀번호는 16자 이하이어야 합니다." }),
});

export type LoginFormValues = z.infer<typeof loginValidation>;

export default loginValidation;
