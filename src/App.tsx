import React from "react";
import SnippetForm from "./components/SnippetForm";
import SnippetList from "./components/SnippetList";
import SnippetEditor from "./components/SnippetEditor";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="h-screen bg-neutral-950  text-white grid grid-cols-12">
      <div className="col-span-3 bg-zinc-900">
        <SnippetForm />
        <SnippetList />
      </div>
      <div className="col-span-9 bg-emerald-950 flex justify-center items-center">
        <SnippetEditor />
      </div>
      {/**notificacion */}
      <Toaster/>
    </div>
  );
}

export default App;
