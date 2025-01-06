"use client";

import Label from "@/app/components/label";
import AlertMessage from "../../components/alertMessage";
import SubmitButton from "@/app/components/submitButton";
import { updateSettings } from "@/utils/actions";
import { useActionState } from "react";
import Input from "@/app/components/input";
import SelectDataRange from "../../components/selectDataRange";

const initialState = {
  message: "",
  error: false,
};
const SettingsForm = ({ defaults }) => {
  const [state, formAction] = useActionState(updateSettings, initialState);
  return (
    <form className="space-y-4" action={formAction}>
      {state?.error && <AlertMessage type={"error"} message={state?.message} />}
      {!state?.error && state?.message.length > 0 && (
        <AlertMessage type={"success"} message={state?.message} />
      )}
      <Label htmlFor="name">User name</Label>
      <Input
        type="text"
        name="fullName"
        id="fullName"
        placeholder="User full name"
        defaultValue={defaults?.fullName}
      />
      <Label htmlFor="defaultView">Default transactions view</Label>
      <SelectDataRange
        name="defaultView"
        id="defaultView"
        defaultValue={defaults?.defaultView}
      />
      <SubmitButton>Update Settings</SubmitButton>
    </form>
  );
};

export default SettingsForm;
