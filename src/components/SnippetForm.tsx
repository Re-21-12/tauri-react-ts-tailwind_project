//escribir archivos de texto
import { writeTextFile } from "@tauri-apps/api/fs";
import {desktopDir} from "@tauri-apps/api/path"
import React, { useState } from "react";
import { useSnippetStore } from "../store/snippetsStore";
import {toast} from "react-hot-toast"

function SnippetForm() {
  const [snippetName, setSnippetName] = useState('')
  const addSnippetName = useSnippetStore(state => state.addSnippetName)
  return (
    <form
      onSubmit={async(e) => {
        e.preventDefault();
        const desktopPath = await desktopDir();
        await writeTextFile(`${desktopPath}/tauriFiles/${snippetName}`, `{}`)
        setSnippetName('')
        addSnippetName(snippetName)
        toast.success('snippet guardado',{
          duration:2000,
          position: "bottom-right",
          style:{
            background: "#202020",
            color: "#fff"
          }
        })
      }}
    >
      <input
        type="text"
        placeholder="escribe un snippet..."
        className="w-full bg-zinc-800"
        onChange={(e)=> setSnippetName(e.target.value)}
      />
      <button className="hidden">Save</button>
    </form>
  );
}

export default SnippetForm;
