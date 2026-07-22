import { useParams } from "react-router-dom";
export default function SpacePage() {
  const { id } = useParams();

  return (
    <>
      <h1>Welcome to the Space Page {id}</h1>
    </>
  );
}
