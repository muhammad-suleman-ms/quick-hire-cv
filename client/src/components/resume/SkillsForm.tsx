import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const skillsFormSchema = z.object({
  skill: z.string().min(1, "Skill cannot be empty"),
});

interface SkillsFormProps {
  data: string[];
  onUpdate: (data: string[]) => void;
}

export function SkillsForm({ data, onUpdate }: SkillsFormProps) {
  const [skills, setSkills] = useState<string[]>(data || []);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof skillsFormSchema>>({
    resolver: zodResolver(skillsFormSchema),
    defaultValues: {
      skill: "",
    },
  });

  const handleAddSkill = (values: z.infer<typeof skillsFormSchema>) => {
    if (!values.skill) return;
    
    const newSkill = values.skill.trim();
    if (newSkill && !skills.includes(newSkill)) {
      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      onUpdate(updatedSkills);
    }
    
    form.reset();
    inputRef.current?.focus();
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    onUpdate(updatedSkills);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = form.getValues().skill;
      if (value) {
        form.handleSubmit(handleAddSkill)();
      }
    }
  };

  return (
    <div>
      <h3 className="text-xl font-medium text-primary">Skills</h3>
      <p className="text-neutral-500 mt-1">Add your skills to highlight your strengths</p>
      
      <div className="mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddSkill)} className="space-y-4">
            <FormField
              control={form.control}
              name="skill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add a skill</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input 
                        placeholder="Ex: JavaScript, Project Management, Communication" 
                        {...field} 
                        ref={inputRef}
                        onKeyDown={handleKeyDown}
                      />
                    </FormControl>
                    <Button type="submit">Add</Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Your Skills:</h4>
          {skills.length === 0 ? (
            <p className="text-neutral-500 text-sm">No skills added yet. Add skills to enhance your resume.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="pl-3 flex items-center gap-1 text-sm"
                >
                  {skill}
                  <button 
                    type="button" 
                    className="ml-1 text-neutral-500 hover:text-neutral-700"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Suggested Skills:</h4>
          <div className="flex flex-wrap gap-2">
            {["JavaScript", "React", "Node.js", "TypeScript", "Project Management", "Team Leadership", 
              "Communication", "Problem Solving", "Creativity", "Adaptability", "Time Management"]
              .filter(suggestion => !skills.includes(suggestion))
              .slice(0, 8)
              .map((suggestion, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary hover:text-white"
                  onClick={() => {
                    form.setValue("skill", suggestion);
                    form.handleSubmit(handleAddSkill)();
                  }}
                >
                  + {suggestion}
                </Badge>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
