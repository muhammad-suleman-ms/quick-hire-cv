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
import { Trash, Plus, GraduationCap } from "lucide-react";

const educationItemSchema = z.object({
  school: z.string().min(1, "School or university name is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().optional(),
  location: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  current: z.boolean().optional(),
  description: z.string().optional(),
  gpa: z.string().optional(),
});

export type EducationItem = z.infer<typeof educationItemSchema>;

interface EducationFormProps {
  data: EducationItem[];
  onUpdate: (data: EducationItem[]) => void;
}

export function EducationForm({ data, onUpdate }: EducationFormProps) {
  const [education, setEducation] = useState<EducationItem[]>(data || []);
  const [currentlyEditing, setCurrentlyEditing] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const form = useForm<EducationItem>({
    resolver: zodResolver(educationItemSchema),
    defaultValues: {
      school: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      gpa: "",
    },
  });

  const handleEditEducation = (index: number) => {
    setCurrentlyEditing(index);
    form.reset(education[index]);
  };

  const handleDeleteEducation = (index: number) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
    onUpdate(updatedEducation);
    
    if (currentlyEditing === index) {
      setCurrentlyEditing(null);
      form.reset();
    }
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setCurrentlyEditing(null);
    form.reset({
      school: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      gpa: "",
    });
  };

  const onSubmit = (values: EducationItem) => {
    let updatedEducation: EducationItem[];

    if (currentlyEditing !== null) {
      updatedEducation = [...education];
      updatedEducation[currentlyEditing] = values;
    } else {
      updatedEducation = [...education, values];
    }

    setEducation(updatedEducation);
    onUpdate(updatedEducation);
    setCurrentlyEditing(null);
    setIsAddingNew(false);
    form.reset();
  };

  return (
    <div>
      <h3 className="text-xl font-medium text-primary">Education</h3>
      <p className="text-neutral-500 mt-1">Add your educational background</p>

      {education.length > 0 && (
        <div className="mt-6 space-y-4">
          {education.map((edu, index) => (
            <Card key={index} className="relative">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-neutral-700">
                  <p><strong>{edu.school}</strong></p>
                  {edu.location && <p>{edu.location}</p>}
                  <p className="text-neutral-500">
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  {edu.description && <p className="mt-2">{edu.description}</p>}
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-end gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleEditEducation(index)}
                >
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => handleDeleteEducation(index)}
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
                  <GraduationCap className="h-5 w-5 mr-2" />
                  {currentlyEditing !== null ? "Edit Education" : "Add Education"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="school"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>School/University</FormLabel>
                        <FormControl>
                          <Input placeholder="Harvard University" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input placeholder="Bachelor of Science" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fieldOfStudy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field of Study</FormLabel>
                        <FormControl>
                          <Input placeholder="Computer Science" {...field} />
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
                          <Input placeholder="Cambridge, MA" {...field} />
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
                          <Input placeholder="May 2022" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gpa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GPA (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="3.8" {...field} />
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
                      <FormLabel>Description (optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe any achievements, honors, or relevant coursework" 
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
                  {currentlyEditing !== null ? "Update" : "Add"} Education
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      ) : (
        <div className="mt-6">
          <Button onClick={handleAddNew} className="w-full" variant="outline">
            <Plus className="h-4 w-4 mr-2" /> Add Education
          </Button>
        </div>
      )}
    </div>
  );
}
