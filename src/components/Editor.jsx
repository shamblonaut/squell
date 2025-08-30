import { useEffect, useRef } from "react";

import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import { sql } from "@codemirror/lang-sql";

const Editor = ({ initialDoc, onChange }) => {
  const editorRef = useRef();

  useEffect(() => {
    const startState = EditorState.create({
      doc: initialDoc,
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab]),
        oneDark,
        sql(),
        EditorView.updateListener.of((update) => {
          if (!update.changes || !onChange) return;

          onChange(update.state.doc.toString());
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    return () => {
      view.destroy();
    };
  }, [initialDoc, onChange]);

  return (
    <div
      className="h-full min-h-[42vh] w-[90vw] max-w-full md:min-h-[76vh] md:w-[42vw]"
      ref={editorRef}
    ></div>
  );
};

export default Editor;
