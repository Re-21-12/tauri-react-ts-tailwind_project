import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useSnippetStore } from "../store/snippetsStore";
import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";

function SnippetEditor() {
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  const [text, setText] = useState<string | undefined>("");
  useEffect(() => {
    const saveText = setTimeout(async () => {
      const desktopPath = await desktopDir();
      //operador de fusión nula o de coalescencia nula (null coalescing operator en inglés). Este operador se utiliza para proporcionar un valor de respaldo o predeterminado en caso de que una expresión o variable sea nula o indefinida.
      writeTextFile(`${desktopPath}/tauriFiles/${selectedSnippet?.name}`,text ?? "");
    }, 1000);
    return () => {
      clearTimeout(saveText);
    };
  }, []);
  return (
    <>
      {selectedSnippet ? (
        <Editor
          theme="vs-dark"
          defaultLanguage="javascript"
          onChange={(value) => setText(value)}
          value={selectedSnippet.code ?? ""}
        />
      ) : (
        <h1>No se ha seleccionado un archivo!</h1>
      )}
    </>
  );
}

export default SnippetEditor;
