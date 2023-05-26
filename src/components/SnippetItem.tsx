import React from "react";
import { useSnippetStore } from "../store/snippetsStore";
import { twMerge } from "tailwind-merge";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { desktopDir, join } from "@tauri-apps/api/path";
import {toast} from "react-hot-toast"

interface Props {
  snippetName: string;
}
function SnippetItem({ snippetName }: Props) {
  const setSelectedSnippet = useSnippetStore(
    (state) => state.setSelectedSnippet
  );
  const selectedSnippet = useSnippetStore((state) => state.selectedSnippet);
  const removeSnippetName = useSnippetStore((state)=> state.removeSnippetName)
  const handleDelete = async (snippetName: string) => {
    const desktopPath = await desktopDir();
    const filePath = await join(desktopPath, "tauriFiles", `${snippetName}`);
    await removeFile(filePath)
    removeSnippetName(snippetName)
    toast.success('snippet eliminado',{
      duration:2000,
      position: "bottom-right",
      style:{
        background: "#202020",
        color: "#fff"
      }
    })
  };
  return (
    <div
      className={twMerge(
        "py-2 px-4 bg-neutral-950 hover:cursor-pointer flex justify-between",
        //realiza una busqueda segura si es nula retorna nulo si no hay
        selectedSnippet?.name === snippetName ? "bg-slate-700" : ""
      )}
      onClick={async () => {
        const desktopPath = await desktopDir();
        const filePath = await join(
          desktopPath,
          "tauriFiles",
          `${snippetName}`
        );
        const snippet = await readTextFile(filePath);
        setSelectedSnippet({ name: snippetName, code: snippet });
      }}
    >
      <h1>{snippetName}</h1>
      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(snippetName)

          }}
        >
          Eliminar
        </button>
        <button
        onClick={(e)=>{
          e.stopPropagation() 
          setSelectedSnippet(null)
        }}>Cancelar</button>
      </div>
    </div>
  );
}

export default SnippetItem;
