import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox'; // Assuming Checkbox exists or using div
import { Plus } from 'lucide-react';
import { FamilyMember } from '../../types';

interface AddMemberDialogProps {
  onAddMember: (member: FamilyMember) => void;
}

export function AddMemberDialog({ onAddMember }: AddMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'moderate' | 'active'>('moderate');
  const [goal, setGoal] = useState<'maintain' | 'lose' | 'gain'>('maintain');
  
  // New State
  const [dietaryPreference, setDietaryPreference] = useState<'vegetarian' | 'non-vegetarian' | 'vegan' | 'no-seafood'>('non-vegetarian');
  const [healthConditions, setHealthConditions] = useState<string[]>([]);

  const healthOptions = [
    { id: 'diabetes', label: 'Diabetes / High Sugar' },
    { id: 'hypertension', label: 'Hypertension / High BP' },
    { id: 'heart', label: 'Heart Disease' },
    { id: 'obesity', label: 'Obesity' },
    { id: 'none', label: 'None' }
  ];

  const handleHealthConditionChange = (conditionId: string, checked: boolean) => {
    if (conditionId === 'none') {
      setHealthConditions(checked ? [] : healthConditions);
    } else {
      if (checked) {
        setHealthConditions([...healthConditions.filter(c => c !== 'none'), conditionId]);
      } else {
        setHealthConditions(healthConditions.filter(c => c !== conditionId));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age) return;

    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name,
      age: parseInt(age),
      gender,
      activityLevel,
      goal,
      healthConditions,
      dietaryPreference,
      likes: '',
      dislikes: ''
    };

    onAddMember(newMember);
    setOpen(false);
    setName('');
    setAge('');
    setGender('male');
    setActivityLevel('moderate');
    setGoal('maintain');
    setDietaryPreference('non-vegetarian');
    setHealthConditions([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Family Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Family Member</DialogTitle>
          <DialogDescription>
            Enter details to generate a personalized diet plan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="e.g. John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" placeholder="e.g. 25" value={age} onChange={(e) => setAge(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup value={gender} onValueChange={(v) => setGender(v as 'male' | 'female')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="diet">Dietary Preference</Label>
            <Select value={dietaryPreference} onValueChange={(v) => setDietaryPreference(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="no-seafood">No Seafood</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Health Conditions</Label>
            <div className="space-y-2 border p-3 rounded-lg">
              {healthOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={option.id}
                    checked={option.id === 'none' ? healthConditions.length === 0 : healthConditions.includes(option.id)}
                    onCheckedChange={(checked) => handleHealthConditionChange(option.id, checked as boolean)}
                  />
                  <Label htmlFor={option.id} className="text-sm font-normal">{option.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">Activity Level</Label>
            <Select value={activityLevel} onValueChange={(v) => setActivityLevel(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="active">Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <Select value={goal} onValueChange={(v) => setGoal(v as any)}>
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

          <div className="flex justify-end pt-4">
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Add Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}