import { BookOpen } from "lucide-react";
import { signInConstants } from "../consts/sign-in-constants";

const SignInHeader = () => {
  return (
    <div className="text-center mb-8">
      <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-700" />
      <h1 className="text-2xl font-bold text-gray-900">
        {signInConstants.signInHeader}
      </h1>
      <p className="text-gray-600 mt-2">{signInConstants.signInDescription}</p>
    </div>
  );
};

export default SignInHeader;
