import {
  ToCoreFromWebviewProtocol,
  ToWebviewFromCoreProtocol,
} from "./coreWebview.js";
import { ToWebviewOrCoreFromIdeProtocol } from "./ide.js";
import { ToCoreFromIdeProtocol, ToIdeFromCoreProtocol } from "./ideCore.js";

export type IProtocol = Record<string, [any, any]>;

// Core
export type ToCoreProtocol = ToCoreFromIdeProtocol &
  ToCoreFromWebviewProtocol &
  ToWebviewOrCoreFromIdeProtocol;
export type FromCoreProtocol = ToWebviewFromCoreProtocol &
  ToIdeFromCoreProtocol;
