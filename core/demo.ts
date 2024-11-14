import {ContextItem, ContextItemId, ContinueConfig, IContextProvider, RangeInFile} from "./index";
import {contextProviderClassFromName} from "./context/providers";
import {IBaseEmbeddingsProvider} from "./indexing/embeddings/BaseEmbeddingsProvider";
import {allEmbeddingsProviders} from "./indexing/embeddings";
import {fetchwithRequestOptions} from "./util/fetchWithOptions";
import {uuidv4} from "uuid";

const name: string = "codebase";
const cls = contextProviderClassFromName(name) as any;
const codebaseProvider: IContextProvider = new cls({});
const embeddingProvider: IBaseEmbeddingsProvider = new allEmbeddingsProviders["transformers.js"]();

const config: ContinueConfig = {
    contextProviders: [codebaseProvider],
    models: [],
    embeddingsProvider: embeddingProvider
};

const query: string = "";
const fullInput: string = "I would like information about the project structure.";
const selectedCode: RangeInFile[] = [{
    filepath: "example.ts",
    range: {
        start: {line: 0, character: 0},
        end: {line: 100, character: 0},
    }}]

const provider: IContextProvider|undefined = config.contextProviders?.find(
    (provider) => provider.description.title === name,
);

// TODO: implement llm and ide client
const llm = undefined;
const ide = undefined;

if (provider) {
    const items: ContextItem[] = await provider.getContextItems(query, {
        config,
        llm,
        embeddingsProvider: config.embeddingsProvider,
        fullInput,
        ide,
        selectedCode,
        reranker: config.reranker,
        fetch: (url, init) =>
            fetchwithRequestOptions(url, init, config.requestOptions),
    });

    const id: ContextItemId = {
        providerTitle: provider.description.title,
        itemId: uuidv4(),
    };
    const itemsWithId = items.map((item) => ({
        ...item,
        id,
    }));
    console.log(`检索结果：${itemsWithId}`);
}

