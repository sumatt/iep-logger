"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, User, ChevronRight } from "lucide-react"

// Mock student data
const initialStudents = [
  {
    id: 1,
    firstName: "John",
    lastName: "B",
    domains: {
      speech: { active: true, objectives: 2 },
      language: { active: false, objectives: 0 },
      pragmatics: { active: false, objectives: 0 },
      behavior: { active: false, objectives: 0 },
    },
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "L",
    domains: {
      speech: { active: true, objectives: 1 },
      language: { active: true, objectives: 2 },
      pragmatics: { active: false, objectives: 0 },
      behavior: { active: false, objectives: 0 },
    },
  },
  {
    id: 3,
    firstName: "Emma",
    lastName: "T",
    domains: {
      speech: { active: false, objectives: 0 },
      language: { active: true, objectives: 3 },
      pragmatics: { active: true, objectives: 1 },
      behavior: { active: false, objectives: 0 },
    },
  },
  {
    id: 4,
    firstName: "Michael",
    lastName: "R",
    domains: {
      speech: { active: false, objectives: 0 },
      language: { active: false, objectives: 0 },
      pragmatics: { active: true, objectives: 2 },
      behavior: { active: true, objectives: 1 },
    },
  },
]

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    domains: {
      speech: { active: false, objectives: 0 },
      language: { active: false, objectives: 0 },
      pragmatics: { active: false, objectives: 0 },
      behavior: { active: false, objectives: 0 },
    },
  })

  const handleDomainChange = (domain: string, checked: boolean) => {
    setNewStudent((prev) => ({
      ...prev,
      domains: {
        ...prev.domains,
        [domain]: {
          ...prev.domains[domain as keyof typeof prev.domains],
          active: checked,
          objectives: checked ? 1 : 0,
        },
      },
    }))
  }

  const handleAddStudent = () => {
    if (newStudent.firstName && newStudent.lastName) {
      setStudents((prev) => [
        ...prev,
        {
          id: Math.max(...prev.map((s) => s.id)) + 1,
          ...newStudent,
        },
      ])
      setNewStudent({
        firstName: "",
        lastName: "",
        domains: {
          speech: { active: false, objectives: 0 },
          language: { active: false, objectives: 0 },
          pragmatics: { active: false, objectives: 0 },
          behavior: { active: false, objectives: 0 },
        },
      })
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Students</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Student
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>Enter student details and select domains to track.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={newStudent.firstName}
                    onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Initial</Label>
                  <Input
                    id="lastName"
                    maxLength={1}
                    value={newStudent.lastName}
                    onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value.toUpperCase() })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Domains</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="speech"
                      checked={newStudent.domains.speech.active}
                      onCheckedChange={(checked) => handleDomainChange("speech", checked as boolean)}
                    />
                    <Label htmlFor="speech">Speech</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="language"
                      checked={newStudent.domains.language.active}
                      onCheckedChange={(checked) => handleDomainChange("language", checked as boolean)}
                    />
                    <Label htmlFor="language">Language</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pragmatics"
                      checked={newStudent.domains.pragmatics.active}
                      onCheckedChange={(checked) => handleDomainChange("pragmatics", checked as boolean)}
                    />
                    <Label htmlFor="pragmatics">Pragmatics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="behavior"
                      checked={newStudent.domains.behavior.active}
                      onCheckedChange={(checked) => handleDomainChange("behavior", checked as boolean)}
                    />
                    <Label htmlFor="behavior">Behavior</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddStudent} disabled={!newStudent.firstName || !newStudent.lastName}>
                Add Student
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {students.map((student) => (
          <Link key={student.id} href={`/students/${student.id}`}>
            <Card className="hover:bg-muted/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-center">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-muted-foreground" />
                    {student.firstName} {student.lastName}.
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="speech">
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="speech">Speech</TabsTrigger>
                    <TabsTrigger value="language">Language</TabsTrigger>
                    <TabsTrigger value="pragmatics">Pragmatics</TabsTrigger>
                    <TabsTrigger value="behavior">Behavior</TabsTrigger>
                  </TabsList>
                  <TabsContent value="speech" className="pt-2">
                    {student.domains.speech.active ? (
                      <p className="text-sm">{student.domains.speech.objectives} objectives</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">No objectives</p>
                    )}
                  </TabsContent>
                  <TabsContent value="language" className="pt-2">
                    {student.domains.language.active ? (
                      <p className="text-sm">{student.domains.language.objectives} objectives</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">No objectives</p>
                    )}
                  </TabsContent>
                  <TabsContent value="pragmatics" className="pt-2">
                    {student.domains.pragmatics.active ? (
                      <p className="text-sm">{student.domains.pragmatics.objectives} objectives</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">No objectives</p>
                    )}
                  </TabsContent>
                  <TabsContent value="behavior" className="pt-2">
                    {student.domains.behavior.active ? (
                      <p className="text-sm">{student.domains.behavior.objectives} objectives</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">No objectives</p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

