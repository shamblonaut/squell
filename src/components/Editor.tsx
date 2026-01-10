import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { sql } from "@codemirror/lang-sql";
import { EditorState, Prec } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView, keymap } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { useEffect, useRef } from "react";

import { useTheme } from "@/hooks";
import { getComputedTheme } from "@/utils/helpers";

interface EditorProps {
  initialDoc: string;
  onChange: (updatedCode: string) => void;
  runQuery: (query: string) => void;
  saveQuery: (code: string) => void;
  loadQuery: () => void;
}

const Editor = ({
  initialDoc,
  onChange,
  runQuery,
  saveQuery,
  loadQuery,
}: EditorProps) => {
  const { theme } = useTheme();

  const containerRef = useRef(null);

  const onChangeRef = useRef(onChange);
  const runQueryRef = useRef(runQuery);
  const saveQueryRef = useRef(saveQuery);
  const loadQueryRef = useRef(loadQuery);

  useEffect(() => {
    onChangeRef.current = onChange;
    runQueryRef.current = runQuery;
    saveQueryRef.current = saveQuery;
    loadQueryRef.current = loadQuery;
  }, [initialDoc, onChange, runQuery, saveQuery, loadQuery]);

  useEffect(() => {
    if (!containerRef.current) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: initialDoc,
        extensions: [
          basicSetup,
          keymap.of(defaultKeymap),
          keymap.of([indentWithTab]),
          Prec.high(
            keymap.of([
              {
                key: "Mod-Enter",
                run: (view) => {
                  runQueryRef.current(view.state.doc.toString());
                  return true;
                },
              },
              {
                key: "Mod-s",
                run: (view) => {
                  saveQueryRef.current(view.state.doc.toString());
                  return true;
                },
              },
              {
                key: "Mod-l",
                run: () => {
                  loadQueryRef.current();
                  return true;
                },
              },
            ]),
          ),
          getComputedTheme() === "dark" ? oneDark : EditorView.baseTheme({}),
          sql(),
          EditorView.updateListener.of((update) => {
            if (!update.changes || !onChangeRef.current) return;

            onChangeRef.current(update.state.doc.toString());
          }),
        ],
      }),
      parent: containerRef.current,
    });

    return () => {
      view.destroy();
    };
  }, [initialDoc, theme]);

  return <div className="h-full w-full" ref={containerRef}></div>;
};

export default Editor;
