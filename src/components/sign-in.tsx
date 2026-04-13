"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/src/components/ui/card";
import { useState } from "react";
import { LayoutGrid } from "lucide-react";
import { authClient } from "@/src/lib/auth-client";
import { cn } from "@/lib/utils";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[420px] px-4">
      {/* Logo Area */}
      <div className="flex flex-col items-center justify-center mb-10 gap-4">
        <div className="brand-gradient p-3.5 rounded-2xl shadow-lg shadow-black/10 flex items-center justify-center">
          <LayoutGrid className="w-7 h-7 text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight leading-tight brand-gradient-text">
            INTELLIBUS
          </h1>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1.5">
            Demo Hub Platform
          </p>
        </div>
      </div>

      <Card className="w-full shadow-2xl shadow-black/5 border-muted/50 rounded-2xl overflow-hidden">
        <CardHeader className="pb-6 border-b border-muted/20 bg-muted/10 text-center">
          <CardTitle className="text-xl font-bold">Secure Portal Login</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            Authenticate with your corporate identity
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 pb-8 px-6 sm:px-10">
          <div className="w-full">
            <Button
              variant="outline"
              className="w-full h-14 text-[15px] font-medium flex items-center justify-center gap-3 rounded-xl shadow-sm border-muted-foreground/20 hover:bg-muted/30 hover:shadow transition-all duration-200"
              disabled={loading}
              onClick={async () => {
                await authClient.signIn.social(
                  {
                    provider: "google",
                    callbackURL: "/",
                  },
                  {
                    onRequest: (ctx: any) => {
                      setLoading(true);
                    },
                    onResponse: (ctx: any) => {
                      setLoading(false);
                    },
                  },
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 256 262"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                ></path>
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>
              Sign in with Google
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-10 text-center text-xs text-muted-foreground/60 px-4 leading-relaxed max-w-sm">
        Secure Access Control. Authorized personnel only.<br />
        Permissions are role-based and strictly monitored.
      </div>
    </div>
  );
}
