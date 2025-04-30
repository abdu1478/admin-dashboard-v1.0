import { useEffect, useState } from "react";
import { Sun, Moon} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/Helper/supabaseClient"; 
import { toast } from "sonner";
import { useTheme } from "@/components/theme-provider";

interface Props {
    setResetEmail: React.Dispatch<React.SetStateAction<string>>;
}

const Reset = ({setResetEmail}: Props) =>{
    const { theme , setTheme } = useTheme(); 
    const darkMode = theme === 'dark';
    const setDarkMode = (darkMode: boolean) => {
        setTheme(darkMode ? 'dark' : 'light');
    };
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate email format    
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            toast.error("Please enter a valid email address.");
            setIsLoading(false);
            setError("Invalid email format.");
            return;
        }
        // Call Supabase password reset function
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
              redirectTo: `${window.location.origin}/update-password`,
            });
            if (error) throw error;
          
            // Store to sessionStorage for your UpdatePassword page to read:
            sessionStorage.setItem("resetEmail", email);
          
            toast.success(
              "If this email is registered, a reset link has been sent to your email."
            );
            setResetEmail(email);
            setEmail("");
          } catch (err: any) {
            toast.error(`Failed to send reset link. ${err.message}`);
            setError("Failed to send reset link.");
          } finally {
            setIsLoading(false);
          }
          
    }
    useEffect(() => {
        const time = 1000 * 60
        const timer = setTimeout(() => {

        }, time)
    })


    return (
        <div className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
          }`}>
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute top-4 right-4 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </Button>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                    Reset Password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    Enter your email address to reset your password.
                </p>
                <form action="" onSubmit={handleReset} className="mt-8 space-y-6" method="POST">

                    <input
                        type="email"
                        placeholder="Email address"
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        required   
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setResetEmail(e.target.value)
                        }}                     
                        />
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 cursor-pointer"
                        disabled={isLoading}
                        aria-disabled={isLoading ? "true" : "false"}
                        aria-label="Send reset link"
                    >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Reset;