import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import signin from "/public/SignIn.svg";
import { toast, Toaster } from "sonner";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target);
      const credentials = Object.fromEntries(formData);

      const response = await fetch(
        "https://library-project-6agw.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      toast.success("Welcome");
      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center bg-white">
      <img
        src={signin}
        className="w-[913px] bg-[#C9AC8CED] px-[50px] py-[100px]"
        alt="Sign In Illustration"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white px-[200px] pb-[140px] pt-[123px] text-black"
      >
        <h2 className="mb-5 font-slab text-[40px] font-black">Sign in</h2>

        <div className="flex flex-col gap-5">
          <input
            className="w-[430px] rounded-xl border border-[#474747] px-[29px] py-[16px]"
            name="email"
            type="email"
            placeholder="Email"
            required
          />

          <div className="relative">
            <input
              className="w-[430px] rounded-xl border border-[#474747] px-[29px] py-[16px] pr-12"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-[39px] rounded-full bg-[#152540] max-w-[430px] w-full py-6 text-[18px] font-medium text-white disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </>
          ) : (
            "Next step"
          )}
        </Button>
      </form>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default LoginPage;
