import { create } from "zustand";

interface Snippet {
  name: string;
  code: string | null;
}
// Asignar los tipos de dato con una interfaz
interface SnippetState {
  snippetsNames: string[];
  selectedSnippet: Snippet | null;
  addSnippetName: (name: string) => void;
  setSnippetsNames: (name: string[]) => void;
  setSelectedSnippet: (snippet: Snippet | null) => void;
  removeSnippetName: (snippet: string) => void;
}

// Crear un context provider con zustand y ts
export const useSnippetStore = create<SnippetState>((set) => ({
  snippetsNames: [],
  selectedSnippet: null,
  addSnippetName: (name) =>
    set((state) => ({
      snippetsNames: [...state.snippetsNames, name],
    })),
  setSnippetsNames: (names) => set({ snippetsNames: names }),
  setSelectedSnippet: (snippet) => set({ selectedSnippet: snippet }),
  removeSnippetName: (name) =>
    set((state) => ({
      snippetsNames: state.snippetsNames.filter((n) => n !== name),
    })),
}));
