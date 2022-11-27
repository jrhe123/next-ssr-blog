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

enum FollowType {
  FOLLOW = "FOLLOW",
  UN_FOLLOW = "UN_FOLLOW",
}

const TagListContainer: NextPage = () => {
  const [currentTab, setCurrentTag] = useState<TAB>(TAB.FOLLOW);
  const { getTags, toggleFollowTag, allTags, followTags } = useTagService();
  const { user } = useUserService();

  useEffect(() => {
    getTags();
  }, [getTags]);

  const handleUnfollow = (tag: Tag) => {
    toggleFollowTag({
      type: FollowType.UN_FOLLOW,
      tagId: tag.id,
    });
  };

  const handleFollow = (tag: Tag) => {
    toggleFollowTag({
      type: FollowType.FOLLOW,
      tagId: tag.id,
    });
  };

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
                <br />
                <div>{tag.follow_count} follows</div>
                <div>{tag.article_count} articles</div>
                <br />
                {tag.users.find(
                  (u) => Number(u.id) === Number(user?.userId)
                ) ? (
                  <Button type={"primary"} onClick={() => handleUnfollow(tag)}>
                    Unfollow
                  </Button>
                ) : (
                  <Button onClick={() => handleFollow(tag)}>Follow</Button>
                )}
              </div>
            ))}
        </TabPane>
        <TabPane tab="Hashtags" key={TAB.ALL} className={styles.tags}>
          {currentTab === TAB.ALL &&
            allTags?.map((tag, index) => (
              <div key={index} className={styles.tagWrapper}>
                <div>{((ANTD_ICONS as any)[tag.icon] as any).render()}</div>
                <div className={styles.title}>{tag.title}</div>
                <br />
                <div>{tag.follow_count} follows</div>
                <div>{tag.article_count} articles</div>
                <br />
                {tag.users.find(
                  (u) => Number(u.id) === Number(user?.userId)
                ) ? (
                  <Button type={"primary"} onClick={() => handleUnfollow(tag)}>
                    Unfollow
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
