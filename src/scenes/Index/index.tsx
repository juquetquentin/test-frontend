import { useEffect, useState } from "react";
import { Job, Status, useJobsQuery } from "../../generated/graphql";
import { Card } from "./Card";
import { Column } from "./Column";

import styles from "./styles.module.css";

export function Index() {
  const { data, loading, previousData } = useJobsQuery({ pollInterval: 1000 });
  const [updatedTasks, setUpdatedTasks] = useState([]);

  const isUpdatedTask = (taskId: string) => {
    const updated = updatedTasks?.find((task: Job) => task?.id === taskId);

    return updated;
  };

  useEffect(() => {
    const updatedTasks = data?.jobs.filter((job) => {
      if (
        !previousData?.jobs.find((prevJob) => prevJob.id === job.id) ||
        previousData.jobs.find(
          (prevJob) => prevJob.id === job.id && prevJob.status !== job.status
        )
      ) {
        return job;
      }
    });

    setUpdatedTasks(updatedTasks as []);
  }, [data]);

  if (!data && loading) {
    return <div>…</div>;
  }

  if (!data) {
    return <div>Something went wrong :(</div>;
  }

  return (
    <div className={styles.container}>
      <Column name={Status.ToDo}>
        {data.jobs
          .filter((it) => it.status === Status.ToDo)
          .map((it) => (
            <Card
              job={it}
              key={`card-${it.id}`}
              isNew={!!isUpdatedTask(it.id)}
            />
          ))}
      </Column>
      <Column name={Status.InProgress}>
        {data.jobs
          .filter((it) => it.status === Status.InProgress)
          .map((it) => (
            <Card
              job={it}
              key={`card-${it.id}`}
              isNew={!!isUpdatedTask(it.id)}
            />
          ))}
      </Column>
      <Column name={Status.Done}>
        {data.jobs
          .filter((it) => it.status === Status.Done)
          .map((it) => (
            <Card
              job={it}
              key={`card-${it.id}`}
              isNew={!!isUpdatedTask(it.id)}
            />
          ))}
      </Column>
    </div>
  );
}
