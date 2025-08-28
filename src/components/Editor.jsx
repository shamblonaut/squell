import { useEffect, useRef } from "react";

import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import { sql } from "@codemirror/lang-sql";

const Editor = () => {
  const editorRef = useRef();

  useEffect(() => {
    const startState = EditorState.create({
      doc: "SELECT * FROM users;",
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab]),
        oneDark,
        sql(),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div
      className="w-[80vw] overflow-hidden rounded-sm border border-gray-600"
      ref={editorRef}
    ></div>
  );
};

export default Editor;
