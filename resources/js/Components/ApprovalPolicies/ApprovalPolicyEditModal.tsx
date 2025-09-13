import { useState, useEffect, useRef } from 'react';
import { Button } from '@/Components/Ui/button';
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
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/Components/Ui/card';
import { GripVertical, PlusCircle, Trash2, Save } from 'lucide-react';
import { Ability, ApprovalPolicy } from '@/Types/approval-policies';

interface ApprovalPolicyEditModalProps {
  policy: ApprovalPolicy;
  abilities: Ability[];
  onClose: () => void;
  onUpdateSteps: (policyId: number, newSteps: string[]) => void;
}

export function ApprovalPolicyEditModal({ 
  policy, 
  abilities, 
  onClose, 
  onUpdateSteps 
}: ApprovalPolicyEditModalProps) {
  const [steps, setSteps] = useState<string[]>([...policy.steps]);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // Update state when policy prop changes
  useEffect(() => {
    setSteps([...policy.steps]);
  }, [policy]);

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const removeStep = (index: number) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleSave = () => {
    onUpdateSteps(policy.id, steps);
    onClose();
  };

  // Drag and drop functions
  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newSteps = [...steps];
      const draggedItem = newSteps[dragItem.current];
      newSteps.splice(dragItem.current, 1);
      newSteps.splice(dragOverItem.current, 0, draggedItem);
      setSteps(newSteps);
    }
    
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Approval Policy</DialogTitle>
          <DialogDescription>
            Modify the approval policy for "{policy.action}". You can reorder or remove abilities.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Approval Steps</CardTitle>
              <CardDescription>
                Define the required abilities for each step in order. 
                Drag and drop to reorder steps. An empty list means no approval is required for this action.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className="flex items-center gap-2 bg-background border rounded-md p-2 cursor-grab"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="cursor-grab"
                    disabled={steps.length <= 1}
                  >
                    <GripVertical className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex-1 flex gap-2">
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
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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
            </CardContent>
          </Card>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}