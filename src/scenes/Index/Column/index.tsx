import type { ReactNode } from "react";

import styles from "./styles.module.css";
import { getStatusColor } from "../../../theme";
import styled from "styled-components";

type Props = { children?: ReactNode; name: string };

const Title = styled.span`
  color: ${({ color }) => color};
`;

export function Column({ children, name }: Props) {
  return (
    <div className={styles.container}>
      <Title className={styles.title} color={getStatusColor(name)}>
        {name}
      </Title>
      {children}
    </div>
  );
}
