import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { FamilyMember, HealthCondition } from '../../types/index';

interface MemberFormProps {
  member: FamilyMember | null;
  onSave: (member: Omit<FamilyMember, 'id'>) => void;
  onCancel: () => void;
}

const HEALTH_OPTIONS: { value: HealthCondition; label: string }[] = [
  { value: 'None', label: 'None' },
  { value: 'Diabetes', label: 'Diabetes' },
  { value: 'Hypertension', label: 'Hypertension' },
  { value: 'Allergy', label: 'Food Allergy' },
];

export function MemberForm({ member, onSave, onCancel }: MemberFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    gender: 'male' as 'male' | 'female',
    goal: 'maintain' as 'maintain' | 'lose' | 'gain',
    healthConditions: [] as HealthCondition[]
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        // FIX: Use optional chaining (?.) and fallback to empty string to prevent crash on null
        age: member.age?.toString() || '',
        height: member.height?.toString() || '',
        weight: member.weight?.toString() || '',
        gender: member.gender || 'male',
        goal: member.goal || 'maintain',
        healthConditions: member.healthConditions || ['None']
      });
    }
  }, [member]);

  const handleHealthToggle = (condition: HealthCondition) => {
    if (condition === 'None') {
      setFormData({ ...formData, healthConditions: ['None'] });
      return;
    }

    const current = formData.healthConditions.filter(c => c !== 'None');
    if (current.includes(condition)) {
      setFormData({ ...formData, healthConditions: current.filter(c => c !== condition) });
    } else {
      setFormData({ ...formData, healthConditions: [...current, condition] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.height || !formData.weight) {
      alert('Please fill in all fields');
      return;
    }

    const conditions = formData.healthConditions.length === 0 || formData.healthConditions.includes('None') 
      ? ['None'] 
      : formData.healthConditions;

    onSave({
      name: formData.name,
      age: parseInt(formData.age),
      height: parseInt(formData.height),
      weight: parseInt(formData.weight),
      gender: formData.gender,
      goal: formData.goal,
      healthConditions: conditions
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="e.g. John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            placeholder="Years"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={formData.gender} onValueChange={(val: 'male' | 'female') => setFormData({ ...formData, gender: val })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            placeholder="cm"
            value={formData.height}
            onChange={(e) => setFormData({ ...formData, height: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            placeholder="kg"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="goal">Goal</Label>
        <Select value={formData.goal} onValueChange={(val: 'maintain' | 'lose' | 'gain') => setFormData({ ...formData, goal: val })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="maintain">Maintain Weight</SelectItem>
            <SelectItem value="lose">Lose Weight</SelectItem>
            <SelectItem value="gain">Gain Weight</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Health Conditions</Label>
        <div className="grid grid-cols-2 gap-2">
          {HEALTH_OPTIONS.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleHealthToggle(option.value)}
              className={`flex items-center justify-center gap-2 p-2 text-sm border rounded-md transition-colors ${
                formData.healthConditions.includes(option.value)
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {formData.healthConditions.includes(option.value) && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </span>
              )}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
        <Button type="submit" className="flex-1">Save Member</Button>
      </div>
    </form>
  );
}