"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const router = useRouter();
  const { reload } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/login", { email, password });
      // reload UserContext
      await reload();
      router.push(redirect || "/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Login to your account
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {redirect && <input type="hidden" name="redirect" value={redirect} />}

        <FieldGroup className="space-y-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              className="bg-gray-100 dark:bg-slate-700"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="bg-gray-100 dark:bg-slate-700"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>

          <Field className="mt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Field>
        </FieldGroup>

        <div className="mt-6 text-center space-y-2">
          <FieldDescription>
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </FieldDescription>

          <FieldDescription>
            <a
              href="/forget-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
          </FieldDescription>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
