
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

export type NotificationProps = {
  staus: number;
  data: {
    _count: {
      notification: number;
    };
  };
};

export type FolderProps = {
  status: number;
  data: {
    name: string;
    _count: {
      videos: number;
    };
  };
};
export type FoldersProps = {
  status: number;
  data: {
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workspaceId: string | null;
    _count: {
      videos: number;
    };
  }[];
};

export type VideosProps = {
  status: number;
  data: {
    User: {
      firstname: string | null;
      lastname: string | null;
      image: string | null;
    } | null;
    id: string;
    processing: boolean;
    Folder: {
      id: string;
      name: string;
    } | null;
    createdAt: Date;
    title: string | null;
    source: string;
  }[];
};

export type PreviewVideoProps = {
  status: number;
  author: boolean;
  data: {
    User: {
      firstname: string | null;
      lastname: string | null;
      image: string | null;
      clerkId: string;
      trial: boolean;
      subscription: {
        plan: "FREE" | "PRO";
      } | null;
    };
    title: string | null;
    description: string | null;
    source: string;
    createdAt: Date;
    summery: string | null;
    processing: boolean;

  };
};
