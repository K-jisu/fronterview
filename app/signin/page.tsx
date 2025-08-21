import SignInForm from "../../features/auth/sign-in/ui/sign-in-form";
import SignInHeader from "../../features/auth/sign-in/ui/sign-in-header";

const SignIn = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-md mx-auto">
        <SignInHeader />
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
