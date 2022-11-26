import type { NextPage } from "next";
// react
import { useState, useEffect } from "react";
// antd
import { Button, Tabs } from "antd";
import * as ANTD_ICONS from "@ant-design/icons";
//
import styles from "./index.module.scss";
import { useTagService } from "../hooks";
import { useUserService } from "features/user";
import { Tag } from "../types";

const { TabPane } = Tabs;

enum TAB {
  FOLLOW = "FOLLOW",
  ALL = "ALL",
}

const TagListContainer: NextPage = () => {
  const [currentTab, setCurrentTag] = useState<TAB>(TAB.FOLLOW);
  const { getTags, allTags, followTags } = useTagService();
  const { user } = useUserService();

  useEffect(() => {
    getTags();
  }, [getTags]);

  const handleUnfollow = (tag: Tag) => {};

  const handleFollow = (tag: Tag) => {};

  return (
    <div className={styles.content_layout}>
      <Tabs
        defaultActiveKey={currentTab}
        onChange={(tab) => {
          if (tab === TAB.ALL) {
            setCurrentTag(TAB.ALL);
          } else {
            setCurrentTag(TAB.FOLLOW);
          }
        }}
      >
        <TabPane tab="Following" key={TAB.FOLLOW} className={styles.tags}>
          {currentTab === TAB.FOLLOW &&
            followTags.map((tag, index) => (
              <div key={index} className={styles.tagWrapper}>
                <div>{((ANTD_ICONS as any)[tag.icon] as any).render()}</div>
                <div className={styles.title}>{tag.title}</div>
                <div>{tag.follow_count} follows</div>
                <div>{tag.article_count} articles</div>
                {tag.users.find(
                  (user) => Number(user.id) === Number(user.id)
                ) ? (
                  <Button type={"primary"} onClick={() => handleUnfollow(tag)}>
                    Followed
                  </Button>
                ) : (
                  <Button onClick={() => handleFollow(tag)}>Follow</Button>
                )}
              </div>
            ))}
        </TabPane>
        <TabPane tab="Hashtags" key={TAB.ALL} className={styles.tags}>
          {currentTab === TAB.ALL &&
            allTags.map((tag, index) => (
              <div key={index} className={styles.tagWrapper}>
                <div>{((ANTD_ICONS as any)[tag.icon] as any).render()}</div>
                <div className={styles.title}>{tag.title}</div>
                <div>{tag.follow_count} follows</div>
                <div>{tag.article_count} articles</div>
                {tag.users.find(
                  (user) => Number(user.id) === Number(user.id)
                ) ? (
                  <Button type={"primary"} onClick={() => handleUnfollow(tag)}>
                    Followed
                  </Button>
                ) : (
                  <Button onClick={() => handleFollow(tag)}>Follow</Button>
                )}
              </div>
            ))}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TagListContainer;
