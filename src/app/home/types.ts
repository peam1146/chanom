export type ReactionProps = {
  type: ReactionType;
  className?: string;
  onClick?: () => void;
};

export type ReactionType = "heart" | "like" | "ok" | "skull" | "star" | "fire";
