"use client"

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { FC, useState } from "react";
// Components
import { useToast } from "@/hooks/use-toast";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error signing in with Google",
        variant: "destructive",
      });
      return;
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button onClick={loginWithGoogle} isLoading={isLoading} size="sm" className="w-full">
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Sign in with Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
