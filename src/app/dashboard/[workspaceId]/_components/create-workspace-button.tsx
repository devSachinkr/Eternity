"use client";
import { getWorkspaces } from "@/actions/workspace";
import WorkspaceForm from "@/components/global/forms/workspace-form";
import Modal from "@/components/global/modal";
import { useQueryData } from "@/hooks/query-data";
import { PlusCircle } from "lucide-react";


const CreateWorkspaceButton = () => {
  const { data } = useQueryData(["user-workspaces"], getWorkspaces);
  const { data: plan } = data as {
    status: number;
    data: {
      subscription: {
        plan: "PRO" | "FREE";
      } | null;
    };
  };

    if (plan.subscription?.plan === "FREE") return <></>;
  return (
    plan.subscription?.plan === "PRO" && (
      <Modal
        title="Create a Workspace"
        description="Workspace helps you to collaborate with other team members. You assigned a default PERSONAL workspace. "
        trigger={
          <span className="bg-[#1D1D1D] text-[#fff] flex items-center gap-2 py-4 px-4 rounded-2xl border-demonGreen border-[1px] hover:bg-demonGreen/80 transition-all duration-300 ">
            <PlusCircle className="w-5 h-5" />
            Create Workspace
          </span>
        }
      >
        <WorkspaceForm />
      </Modal>
    )
  );
};

export default CreateWorkspaceButton;
