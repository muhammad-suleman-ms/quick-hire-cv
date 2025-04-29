import { useState } from "react";
import { 
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { templates } from "@/lib/resume-templates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Link } from "wouter";

interface ResumePreviewProps {
  data: any;
  onSave: () => void;
}

// PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 2,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 10,
    marginBottom: 2,
  },
  dates: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 10,
    marginTop: 5,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skill: {
    fontSize: 10,
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
    padding: 4,
    borderRadius: 3,
  },
  summary: {
    fontSize: 10,
    marginBottom: 15,
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-45deg)',
    fontSize: 60,
    color: 'rgba(255, 77, 0, 0.3)',
    zIndex: 1000,
  },
});

// PDF Document Component
const ResumePDF = ({ data, isPremium, hasPremiumAccess }: { data: any, isPremium: boolean, hasPremiumAccess: boolean }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {isPremium && !hasPremiumAccess && (
        <Text style={styles.watermark}>PREMIUM</Text>
      )}
      <View style={styles.section}>
        <Text style={styles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
        <View style={styles.contact}>
          <Text>{data.personalInfo.email} | {data.personalInfo.phone}</Text>
          {data.personalInfo.address && <Text>{data.personalInfo.address}</Text>}
          {data.personalInfo.linkedIn && <Text>LinkedIn: {data.personalInfo.linkedIn}</Text>}
          {data.personalInfo.website && <Text>Website: {data.personalInfo.website}</Text>}
        </View>
      </View>

      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </View>
      )}

      {data.experience && data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPERIENCE</Text>
          {data.experience.map((exp: any, index: number) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.itemTitle}>{exp.position} | {exp.company}</Text>
              <Text style={styles.itemSubtitle}>{exp.location}</Text>
              <Text style={styles.dates}>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</Text>
              {exp.description && <Text style={styles.description}>{exp.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>
          {data.education.map((edu: any, index: number) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={styles.itemTitle}>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</Text>
              <Text style={styles.itemSubtitle}>{edu.school}, {edu.location}</Text>
              <Text style={styles.dates}>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</Text>
              {edu.description && <Text style={styles.description}>{edu.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {data.skills && data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SKILLS</Text>
          <View style={styles.skills}>
            {data.skills.map((skill: string, index: number) => (
              <Text key={index} style={styles.skill}>{skill}</Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export function ResumePreview({ data, onSave }: ResumePreviewProps) {
  const [viewMode, setViewMode] = useState<"preview" | "pdf">("preview");
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [showSubscriptionAlert, setShowSubscriptionAlert] = useState(false);

  const { data: subscription } = useQuery<{ isPremium: boolean }>({
    queryKey: ["/api/subscription"],
  });
  
  const hasPremiumAccess = !!subscription?.isPremium;
  
  const selectedTemplate = templates.find(t => t.id === data.templateId);
  const isPremiumTemplate = selectedTemplate?.isPremium || false;

  const resumeFileName = `${data.personalInfo.firstName.toLowerCase()}_${data.personalInfo.lastName.toLowerCase()}_resume.pdf`;

  const handleDownloadClick = () => {
    if (isPremiumTemplate && !hasPremiumAccess) {
      setShowSubscriptionAlert(true);
      return;
    }
  };

  return (
    <div>
      <h3 className="text-xl font-medium text-primary">Review Your Resume</h3>
      <p className="text-neutral-500 mt-1">Preview and save your resume</p>
      
      <div className="mt-6">
        <Tabs defaultValue="preview" className="w-full">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="preview" onClick={() => setViewMode("preview")}>Preview</TabsTrigger>
              <TabsTrigger value="pdf" onClick={() => setViewMode("pdf")}>PDF</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsPdfPreviewOpen(true)}>
                <Eye className="h-4 w-4 mr-2" /> Full Preview
              </Button>
              
              {viewMode === "pdf" ? (
                <>
                  {isPremiumTemplate && !hasPremiumAccess ? (
                    <Button onClick={handleDownloadClick}>
                      <Download className="h-4 w-4 mr-2" /> Download PDF
                    </Button>
                  ) : (
                    <PDFDownloadLink 
                      document={<ResumePDF data={data} isPremium={isPremiumTemplate} hasPremiumAccess={hasPremiumAccess} />} 
                      fileName={resumeFileName}
                    >
                      {({ loading }) => (
                        <Button disabled={loading}>
                          <Download className="h-4 w-4 mr-2" /> Download PDF
                        </Button>
                      )}
                    </PDFDownloadLink>
                  )}
                </>
              ) : (
                <Button onClick={onSave}>
                  Save Resume
                </Button>
              )}
            </div>
          </div>
          
          <TabsContent value="preview" className="mt-4">
            <Card className="p-6 min-h-[600px] overflow-auto">
              <div className="max-w-[800px] mx-auto">
                {isPremiumTemplate && !hasPremiumAccess && (
                  <div className="watermark absolute inset-0 pointer-events-none z-10"></div>
                )}
                
                <div className="py-4">
                  <h1 className="text-3xl font-bold">{data.personalInfo.firstName} {data.personalInfo.lastName}</h1>
                  <div className="flex flex-wrap gap-2 text-sm text-neutral-600 mt-1">
                    <span>{data.personalInfo.email}</span>
                    <span>•</span>
                    <span>{data.personalInfo.phone}</span>
                    {data.personalInfo.address && (
                      <>
                        <span>•</span>
                        <span>{data.personalInfo.address}</span>
                      </>
                    )}
                    {data.personalInfo.linkedIn && (
                      <>
                        <span>•</span>
                        <span>{data.personalInfo.linkedIn}</span>
                      </>
                    )}
                  </div>
                </div>
                
                {data.summary && (
                  <div className="py-4 border-t border-neutral-200">
                    <h2 className="text-lg font-bold uppercase">Professional Summary</h2>
                    <p className="mt-2 text-sm">{data.summary}</p>
                  </div>
                )}
                
                {data.experience && data.experience.length > 0 && (
                  <div className="py-4 border-t border-neutral-200">
                    <h2 className="text-lg font-bold uppercase">Experience</h2>
                    <div className="mt-2 space-y-4">
                      {data.experience.map((exp: any, index: number) => (
                        <div key={index}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold">{exp.position}</h3>
                              <p className="text-sm">{exp.company}, {exp.location}</p>
                            </div>
                            <div className="text-sm text-neutral-600">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </div>
                          </div>
                          {exp.description && <p className="mt-1 text-sm">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {data.education && data.education.length > 0 && (
                  <div className="py-4 border-t border-neutral-200">
                    <h2 className="text-lg font-bold uppercase">Education</h2>
                    <div className="mt-2 space-y-4">
                      {data.education.map((edu: any, index: number) => (
                        <div key={index}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold">{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h3>
                              <p className="text-sm">{edu.school}, {edu.location}</p>
                            </div>
                            <div className="text-sm text-neutral-600">
                              {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                            </div>
                          </div>
                          {edu.description && <p className="mt-1 text-sm">{edu.description}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {data.skills && data.skills.length > 0 && (
                  <div className="py-4 border-t border-neutral-200">
                    <h2 className="text-lg font-bold uppercase">Skills</h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {data.skills.map((skill: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-neutral-100 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="pdf" className="mt-4">
            <Card className="p-6 min-h-[600px] overflow-auto">
              <div className="p-4 bg-neutral-100 rounded-md text-center mb-4">
                <p>This is a preview of how your PDF will look. Click "Download PDF" to save it to your device.</p>
                {isPremiumTemplate && !hasPremiumAccess && (
                  <p className="text-amber-600 mt-2">Premium template selected. The PDF will include a watermark unless you subscribe.</p>
                )}
              </div>
              
              <div style={{ height: '600px' }}>
                <PDFViewer style={{ width: '100%', height: '100%' }}>
                  <ResumePDF data={data} isPremium={isPremiumTemplate} hasPremiumAccess={hasPremiumAccess} />
                </PDFViewer>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={isPdfPreviewOpen} onOpenChange={setIsPdfPreviewOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Resume Preview</DialogTitle>
            <DialogDescription>
              Full preview of your resume
            </DialogDescription>
          </DialogHeader>
          <div className="h-[70vh]">
            <PDFViewer style={{ width: '100%', height: '100%' }}>
              <ResumePDF data={data} isPremium={isPremiumTemplate} hasPremiumAccess={hasPremiumAccess} />
            </PDFViewer>
          </div>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={showSubscriptionAlert} onOpenChange={setShowSubscriptionAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Premium Template Selected</AlertDialogTitle>
            <AlertDialogDescription>
              You've selected a premium template. To download your resume without a watermark, you need to upgrade to a premium subscription.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Link href="/subscription">
                <Button>Upgrade to Premium</Button>
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
