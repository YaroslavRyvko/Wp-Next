'use client'

import { useEffect, useState } from "react";
import InsightItem from "./insight-item";
import styles from "./relevant-posts.module.scss";

const RelevantPosts = ({ fields }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://wp-react.bato-webdesign.net/wp-json/wp/v2/insights?per_page=3&exclude=${fields.id}&status=publish`
        );
        if (!response.ok) {
          console.error("Failed to fetch posts");
          return;
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [fields.id]);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={styles.relevantPosts}>
      <div className="site-container">
        <div className={styles.relevantPosts__wrapper}>
          <h2 className={`${styles.relevantPosts__title} title-2`}>
            Most relevant
          </h2>
          <div className={styles.relevantPosts__list}>
            {posts.map((post) => (
              <InsightItem key={post.id} insight={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelevantPosts;
