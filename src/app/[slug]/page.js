import axios from "axios";
import BlockLoader from "../{inc}/blockloader";

export default async function Page({ params }) {
  const { slug } = params;
  const response = await axios.get(
    `http://wp-react.bato-webdesign.net/wp-json/wp/v2/pages?slug=${slug}`
  );

  const blocks = response.data[0].acf.blocks;

  return <BlockLoader blocks={blocks} />;
}
