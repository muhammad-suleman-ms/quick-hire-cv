import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for PDF rendering
export const styles = StyleSheet.create({
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

export interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    linkedIn?: string;
    website?: string;
  };
  summary?: string;
  experience?: Array<{
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description?: string;
  }>;
  education?: Array<{
    school: string;
    degree: string;
    fieldOfStudy?: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description?: string;
    gpa?: string;
  }>;
  skills?: string[];
  templateId: string;
}

export interface ResumePDFProps {
  data: ResumeData;
  isPremium: boolean;
  hasPremiumAccess: boolean;
}

export const getPDFFileName = (firstName: string, lastName: string): string => {
  return `${firstName.toLowerCase()}_${lastName.toLowerCase()}_resume.pdf`;
};
