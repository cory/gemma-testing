import "@odla-ai/ui/tokens.css";
import "@odla-ai/ui/primitives.css";
import "@odla-ai/ui/markdown.css";
import "./styles.css";
import { render } from "preact";
import { App } from "./app";

render(<App />, document.getElementById("app")!);
