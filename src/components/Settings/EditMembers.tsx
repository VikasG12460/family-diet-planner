import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Pencil, Trash2, ArrowLeft, Check, X } from 'lucide-react';
import type { FamilyProfile, FamilyMember } from '../../types/index';
import { MemberForm } from './MemberForm';

interface EditMembersProps {
  profile: FamilyProfile;
  onSave: (profile: FamilyProfile) => void;
  onCancel: () => void;
}

export function EditMembers({ profile, onSave, onCancel }: EditMembersProps) {
  const [members, setMembers] = useState<FamilyMember[]>(profile.members);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddMember = () => {
    setEditingMember(null);
    setIsFormOpen(true);
  };

  const handleEditMember = (member: FamilyMember) => {
    setEditingMember(member);
    setIsFormOpen(true);
  };

  const handleDeleteMember = (memberId: string) => {
    if (confirm('Are you sure you want to remove this member?')) {
      const updatedMembers = members.filter(m => m.id !== memberId);
      setMembers(updatedMembers);
    }
  };

  const handleSaveMember = (memberData: Omit<FamilyMember, 'id'>) => {
    if (editingMember) {
      // Update existing
      const updatedMembers = members.map(m => 
        m.id === editingMember.id ? { ...memberData, id: editingMember.id } : m
      );
      setMembers(updatedMembers);
    } else {
      // Add new
      const newMember: FamilyMember = {
        ...memberData,
        id: `member-${Date.now()}`
      };
      setMembers([...members, newMember]);
    }
    setIsFormOpen(false);
  };

  const handleSaveAll = () => {
    if (members.length === 0) {
      alert('You must have at least one family member.');
      return;
    }
    onSave({
      ...profile,
      members
    });
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Manage Family</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Family Members ({members.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {members.map(member => {
            const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
            return (
              <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-emerald-100 text-emerald-700">
                    <AvatarFallback className="font-semibold text-sm">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">
                      {member.age} yrs • {member.weight}kg • {member.goal}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditMember(member)}>
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteMember(member.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            );
          })}
          
          <Button 
            variant="outline" 
            className="w-full border-dashed border-2 py-6 text-gray-500 hover:text-emerald-600 hover:border-emerald-400"
            onClick={handleAddMember}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Family Member
          </Button>
        </CardContent>
      </Card>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
        <Button className="flex-1" onClick={handleSaveAll}>Save Changes</Button>
      </div>

      {/* Custom Modal for Member Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
              <h2 className="text-lg font-semibold">
                {editingMember ? 'Edit Member' : 'Add New Member'}
              </h2>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <MemberForm 
                member={editingMember} 
                onSave={handleSaveMember} 
                onCancel={() => setIsFormOpen(false)} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}