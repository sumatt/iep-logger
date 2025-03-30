"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ExternalLink } from "lucide-react"

// Mock student data
const studentData = {
  id: 1,
  firstName: "John",
  lastName: "B",
  domains: {
    speech: {
      active: true,
      objectives: [
        {
          id: 1,
          description: "Produce /s/ sounds in final position of words",
          logs: [
            {
              date: "March 28, 2025",
              notes: "Worked on final /s/ sounds in 10 target words",
              score: "8/10",
              promptLevel: "Minimal",
              summary: "Good progress, consistent with final /s/ in familiar words",
            },
            {
              date: "March 21, 2025",
              notes: "Practiced final /s/ sounds in 8 target words",
              score: "6/8",
              promptLevel: "Moderate",
              summary: "Showing improvement from previous session",
            },
          ],
        },
        {
          id: 2,
          description: "Produce /s/ blends in initial position of words",
          logs: [
            {
              date: "March 28, 2025",
              notes: "Practiced /sp/ and /st/ blends with picture cards",
              score: "7/10",
              promptLevel: "Moderate",
              summary: "Struggles with /sp/ blends, /st/ blends are improving",
            },
          ],
        },
      ],
    },
    language: {
      active: false,
      objectives: [],
    },
    pragmatics: {
      active: false,
      objectives: [],
    },
    behavior: {
      active: false,
      objectives: [],
    },
  },
}

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("speech")

  // In a real app, you would fetch the student data based on the ID
  const student = studentData

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {student.firstName} {student.lastName}.'s Log
        </h1>
        <Button variant="outline">
          <ExternalLink className="mr-2 h-4 w-4" /> Export to TalkTrac
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="speech">Speech</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
          <TabsTrigger value="pragmatics">Pragmatics</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
        </TabsList>

        <TabsContent value="speech" className="pt-4">
          {student.domains.speech.active ? (
            <div className="space-y-6">
              {student.domains.speech.objectives.map((objective) => (
                <Card key={objective.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{objective.description}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Prompt Level</TableHead>
                          <TableHead>Summary</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {objective.logs.map((log, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{log.date}</TableCell>
                            <TableCell>{log.notes}</TableCell>
                            <TableCell>{log.score}</TableCell>
                            <TableCell>{log.promptLevel}</TableCell>
                            <TableCell>{log.summary}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No speech objectives set for this student.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="language" className="pt-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No language objectives set for this student.</p>
          </div>
        </TabsContent>

        <TabsContent value="pragmatics" className="pt-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No pragmatics objectives set for this student.</p>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="pt-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No behavior objectives set for this student.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

