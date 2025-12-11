"use client";


import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const RegisterForm = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl my-10 border">
      <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
      <form>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </Field>

            {/* Address */}
            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="123 Main St"
                className="border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </Field>

            {/* Phone */}
            <Field>
              <FieldLabel htmlFor="number">Phone</FieldLabel>
              <Input
                id="number"
                name="number"
                type="tel"
                placeholder="00101011"
                className="border-gray-300 focus:ring-2 focus:ring-blue-500"
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
                className="border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </Field>

            {/* Password (centered on large screens) */}
            <Field className="md:col-span-2 md:flex md:flex-col md:items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="border-gray-300 focus:ring-2 focus:ring-blue-500 w-full md:w-1/2"
              />
            </Field>
          </div>

          {/* Submit button */}
          <FieldGroup className="mt-6">
            <Field>
              <Button type="submit" className="w-full">
                Register
              </Button>

              <FieldDescription className="px-6 text-center mt-2 text-gray-500">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Sign in
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
};

export default RegisterForm;
