import React, { useState } from 'react';
import { router } from '@inertiajs/core';
import { Button } from '@/Components/Ui/button';
import { Input } from '@/Components/Ui/input';
import { Label } from '@/Components/Ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/Components/Ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/Components/Ui/dialog';
import { Ability } from '@/Types/approval-policies';
import { PlusCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ApprovalPolicyFormProps {
  isOpen: boolean;
  onClose: () => void;
  abilities: Ability[];
}

export function ApprovalPolicyForm({ isOpen, onClose, abilities }: ApprovalPolicyFormProps) {
  const [action, setAction] = useState('');
  const [steps, setSteps] = useState<string[]>(['']);

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      const newSteps = [...steps];
      newSteps.splice(index, 1);
      setSteps(newSteps);
    }
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty steps
    const filteredSteps = steps.filter(step => step !== '');
    
    if (!action || filteredSteps.length === 0) {
      toast.success('Please provide an action and at least one step.');
      return;
    }

    router.post(route('dashboard.approval-policies.store'), {
      action,
      steps: filteredSteps,
    }, {
      onSuccess: () => {
        toast.success('Approval policy updated successfully.');
        onClose();
        setAction('');
        setSteps(['']);
      },
      onError: () => {
        toast.error('Failed to update approval policy.');
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Approval Policy</DialogTitle>
          <DialogDescription>
            Define a new approval policy with required abilities for each step.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="action" className="text-right">
                Action
              </Label>
              <div className="col-span-3">
                <Input
                  id="action"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  placeholder="e.g., offer_approval"
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-3">
                Steps
              </Label>
              <div className="col-span-3 space-y-2">
                {steps.map((step, index) => (
                  <div key={index} className="flex gap-2">
                    <Select
                      value={step}
                      onValueChange={(value) => updateStep(index, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select ability" />
                      </SelectTrigger>
                      <SelectContent>
                        {abilities.map((ability) => (
                          <SelectItem key={ability.id} value={ability.key}>
                            {ability.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeStep(index)}
                      disabled={steps.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addStep}
                  className="w-full"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Step
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Policy
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}