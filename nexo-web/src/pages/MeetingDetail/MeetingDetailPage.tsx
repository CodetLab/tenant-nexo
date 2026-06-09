import { useParams } from "react-router-dom";

export default function MeetingDetailPage() {
  const { id } = useParams();

  return <h1>Meeting {id}</h1>;
}
