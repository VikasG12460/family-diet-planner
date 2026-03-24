import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input.tsx';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox'; // Import Checkbox
import { User, Users, Plus, Trash2, MapPin, Ruler, Weight, Target, Calendar, Heart } from 'lucide-react';
import type { FamilyProfile, FamilyMember } from '../../types/index.ts';

interface ProfileSetupProps {
  user: { name: string; email: string; id: string };
  onComplete: (profile: FamilyProfile) => void;
}

export function ProfileSetup({ user, onComplete }: ProfileSetupProps) {
  const [step, setStep] = useState(1);
  
  // Primary User State
  const [primaryUser, setPrimaryUser] = useState({
    height: '',
    weight: '',
    age: '',
    gender: 'male' as 'male' | 'female',
    goal: 'maintain' as 'maintain' | 'lose' | 'gain',
    activityLevel: 'moderate' as 'sedentary' | 'moderate' | 'active',
    dietaryPreference: 'non-vegetarian' as 'vegetarian' | 'non-vegetarian' | 'vegan' | 'no-seafood',
    healthConditions: [] as string[]
  });

  // Location State
  const [location, setLocation] = useState({
    country: 'India',
    state: '',
    cityType: 'urban' as 'urban' | 'rural' | 'coastal'
  });

  // Family Members State
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({
    name: '',
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    goal: 'maintain',
    activityLevel: 'moderate',
    dietaryPreference: 'non-vegetarian',
    healthConditions: [] as string[]
  });

  // Health Options
  const healthOptions = [
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'hypertension', label: 'Hypertension (BP)' },
    { id: 'heart', label: 'Heart Disease' },
    { id: 'obesity', label: 'Obesity' }
  ];

  const handlePrimaryHealthChange = (conditionId: string, checked: boolean) => {
    setPrimaryUser(prev => {
      if (checked) {
        return { ...prev, healthConditions: [...prev.healthConditions, conditionId] };
      } else {
        return { ...prev, healthConditions: prev.healthConditions.filter(c => c !== conditionId) };
      }
    });
  };

  const handleNewMemberHealthChange = (conditionId: string, checked: boolean) => {
    setNewMember(prev => {
      const currentConditions = prev.healthConditions || [];
      if (checked) {
        return { ...prev, healthConditions: [...currentConditions, conditionId] };
      } else {
        return { ...prev, healthConditions: currentConditions.filter(c => c !== conditionId) };
      }
    });
  };

  const handleAddMember = () => {
    if (newMember.name && newMember.age && newMember.weight && newMember.height) {
      setMembers([...members, {
        id: `m-${Date.now()}`,
        name: newMember.name,
        age: parseInt(newMember.age as string),
        gender: newMember.gender as 'male' | 'female',
        weight: parseFloat(newMember.weight as string),
        height: parseFloat(newMember.height as string),
        goal: newMember.goal as 'maintain' | 'lose' | 'gain',
        activityLevel: newMember.activityLevel as 'sedentary' | 'moderate' | 'active',
        dietaryPreference: newMember.dietaryPreference || 'non-vegetarian',
        healthConditions: newMember.healthConditions || []
      }]);
      // Reset form
      setNewMember({ 
        name: '', age: '', gender: 'male', weight: '', height: '', 
        goal: 'maintain', activityLevel: 'moderate', 
        dietaryPreference: 'non-vegetarian', healthConditions: [] 
      });
    }
  };

  const handleSubmit = () => {
    // Add primary user as a member too
    const primaryMember: FamilyMember = {
      id: user.id,
      name: user.name,
      age: parseInt(primaryUser.age) || 30,
      gender: primaryUser.gender,
      weight: parseFloat(primaryUser.weight),
      height: parseFloat(primaryUser.height),
      goal: primaryUser.goal,
      activityLevel: primaryUser.activityLevel,
      dietaryPreference: primaryUser.dietaryPreference,
      healthConditions: primaryUser.healthConditions
    };

    const profile: FamilyProfile = {
      primaryUser: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      members: [primaryMember, ...members],
      location: {
        country: location.country,
        state: location.state || 'Unknown',
        cityType: location.cityType
      }
    };
    onComplete(profile);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-emerald-600">Setup Your Family</CardTitle>
          <CardDescription>Step {step} of 3</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2"><User className="w-4 h-4" /> Your Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Age</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input className="pl-9" type="number" placeholder="30" value={primaryUser.age} onChange={e => setPrimaryUser({...primaryUser, age: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select value={primaryUser.gender} onValueChange={(val: 'male' | 'female') => setPrimaryUser({...primaryUser, gender: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Height (cm)</Label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input className="pl-9" type="number" placeholder="170" value={primaryUser.height} onChange={e => setPrimaryUser({...primaryUser, height: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Weight (kg)</Label>
                  <div className="relative">
                    <Weight className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input className="pl-9" type="number" placeholder="70" value={primaryUser.weight} onChange={e => setPrimaryUser({...primaryUser, weight: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Activity Level</Label>
                <Select value={primaryUser.activityLevel} onValueChange={(val: 'sedentary' | 'moderate' | 'active') => setPrimaryUser({...primaryUser, activityLevel: val})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (Little exercise)</SelectItem>
                    <SelectItem value="moderate">Moderate (Exercise 3-5 days)</SelectItem>
                    <SelectItem value="active">Active (Exercise 6-7 days)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Goal</Label>
                <RadioGroup value={primaryUser.goal} onValueChange={(val: 'maintain' | 'lose' | 'gain') => setPrimaryUser({...primaryUser, goal: val})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lose" id="lose" />
                    <Label htmlFor="lose">Lose Weight</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maintain" id="maintain" />
                    <Label htmlFor="maintain">Maintain Weight</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gain" id="gain" />
                    <Label htmlFor="gain">Gain Muscle</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* NEW: Dietary Preference */}
              <div className="space-y-2">
                <Label>Dietary Preference</Label>
                <Select value={primaryUser.dietaryPreference} onValueChange={(val) => setPrimaryUser({...primaryUser, dietaryPreference: val as any})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="no-seafood">No Seafood</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* NEW: Health Conditions */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Heart className="w-4 h-4 text-red-500" /> Health Conditions</Label>
                <div className="space-y-2 border p-3 rounded-lg bg-gray-50">
                  {healthOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`primary-${option.id}`}
                        checked={primaryUser.healthConditions.includes(option.id)}
                        onCheckedChange={(checked) => handlePrimaryHealthChange(option.id, checked as boolean)}
                      />
                      <Label htmlFor={`primary-${option.id}`} className="text-sm font-normal cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => setStep(2)}>Next</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</h3>
              
              <div className="space-y-2">
                <Label>Country</Label>
                <Select value={location.country} onValueChange={(val) => setLocation({...location, country: val})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="UK">UK</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>State/Region</Label>
                <Input placeholder="e.g. California" value={location.state} onChange={e => setLocation({...location, state: e.target.value})} />
              </div>

              <div className="space-y-2">
                <Label>City Type</Label>
                <RadioGroup value={location.cityType} onValueChange={(val: any) => setLocation({...location, cityType: val})}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urban" id="urban" />
                    <Label htmlFor="urban">Urban</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rural" id="rural" />
                    <Label htmlFor="rural">Rural</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="coastal" id="coastal" />
                    <Label htmlFor="coastal">Coastal</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => setStep(3)}>Next</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2"><Users className="w-4 h-4" /> Family Members</h3>
              
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg border">
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Name" value={newMember.name} onChange={e => setNewMember({...newMember, name: e.target.value})} />
                  <Input type="number" placeholder="Age" value={newMember.age} onChange={e => setNewMember({...newMember, age: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Select value={newMember.gender} onValueChange={(val: 'male' | 'female') => setNewMember({...newMember, gender: val})}>
                    <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
                    <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                  </Select>
                  <Select value={newMember.activityLevel} onValueChange={(val: 'sedentary' | 'moderate' | 'active') => setNewMember({...newMember, activityLevel: val})}>
                    <SelectTrigger><SelectValue placeholder="Activity" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Select value={newMember.goal} onValueChange={(val: 'maintain' | 'lose' | 'gain') => setNewMember({...newMember, goal: val})}>
                    <SelectTrigger><SelectValue placeholder="Goal" /></SelectTrigger>
                    <SelectContent><SelectItem value="lose">Lose</SelectItem><SelectItem value="maintain">Maintain</SelectItem><SelectItem value="gain">Gain</SelectItem></SelectContent>
                  </Select>
                  <div className="col-span-2 grid grid-cols-2 gap-2">
                    <Input type="number" placeholder="Height (cm)" value={newMember.height} onChange={e => setNewMember({...newMember, height: e.target.value})} />
                    <Input type="number" placeholder="Weight (kg)" value={newMember.weight} onChange={e => setNewMember({...newMember, weight: e.target.value})} />
                  </div>
                </div>

                {/* NEW: Dietary Preference for Family Member */}
                <div className="space-y-2">
                  <Label>Dietary Preference</Label>
                  <Select value={newMember.dietaryPreference} onValueChange={(val) => setNewMember({...newMember, dietaryPreference: val as any})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="no-seafood">No Seafood</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* NEW: Health Conditions for Family Member */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Heart className="w-4 h-4 text-red-500" /> Health Conditions</Label>
                  <div className="space-y-2 border p-2 rounded-lg bg-white">
                    {healthOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`member-${option.id}`}
                          checked={(newMember.healthConditions || []).includes(option.id)}
                          onCheckedChange={(checked) => handleNewMemberHealthChange(option.id, checked as boolean)}
                        />
                        <Label htmlFor={`member-${option.id}`} className="text-xs font-normal cursor-pointer">{option.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={handleAddMember} className="w-full" variant="outline"><Plus className="w-4 h-4 mr-2" /> Add Member</Button>
              </div>

              {members.length > 0 && (
                <div className="space-y-2">
                  {members.map((m, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded bg-white">
                      <div className="text-sm">
                        <span className="font-medium">{m.name}</span> <span className="text-gray-500">({m.age}y)</span>
                        <div className="text-xs text-gray-400">
                          {m.dietaryPreference} {m.healthConditions.length > 0 && `• ${m.healthConditions.join(', ')}`}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setMembers(members.filter((_, idx) => idx !== i))}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={handleSubmit}>Generate Plan</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}