import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Users, ArrowRight } from "lucide-react"

// Mock data for recent sessions
const recentSessions = [
  {
    id: 1,
    date: "March 28, 2025",
    studentCount: 5,
    summary:
      "Group worked on articulation of /s/ sounds in sentences. John B. showed improvement, Sarah L. needs more practice with blends.",
  },
  {
    id: 2,
    date: "March 26, 2025",
    studentCount: 4,
    summary: "Language group focused on following 2-step directions. Most students showed progress, especially Emma T.",
  },
  {
    id: 3,
    date: "March 24, 2025",
    studentCount: 6,
    summary: "Pragmatics session on turn-taking in conversations. Michael R. and David S. demonstrated good skills.",
  },
]

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 my-8">
        <h1 className="text-3xl font-bold">IEP Voice Logger</h1>
        <p className="text-muted-foreground text-lg">Log student progress quickly and easily.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/new-session">
          <Button className="w-full h-20 text-lg" size="lg">
            <PlusCircle className="mr-2 h-5 w-5" /> Add New Session
          </Button>
        </Link>
        <Link href="/students">
          <Button variant="outline" className="w-full h-20 text-lg" size="lg">
            <Users className="mr-2 h-5 w-5" /> Manage Students
          </Button>
        </Link>
      </div>

      <div className="space-y-2 mt-8">
        <h2 className="text-xl font-semibold">Recent Sessions</h2>
        <div className="grid gap-4">
          {recentSessions.map((session) => (
            <Card key={session.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">{session.date}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{session.studentCount} students</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{session.summary}</p>
              </CardContent>
              <CardFooter className="pt-2 flex justify-end">
                <Button variant="ghost" size="sm" className="text-xs">
                  View Details <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

