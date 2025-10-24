import { useContext, useEffect, useRef } from "react";

import { basicSetup } from "codemirror";
import { EditorState, Prec } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";
import { sql } from "@codemirror/lang-sql";

import { getComputedTheme } from "@/utils/helpers";

import { ThemeContext } from "@/contexts";

const Editor = ({ initialDoc, onChange, runQuery, saveQuery, loadQuery }) => {
  const { theme } = useContext(ThemeContext);

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
    const view = new EditorView({
      state: EditorState.create({
        doc: initialDoc,
        extensions: [
          basicSetup,
          keymap.of([defaultKeymap, indentWithTab]),
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
          getComputedTheme() === "dark" ? oneDark : EditorView.baseTheme(),
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
