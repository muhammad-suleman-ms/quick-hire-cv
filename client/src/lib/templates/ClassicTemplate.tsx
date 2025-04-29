import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData, ResumePDFProps } from '../utils/resume-pdf';

// ClassicTemplate Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 40,
    fontFamily: 'Times-Roman',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
  },
  contact: {
    fontSize: 11,
    lineHeight: 1.5,
    textAlign: 'center',
  },
  separator: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontFamily: 'Times-Bold',
  },
  experienceItem: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Times-Bold',
  },
  company: {
    fontSize: 12,
  },
  locationDate: {
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  description: {
    fontSize: 11,
    lineHeight: 1.5,
  },
  skills: {
    marginTop: 5,
  },
  skillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 5,
  },
  skill: {
    fontSize: 11,
    marginHorizontal: 5,
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.5,
    textAlign: 'justify',
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

export const ClassicTemplate = ({ data, isPremium, hasPremiumAccess }: ResumePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {isPremium && !hasPremiumAccess && (
        <Text style={styles.watermark}>PREMIUM</Text>
      )}
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
        <View style={styles.contact}>
          <Text>{data.personalInfo.email} | {data.personalInfo.phone}</Text>
          {data.personalInfo.address && <Text>{data.personalInfo.address}</Text>}
          <Text>
            {data.personalInfo.linkedIn && `LinkedIn: ${data.personalInfo.linkedIn}`}
            {data.personalInfo.website && data.personalInfo.linkedIn && ' | '}
            {data.personalInfo.website && `Website: ${data.personalInfo.website}`}
          </Text>
        </View>
      </View>
      
      <View style={styles.separator} />
      
      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </View>
      )}
      
      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp.position}</Text>
              <Text style={styles.company}>{exp.company}</Text>
              <Text style={styles.locationDate}>
                {exp.location && `${exp.location} | `}
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </Text>
              {exp.description && <Text style={styles.description}>{exp.description}</Text>}
            </View>
          ))}
        </View>
      )}
      
      {/* Education */}
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>
                {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
              </Text>
              <Text style={styles.company}>{edu.school}</Text>
              <Text style={styles.locationDate}>
                {edu.location && `${edu.location} | `}
                {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
              </Text>
              {edu.gpa && <Text style={styles.description}>GPA: {edu.gpa}</Text>}
              {edu.description && <Text style={styles.description}>{edu.description}</Text>}
            </View>
          ))}
        </View>
      )}
      
      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skills}>
            <View style={styles.skillRow}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>• {skill}</Text>
              ))}
            </View>
          </View>
        </View>
      )}
      
      <View style={styles.separator} />
    </Page>
  </Document>
);

export default ClassicTemplate;
