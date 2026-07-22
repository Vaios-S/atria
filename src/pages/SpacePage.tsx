import { useParams } from "react-router-dom";
import { spaces } from "../data/spaces";

export default function SpacePage() {
  const { id } = useParams();

  const space = spaces.find((space) => space.id === Number(id));

  if (!space) {
    return <h1>Space not found</h1>;
  }

  return (
    <main>
      <p>{space.icon}</p>
      <h1>{space.title}</h1>
    </main>
  );
}
