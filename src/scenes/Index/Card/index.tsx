import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import styled from "styled-components";
import { colors } from "../../../theme";

import { Job } from "../../../generated/graphql";

import styles from "./styles.module.css";
import useColumn from "../../../hooks/useColumn";

type Props = { job: Job; isNew: boolean };

const Container = styled.div`
  background-color: ${colors.eggshell};
  border-radius: 0.5rem;
  border: ${({ color }) => `solid 2px ${color}`};
  margin: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: bold;
`;

const DotStatus = styled.div`
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: ${({ color }) => color};
`;

const TaskName = styled.span`
  color: ${colors.black};
`;

const Date = styled.div`
  color: ${colors.darkGrey};
`;

const Status = styled.div`
  color: ${colors.darkGrey};
`;

const AnimatedBloc = styled.div<{ show: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: ${({ show }) => (show ? "100%" : "0%")};
  height: 100%;
  background: ${({ color }) => color};
  transform: rotate(180deg);
  transition: all 0.75s ease;
`;

export function Card({ job, isNew }: Props) {
  const column = useColumn(job.status);
  const [show, setShow] = useState(true);

  if (isNew) {
    console.log("updated", job.name);
  }

  useEffect(() => {
    setTimeout(() => setShow(false), 1000);
  }, []);

  return (
    <Container color={column.color}>
      <AnimatedBloc show={show} color={column.color} />
      <NameContainer>
        <DotStatus color={column.color} />
        <TaskName>{job.name}</TaskName>
      </NameContainer>
      <Date className={styles.subtitle}>
        {new Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(DateTime.fromISO(job.createdAt).toJSDate())}
      </Date>
      <Status>{job.status}</Status>
    </Container>
  );
}
