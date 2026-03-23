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
        age: member.age ? member.age.toString() : '',
        height: member.height ? member.height.toString() : '',
        weight: member.weight ? member.weight.toString() : '',
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
      setFormData({
        ...formData,
        healthConditions: current.filter(c => c !== condition)
      });
    } else {
      setFormData({
        ...formData,
        healthConditions: [...current, condition]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.height || !formData.weight) {
      alert('Please fill in all fields');
      return;
    }

    const conditions =
      formData.healthConditions.length === 0 ||
      formData.healthConditions.includes('None')
        ? ['None']
        : formData.healthConditions;

    onSave({
      name: formData.name,
      age: parseInt(formData.age),
      height: parseInt(formData.height),
      weight: parseInt(formData.weight),
      gender: formData.gender,
      goal: formData.goal,
      healthConditions: conditions,
      activityLevel: "moderate",        // ✅ required field added
      dietaryPreference: "veg"          // ✅ required field added
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="e.g. John Doe"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
      </div>

      {/* Age + Gender */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, age: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(val: 'male' | 'female') =>
              setFormData({ ...formData, gender: val })
            }
          >
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

      {/* Height + Weight */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Height (cm)</Label>
          <Input
            type="number"
            value={formData.height}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, height: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Weight (kg)</Label>
          <Input
            type="number"
            value={formData.weight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, weight: e.target.value })
            }
          />
        </div>
      </div>

      {/* Goal */}
      <div className="space-y-2">
        <Label>Goal</Label>
        <Select
          value={formData.goal}
          onValueChange={(val: 'maintain' | 'lose' | 'gain') =>
            setFormData({ ...formData, goal: val })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="maintain">Maintain</SelectItem>
            <SelectItem value="lose">Lose</SelectItem>
            <SelectItem value="gain">Gain</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Health */}
      <div className="space-y-2">
        <Label>Health Conditions</Label>
        <div className="grid grid-cols-2 gap-2">
          {HEALTH_OPTIONS.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleHealthToggle(option.value)}
              className={`p-2 border rounded ${
                formData.healthConditions.includes(option.value)
                  ? 'bg-green-100'
                  : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save
        </Button>
      </div>

    </form>
  );
}