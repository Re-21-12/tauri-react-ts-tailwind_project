import React, { useEffect } from "react";
import { readDir } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { useSnippetStore } from "../store/snippetsStore";
import SnippetItem from "./SnippetItem";

function SnippetList() {
  //extrae la funcion, usa un parametro y del parametro accede a -> addSnippetName

  const setSnippetsNames = useSnippetStore((state) => state.setSnippetsNames);
  const snippetsNames = useSnippetStore((state) => state.snippetsNames);
  useEffect(() => {
    async function loadFiles() {
      const desktopPath = await desktopDir();
      //leer los archivos en la carpeta
      const result = await readDir(`${desktopPath}/tauriFiles`);
      //con el simbolo ! le decimos que aseguramos que todo lo que va a devlolver sera loo mismo
      const fileNames = result.map((result) => result.name!);
      setSnippetsNames(fileNames);
    }
    loadFiles();
  }, []);

  return (
    <div >
      {snippetsNames.map((snippetName) => (
        <div key={snippetName}>
          {/**llamamos a un componente lo renderizamos en su propiedad snippetName y le pasamos un key */}
          <SnippetItem snippetName={snippetName} key={snippetName} />
        </div>
      ))}
    </div>
  );
}

export default SnippetList;
