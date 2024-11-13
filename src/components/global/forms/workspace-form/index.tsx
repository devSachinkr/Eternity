"use client";
import { useWorkspace } from "@/hooks/workspace";
import React from "react";
import FormGenerator from "../../form-generator";
import { Button } from "@/components/ui/button";
import Spinner from "../../spinner";
const WorkspaceForm = () => {
  const { hookForm, handleSubmit, isPending } = useWorkspace();
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 ">
      <FormGenerator
        name="name"
        label="Name"
        type="text"
        inputType="input"
        register={hookForm.register}
        errors={hookForm.formState.errors}
        placeholder="Enter Workspace Name"
      />
      <Button
        type="submit"
        disabled={isPending}
        className="bg-demonGreen hover:bg-demonGreen/60 text-white font-semibold"
      >
        <Spinner loading={isPending}>Create</Spinner>
      </Button>
    </form>
  );
};

export default WorkspaceForm;
