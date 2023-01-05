//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 01 Jan 2023
//

import { useAuth, useLoginMutation } from "@dino/apollo";
import { FC, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mutationToast } from "../../common/Toast";
import FormInput from "../common/FormInput";
import LoadingBar from "../common/LoadingBar";

const LoginPage: FC = () => {
  const nav = useNavigate();
  const { refetch } = useAuth();
  const [login] = useLoginMutation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = useCallback(() => {
    mutationToast({
      async mutation() {
        const { data, errors } = await login({
          variables: { input: form },
        });

        if (!data || errors) {
          throw errors?.at(0)?.message ?? "Unexpected error";
        }

        switch (data.login.__typename) {
          case "Credentials":
            window?.localStorage?.setItem("token", data.login.token);
            await refetch();
            setTimeout(() => nav("/"), 0);
            return "Login successful";
          case "Unauthorized":
            throw "Invalid credentials";
        }
      },
    });

    setForm({ email: "", password: "" });
  }, [form, login, setForm, refetch]);

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-5 bg-[#C0B2A2]">
      <div className="h-20 m-2">
        <LoadingBar text="Login" />
      </div>
      <div className="flex items-center justify-center flex-col w-[80%] max-w-lg bg-white px-4 pb-4 pt-2 rounded-xl shadow-lg">
        <FormInput
          value={form.email}
          bind={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          label="Email"
          type="email"
        />
        <FormInput
          value={form.password}
          bind={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
          label="Password"
          type="password"
        />
        <div className="w-full flex items-center justify-between">
          <span className="text-xs font-mono">
            Don't have an account?{" "}
            <Link
              className="text-amber-500 hover:underline active:underline decoration-amber-500"
              to="/signup"
            >
              Sign Up
            </Link>
          </span>
          <button
            className="text-sm font-mono text-teal-500 hover:underline active:underline decoration-teal-500"
            onClick={submit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
