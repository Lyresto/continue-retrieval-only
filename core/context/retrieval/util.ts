import {Chunk} from "../../index.js";
import { deduplicateArray } from "../../util";

export function deduplicateChunks(chunks: Chunk[]): Chunk[] {
  return deduplicateArray(chunks, (a, b) => {
    return (
      a.filepath === b.filepath &&
      a.startLine === b.startLine &&
      a.endLine === b.endLine
    );
  });
}