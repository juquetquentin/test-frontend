import { useState } from "react";
import { Status, useJobsQuery } from "../../generated/graphql";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { Card } from "./Card";
import { Column } from "./Column";

import styles from "./styles.module.css";

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const LanguagePicker = styled.div<{ selected: boolean }>`
  padding: 0.25rem;
  margin: 0.5rem;
  cursor: pointer;
  border: ${({ selected }) =>
    selected
      ? "solid 2px  rgba(30, 30, 120, 1)"
      : "solid 2px rgba(33, 33, 33, 0.5)"};
`;

export function Index() {
  const { data, loading } = useJobsQuery({ pollInterval: 1000 });
  const [language, setLanguage] = useState("en");
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  if (!data && loading) {
    return <div>…</div>;
  }

  if (!data) {
    return <div>Something went wrong :(</div>;
  }

  return (
    <div className={styles.container}>
      <RowContainer>
        <LanguagePicker
          selected={language === "fr"}
          onClick={() => changeLanguage("fr")}
        >
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/2560px-Flag_of_France.svg.png"
            }
            alt="french flag"
            width="48"
            height="32"
          />
        </LanguagePicker>
        <LanguagePicker
          selected={language === "es"}
          onClick={() => changeLanguage("es")}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/2560px-Flag_of_Spain.svg.png"
            alt="spanish flag"
            width="48"
            height="32"
          />
        </LanguagePicker>
        <LanguagePicker
          selected={language === "en"}
          onClick={() => changeLanguage("en")}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_the_United_Kingdom_%282-3%29.svg/1200px-Flag_of_the_United_Kingdom_%282-3%29.svg.png"
            alt="english flag"
            width="48"
            height="32"
          />
        </LanguagePicker>
      </RowContainer>
      <div className={styles.rowContainer}>
        <Column name={Status.ToDo}>
          {data.jobs
            .filter((it) => it.status === Status.ToDo)
            .map((it) => (
              <Card job={it} key={`card-${it.id}`} />
            ))}
        </Column>
        <Column name={Status.InProgress}>
          {data.jobs
            .filter((it) => it.status === Status.InProgress)
            .map((it) => (
              <Card job={it} key={`card-${it.id}`} />
            ))}
        </Column>
        <Column name={Status.Done}>
          {data.jobs
            .filter((it) => it.status === Status.Done)
            .map((it) => (
              <Card job={it} key={`card-${it.id}`} />
            ))}
        </Column>
      </div>
    </div>
  );
}
