import { useEffect, useState } from "preact/hooks";
import LoadingSpinner from "./LoadingSpinner";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1pMPA8hdCaXvvy9hJyAp1zEi7y7_QVZMYZy1CEPsAilc";
const SHEET_EXPORT_URL = `${SHEET_URL}/export?format=csv&gid=0`;

async function fetchFromSheets() {
  const response = await fetch(SHEET_EXPORT_URL);
  const csv = await response.text();
  return csv.split("\n").flatMap((row) =>
    row
      .split(",")
      .map((cell) => cell.trim())
      .filter((cell) => cell && !/ /.test(cell))
      .map((cell) => {
        const match = cell.match(
          /kickstarter\.com\/projects\/([^/ ]+)\/([^/?# ]+)/
        );
        return match && match.length === 3 ? `${match[1]}/${match[2]}` : null;
      })
      .filter((link) => link !== null)
  );
}

function shuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default function ProjectList() {
  const [slugs, setSlugs] = useState<string[] | null>(null);

  useEffect(() => {
    fetchFromSheets().then((data) => setSlugs(data));
  }, []);

  if (slugs === null) return <LoadingSpinner />;

  shuffle(slugs);

  return (
    <>
      {slugs.map((slug) => (
        <li class="m-1" key={slug}>
          <iframe
            class="sm:w-[248px] sm:h-[397px] w-[170px] h-[360px]"
            src={`https://www.kickstarter.com/projects/${slug}/widget/card.html?v=2`}
            scrolling="no"
          ></iframe>
        </li>
      ))}
    </>
  );
}
