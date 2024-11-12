export type WorkspaceProps = {
  data: {
    subscription: {
      plan: "FREE" | "PRO";
    } | null;
    workspace: {
      id: string;
      name: string;
      type: "PERSONAL" | "PUBLIC";
    }[];
    members: {
      Workspace: {
        id: string;
        name: string;
        type: "PERSONAL" | "PUBLIC";
      };
    }[];
  };
};


export type NotificationProps={
  staus:number ,
  data:{
    _count:{
      notification:number
    }
  }
}