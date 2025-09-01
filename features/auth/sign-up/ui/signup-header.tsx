import { BookOpen } from "lucide-react";
import { signupConstants } from "../consts/signup-constants";

const SignupHeader = () => {
  return (
    <div className="text-center mb-8">
      <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-700" />
      <h1 className="text-2xl font-bold text-gray-900">
        {signupConstants.signupHeader}
      </h1>
      <p className="text-gray-600 mt-2">{signupConstants.signupDescription}</p>
    </div>
  );
};

export default SignupHeader;
