import styles from "./repocard.module.css";
import { IRepo } from "../../@types/repo";
import { FC } from "react";
import { truncate } from "../../utils/truncate";

import { BsBook } from "react-icons/bs";
import { FaCodeBranch, FaDownload, FaStar } from "react-icons/fa";
import { TbPageBreak } from "react-icons/tb";
import { VscCommentDiscussion, VscIssues, VscProject } from "react-icons/vsc";

interface RepoCardProps {
  content: IRepo
  handler: (r: IRepo) => void
};

export const RepoCard: FC<RepoCardProps> = ({content, handler}) => {
  return (
    <div className={styles.repo} onClick={() => handler(content)}>
      <header className={styles.header}>
        <h1 className={styles.name}>{content.name}</h1>
        <h2 className={styles.fullname}>{content.full_name}</h2>
      </header>
      <section className={styles.content}>
        <p className={styles.description}>
          {truncate(content.description, 72)}
        </p>
        <div className={styles.data}>
          <img className={styles.avatar} 
            src={content.owner.avatar_url}
            alt={`Avatar for ${content.full_name}`} 
          />
          <ul className={styles.stats}>
            <li className={styles.item}></li>
            <li className={styles.item}>
              <p>{content.forks_count}</p>
              <FaCodeBranch />
            </li>
            <div className={styles.booleans}>
            <li className={styles.item}>
                <TbPageBreak className={styles[`item-${content.has_pages}`]} />
              </li>
              <li className={styles.item}>
                <VscIssues className={styles[`item-${content.has_issues}`]} />
              </li>
              <li className={styles.item}>
                <VscCommentDiscussion
                  className={styles[`item-${content.has_discussions}`]}
                />
              </li>
              <li className={styles.item}>
                <BsBook className={styles[`item-${content.has_wiki}`]} />
              </li>
              <li className={styles.item}>
                <FaDownload className={styles[`item-${content.has_downloads}`]} />
              </li>
              <li className={styles.item}>
                <VscProject className={styles[`item-${content.has_projects}`]} />
              </li>
            </div>
            <div className={styles.topics}>
              {content.topics.map(topic => (
                <li key={topic} className={styles.topic}>
                  <p>{topic}</p>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </section>
    </div>
  )
};