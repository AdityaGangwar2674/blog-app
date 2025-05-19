import Header from "../components/Header";
import Editor from "../components/Editor";
import { useParams } from "react-router-dom";

export default function EditorPage() {
  const { id } = useParams();
  return (
    <>
      <Header />
      <Editor blogid={id} />
    </>
  );
}
