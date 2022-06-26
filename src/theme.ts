import { Status } from "./generated/graphql";

export const colors = {
  white: "#FFFFFF",
  black: "#000000",
  eggshell: "#f0ead6",
  darkGrey: "#565656",
  smokedWhite: "#e8e8e8",
};

export const columnColors = [
  { name: Status.ToDo, hexValue: "#1C7DD3" },
  { name: Status.InProgress, hexValue: "#F1C232" },
  { name: Status.Done, hexValue: "#529C00" },
];

export const getStatusColor = (status: string): string => {
  let statusColor = columnColors.reduce(
    (prev, next) => (next.name === status ? next : prev),
    columnColors[0]
  );

  return statusColor.hexValue;
};
