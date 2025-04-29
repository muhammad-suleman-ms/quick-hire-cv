import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Edit, ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "wouter";
import { templates } from "@/lib/resume-templates";
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

export default function ViewResume() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [showSubscriptionAlert, setShowSubscriptionAlert] = useState(false);
  
  const { data: user } = useQuery<{ username: string } | null>({
    queryKey: ["/api/me"],
  });
  
  const { data: subscription } = useQuery<{ isPremium: boolean }>({
    queryKey: ["/api/subscription"],
    enabled: !!user,
  });
  
  const { data: resume, isLoading, error } = useQuery({
    queryKey: [`/api/resumes/${id}`],
    enabled: !!id,
  });
  
  const hasPremiumAccess = !!subscription?.isPremium;
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="animate-spin h-8 w-8 border-4 border-secondary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (error || !resume) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Resume</AlertTitle>
          <AlertDescription>
            There was an error loading the resume. It may not exist or you might not have access to it.
          </AlertDescription>
        </Alert>
        
        <div className="flex gap-4 justify-center">
          <Button variant="default" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }
  
  const selectedTemplate = templates.find(t => t.id === resume.templateId);
  const isPremiumTemplate = selectedTemplate?.isPremium || false;
  const resumeFileName = `${resume.personalInfo.firstName.toLowerCase()}_${resume.personalInfo.lastName.toLowerCase()}_resume.pdf`;
  
  const handleDownloadClick = () => {
    if (isPremiumTemplate && !hasPremiumAccess) {
      setShowSubscriptionAlert(true);
      return;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="outline" onClick={() => navigate("/dashboard")} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-2xl font-bold">Resume Preview</h1>
        </div>
        
        <div className="flex gap-2">
          <Link to={`/edit-resume/${id}`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
          </Link>
          
          {isPremiumTemplate && !hasPremiumAccess ? (
            <Button onClick={handleDownloadClick}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          ) : (
            <PDFDownloadLink 
              document={<ResumePDF data={resume} isPremium={isPremiumTemplate} hasPremiumAccess={hasPremiumAccess} />} 
              fileName={resumeFileName}
            >
              {({ loading }) => (
                <Button disabled={loading}>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              )}
            </PDFDownloadLink>
          )}
        </div>
      </div>
      
      {isPremiumTemplate && !hasPremiumAccess && (
        <Alert className="mb-4 bg-amber-50 border-amber-200">
          <AlertTitle className="text-amber-800">Premium Template</AlertTitle>
          <AlertDescription className="text-amber-700">
            This resume uses a premium template. The PDF download will include a watermark unless you subscribe.
            <Link to="/subscription" className="ml-2 text-secondary font-medium hover:underline">
              Upgrade to Premium
            </Link>
          </AlertDescription>
        </Alert>
      )}
      
      <Card className="p-6 overflow-hidden">
        <div className="h-[800px]">
          <PDFViewer style={{ width: '100%', height: '100%' }}>
            <ResumePDF data={resume} isPremium={isPremiumTemplate} hasPremiumAccess={hasPremiumAccess} />
          </PDFViewer>
        </div>
      </Card>
      
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
