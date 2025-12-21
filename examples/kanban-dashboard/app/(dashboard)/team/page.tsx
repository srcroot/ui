"use client"

import { useState } from "react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { FiMoreHorizontal, FiSearch, FiUserPlus } from "react-icons/fi"

const initialMembers = [
    {
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        role: "Admin",
        status: "Active",
        avatar: "https://placehold.co/400x400/orange/white?text=OM",
        initials: "OM"
    },
    {
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        role: "Member",
        status: "Active",
        avatar: "https://placehold.co/400x400/orange/white?text=JL",
        initials: "JL"
    },
    {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        role: "Viewer",
        status: "Away",
        avatar: "https://placehold.co/400x400/orange/white?text=IN",
        initials: "IN"
    },
    {
        name: "William Kim",
        email: "will@email.com",
        role: "Member",
        status: "Active",
        avatar: "https://placehold.co/400x400/orange/white?text=WK",
        initials: "WK"
    },
    {
        name: "Sofia Davis",
        email: "sofia.davis@email.com",
        role: "Viewer",
        status: "Inactive",
        avatar: "https://placehold.co/400x400/orange/white?text=SD",
        initials: "SD"
    },
]

export default function TeamPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [members, setMembers] = useState(initialMembers)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [newMemberName, setNewMemberName] = useState("")

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleAddMember = () => {
        if (!newMemberName) return

        const newMember = {
            name: newMemberName,
            email: `${newMemberName.toLowerCase().replace(/\s/g, '.')}@email.com`,
            role: "Member",
            status: "Active",
            avatar: "",
            initials: newMemberName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        }

        setMembers([...members, newMember])
        setNewMemberName("")
        setIsDialogOpen(false)
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
                    <p className="text-muted-foreground">Manage your team and permissions.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <FiUserPlus className="mr-2 h-4 w-4" /> Add Member
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Member</DialogTitle>
                            <DialogDescription>
                                Invite a new user to your team.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newMemberName}
                                    onChange={(e) => setNewMemberName(e.target.value)}
                                    placeholder="Pedro Duarte"
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddMember}>Add Member</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Members</CardTitle>
                        <div className="relative w-64">
                            <FiSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search members..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredMembers.map((member) => (
                                <TableRow key={member.email}>
                                    <TableCell className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={member.avatar} />
                                            <AvatarFallback>{member.initials}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-medium leading-none">{member.name}</span>
                                            <span className="text-xs text-muted-foreground">{member.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{member.role}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className={`h-2 w-2 rounded-full ${member.status === 'Active' ? 'bg-green-500' : member.status === 'Away' ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                                            <span className="text-sm text-muted-foreground">{member.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <FiMoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredMembers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        No members found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
