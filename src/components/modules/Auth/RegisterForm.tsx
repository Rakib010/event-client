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
import { authApi } from "@/services/api";
import { useRouter } from "next/navigation";
import { RegisterFormData } from "@/types";
import Image from "next/image";

const RegisterForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authApi.register(formData);
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900 py-8">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Create your account
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <FieldGroup className="space-y-4">
          {/* Profile Image */}
          <Field>
            <FieldLabel htmlFor="image">Profile Image (Optional)</FieldLabel>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="bg-gray-100 dark:bg-slate-700"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-2 flex justify-center">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              </div>
            )}
          </Field>

          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              className="bg-gray-100 dark:bg-slate-700"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </Field>

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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
            />
          </Field>

          {/* Phone */}
          <Field>
            <FieldLabel htmlFor="phone">Phone (Optional)</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1234567890"
              className="bg-gray-100 dark:bg-slate-700"
              value={formData.phone}
              onChange={handleChange}
            />
          </Field>

          {/* Location */}
          <Field>
            <FieldLabel htmlFor="location">Location (Optional)</FieldLabel>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="New York, USA"
              className="bg-gray-100 dark:bg-slate-700"
              value={formData.location}
              onChange={handleChange}
            />
          </Field>

          <Field className="mt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </Field>
        </FieldGroup>

        <div className="mt-6 text-center">
          <FieldDescription>
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </FieldDescription>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
