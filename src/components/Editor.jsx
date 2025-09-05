import { useContext, useEffect, useRef } from "react";

import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import { sql } from "@codemirror/lang-sql";

import { ThemeContext } from "@/contexts";

const Editor = ({ initialDoc, onChange }) => {
  const { theme } = useContext(ThemeContext);

  const editorRef = useRef();

  useEffect(() => {
    const startState = EditorState.create({
      doc: initialDoc,
      extensions: [
        basicSetup,
        keymap.of([defaultKeymap, indentWithTab]),
        theme === "dark" ? oneDark : EditorView.baseTheme(),
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
  }, [initialDoc, onChange, theme]);

  return <div className="h-full w-full" ref={editorRef}></div>;
};

export default Editor;
