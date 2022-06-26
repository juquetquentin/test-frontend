import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import styled from "styled-components";
import { Trans } from "react-i18next";

import { colors } from "../../../theme";
import { Job } from "../../../generated/graphql";

import styles from "./styles.module.css";
import useColumn from "../../../hooks/useColumn";

type Props = { job: Job };

const Container = styled.div`
  background-color: ${colors.white};
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
  margin: 0.25rem 0;
`;

const Status = styled.div`
  color: ${colors.white};
  display: flex;
  width: fit-content;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  background-color: ${({ color }) => color};
  border-radius: 1rem;
  font-weight: bold;
`;

const Text = styled.span<{ show: boolean }>`
  display: ${({ show }) => (show ? "block" : "none")};
`;

const AnimatedBloc = styled.div<{ show: boolean }>`
  position: absolute;
  display: flex;
  right: 0;
  top: 0;
  width: ${({ show }) => (show ? "100%" : "0%")};
  height: 100%;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => color};
  transition: all 0.75s ease;
  font-weight: bold;
`;

export function Card({ job }: Props) {
  const column = useColumn(job.status);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(false), 1000);
  }, []);

  return (
    <Container color={column.color}>
      <AnimatedBloc show={show} color={column.color}>
        <Text show={show} color="white">
          <Trans i18nKey={job.status} />
        </Text>
      </AnimatedBloc>
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
      <Status color={column.color}>
        <Trans i18nKey={job.status} />
      </Status>
    </Container>
  );
}
