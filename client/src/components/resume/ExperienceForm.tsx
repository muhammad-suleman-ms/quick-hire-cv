import { useState } from "react";
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Plus, Briefcase } from "lucide-react";

const experienceItemSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Job title is required"),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
});

export type ExperienceItem = z.infer<typeof experienceItemSchema>;

interface ExperienceFormProps {
  data: ExperienceItem[];
  onUpdate: (data: ExperienceItem[]) => void;
}

export function ExperienceForm({ data, onUpdate }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(data || []);
  const [currentlyEditing, setCurrentlyEditing] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const form = useForm<ExperienceItem>({
    resolver: zodResolver(experienceItemSchema),
    defaultValues: {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  });

  const handleEditExperience = (index: number) => {
    setCurrentlyEditing(index);
    form.reset(experiences[index]);
  };

  const handleDeleteExperience = (index: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
    
    if (currentlyEditing === index) {
      setCurrentlyEditing(null);
      form.reset();
    }
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setCurrentlyEditing(null);
    form.reset({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
  };

  const onSubmit = (values: ExperienceItem) => {
    let updatedExperiences: ExperienceItem[];

    if (currentlyEditing !== null) {
      updatedExperiences = [...experiences];
      updatedExperiences[currentlyEditing] = values;
    } else {
      updatedExperiences = [...experiences, values];
    }

    setExperiences(updatedExperiences);
    onUpdate(updatedExperiences);
    setCurrentlyEditing(null);
    setIsAddingNew(false);
    form.reset();
  };

  return (
    <div>
      <h3 className="text-xl font-medium text-primary">Work Experience</h3>
      <p className="text-neutral-500 mt-1">Add your work experience, internships, or volunteer work</p>

      {experiences.length > 0 && (
        <div className="mt-6 space-y-4">
          {experiences.map((exp, index) => (
            <Card key={index} className="relative">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{exp.position}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-neutral-700">
                  <p><strong>{exp.company}</strong></p>
                  {exp.location && <p>{exp.location}</p>}
                  <p className="text-neutral-500">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </p>
                  {exp.description && <p className="mt-2">{exp.description}</p>}
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-end gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleEditExperience(index)}
                >
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => handleDeleteExperience(index)}
                >
                  <Trash className="h-4 w-4 mr-1" /> Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {(currentlyEditing !== null || isAddingNew) ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  {currentlyEditing !== null ? "Edit Experience" : "Add Experience"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job title</FormLabel>
                        <FormControl>
                          <Input placeholder="Product Designer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employer</FormLabel>
                        <FormControl>
                          <Input placeholder="Google" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="San Francisco, CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start date</FormLabel>
                        <FormControl>
                          <Input placeholder="September 2018" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End date</FormLabel>
                        <FormControl>
                          <Input placeholder="September 2021" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your position and accomplishments" 
                          className="resize-none h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setCurrentlyEditing(null);
                    setIsAddingNew(false);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {currentlyEditing !== null ? "Update" : "Add"} Experience
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      ) : (
        <div className="mt-6">
          <Button onClick={handleAddNew} className="w-full" variant="outline">
            <Plus className="h-4 w-4 mr-2" /> Add Experience
          </Button>
        </div>
      )}
    </div>
  );
}
