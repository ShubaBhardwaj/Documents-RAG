import { vectorStore } from "../utils/vector.store";
import { FINAL_SYSTEM_PROMPT } from "../utils/system.prompt";

export const llmQueryService = async (query: string) => {
  const embeddings = await vectorStore();
  const vectorRetriver = embeddings.asRetriever({ k: 5 });
  const releventChunks = await vectorRetriver.invoke(query);
  const finalPrompt = releventChunks
    .map((e) =>
      JSON.stringify({
        bookName: e.metadata.source,
        pageContent: e.pageContent,
        pageNumber: e.metadata.loc.pageNumber,
      }),
    )
    .join("\n\n");

  const responnse = FINAL_SYSTEM_PROMPT(finalPrompt);
  console.log(responnse);
  return responnse;
};
