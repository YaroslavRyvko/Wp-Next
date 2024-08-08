import axios from "axios";
import BlockLoader from "../../{inc}/insightsblockloader";
import RelevantPosts from "../../{partials}/relevant-posts";
import styles from "./page.module.scss";

async function fetchPageData(slug) {
  try {
    const response = await axios.get(
      `http://wp-react.bato-webdesign.net/wp-json/wp/v2/insights?slug=${slug}&_embed`
    );

    const pageData = response.data[0];
    if (!pageData) {
      return null;
    }

    const featuredMedia = pageData._embedded["wp:featuredmedia"]
      ? pageData._embedded["wp:featuredmedia"][0]
      : null;
    const categories = pageData._embedded["wp:term"]
      ? pageData._embedded["wp:term"][0]
      : [];

    return {
      post: pageData,
      blocks: pageData.acf.blocks || [],
      categories,
      featuredMedia,
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}

export default async function Page({ params }) {
  const { slug } = params;
  const pageData = await fetchPageData(slug);

  if (!pageData) {
    return <div>Page not found</div>;
  }

  const { post, blocks, categories, featuredMedia } = pageData;
  const date = new Date(post.date);
  const options = { month: "long", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  const recentPostCategoryID = post["insights-category"]?.[0];

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((category) => category.id === categoryId);
    return category ? category.name : null;
  };

  return (
    <>
      <article className={styles.article}>
        <div className="site-container-small">
          <div className={styles.article__wrapper}>
            <div className={styles.article__cats}>
              <span>#{formattedDate.replace(/\s/g, "")}</span>
              <span key={recentPostCategoryID}>
                #{getCategoryNameById(recentPostCategoryID)}
              </span>
            </div>

            <h1 className={styles.article__title}>{post.title.rendered}</h1>

            {featuredMedia && (
              <div className={styles.article__image}>
                <img
                  src={featuredMedia.source_url}
                  alt={featuredMedia.alt_text || "Featured image"}
                />
              </div>
            )}

            <div className={styles.article__content}>
              <BlockLoader blocks={blocks || []} />
            </div>
          </div>
        </div>
      </article>
      <RelevantPosts fields={post} />
    </>
  );
}
