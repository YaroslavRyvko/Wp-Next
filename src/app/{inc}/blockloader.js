import * as BlockComponents from "../{blocks}"; 

const BlockLoader = ({ blocks }) => {
  return (
    <>
      {blocks.map((block, index) => {
        const BlockComponent = BlockComponents[block.acf_fc_layout];

        if (!BlockComponent) {
          console.warn(
            `No component found for block type: ${block.acf_fc_layout}`
          );
          return null; 
        }

        return <BlockComponent key={index} fields={block} />;
      })}
    </>
  );
};

export default BlockLoader;
