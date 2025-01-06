"use client";
import Input from "@/app/components/input";
import SubmitButton from "@/app/components/submitButton";
import { uploadAvatar } from "@/utils/actions";
import React from "react";
import { useActionState } from "react";
import AlertMessage from "../../components/alertMessage";

const initialState = {
  message: "",
  error: false,
};
const Page = () => {
  const [state, formAction, isPending] = useActionState(
    uploadAvatar,
    initialState
  );

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-8">Avatar</h1>
      <form className="space-y-4" action={formAction}>
        {state?.error && <AlertMessage type="error" message={state.message} />}
        {!state?.error && state?.message.length > 0 && (
          <AlertMessage type="success" message={state.message} />
        )}
        <Input type="file" name="file" id="file" />

        <SubmitButton isPending={isPending}>Upload</SubmitButton>
      </form>
    </div>
  );
};

export default Page;
