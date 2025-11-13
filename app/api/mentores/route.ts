import { NextResponse } from "next/server";
import { mentorsDirectory } from "@/lib/data/mentors";

const segmentMap: Record<string, string[]> = {
  researcher: ["pesquisadores", "pesquisador"],
  professional: ["profissionais", "profissional"],
  student: ["estudantes", "estudante"],
  company: ["empresas", "empresa"],
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase();
  const segment = searchParams.get("segment")?.toLowerCase();

  const filtered = mentorsDirectory.filter((mentor) => {
    const matchesQuery = query
      ? mentor.name.toLowerCase().includes(query) ||
        mentor.title.toLowerCase().includes(query) ||
        mentor.expertise.some((item) =>
          item.toLowerCase().includes(query.toLowerCase()),
        )
      : true;

    const matchesSegment = segment
      ? (() => {
          const segmentedTargets = segmentMap[segment] ?? [segment];
          return mentor.segmentFocus.some((item) =>
            segmentedTargets.includes(item.toLowerCase()),
          );
        })()
      : true;

    return matchesQuery && matchesSegment;
  });

  return NextResponse.json({ mentors: filtered });
}

