import { getStatusColor } from "../theme";

const columns = [
  { name: "TO_DO", color: getStatusColor("TO_DO") },
  { name: "IN_PROGRESS", color: getStatusColor("IN_PROGRESS") },
  { name: "DONE", color: getStatusColor("DONE") },
];

const useColumn = (status: string) => {
  let column = columns.reduce(
    (prev, next) => (next.name === status ? next : prev),
    columns[0]
  );

  return column;
};

export default useColumn;
