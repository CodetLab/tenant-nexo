import { useParams } from "react-router-dom";

export default function StudentDetailPage() {
  const { id } = useParams();

  return <h1>Student {id}</h1>;
}
