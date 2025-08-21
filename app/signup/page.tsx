import SignupForm from "../../features/auth/sign-up/ui/signup-form";
import SignupHeader from "../../features/auth/sign-up/ui/signup-header";

const SignUp = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-md mx-auto">
        <SignupHeader />
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUp;
