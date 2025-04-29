import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData, ResumePDFProps } from '../utils/resume-pdf';

// ModernTemplate Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#dddddd',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  contact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 10,
    color: '#555555',
  },
  contactItem: {
    marginRight: 15,
    marginBottom: 3,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
    textTransform: 'uppercase',
  },
  experienceItem: {
    marginBottom: 15,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#dddddd',
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333333',
  },
  company: {
    fontSize: 11,
    color: '#555555',
    marginBottom: 3,
  },
  dates: {
    fontSize: 10,
    color: '#777777',
    marginBottom: 5,
  },
  description: {
    fontSize: 10,
    color: '#444444',
    lineHeight: 1.5,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skill: {
    fontSize: 10,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    padding: 5,
    borderRadius: 3,
    color: '#333333',
  },
  summary: {
    fontSize: 11,
    color: '#444444',
    lineHeight: 1.6,
    marginBottom: 15,
    fontStyle: 'italic',
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

export const ModernTemplate = ({ data, isPremium, hasPremiumAccess }: ResumePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {isPremium && !hasPremiumAccess && (
        <Text style={styles.watermark}>PREMIUM</Text>
      )}
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
        <View style={styles.contact}>
          <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
          <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
          {data.personalInfo.address && (
            <Text style={styles.contactItem}>{data.personalInfo.address}</Text>
          )}
          {data.personalInfo.linkedIn && (
            <Text style={styles.contactItem}>LinkedIn: {data.personalInfo.linkedIn}</Text>
          )}
          {data.personalInfo.website && (
            <Text style={styles.contactItem}>Website: {data.personalInfo.website}</Text>
          )}
        </View>
      </View>
      
      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </View>
      )}
      
      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp.position}</Text>
              <Text style={styles.company}>{exp.company}{exp.location ? ` | ${exp.location}` : ''}</Text>
              <Text style={styles.dates}>
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
              <Text style={styles.company}>
                {edu.school}{edu.location ? ` | ${edu.location}` : ''}
              </Text>
              <Text style={styles.dates}>
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
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill}</Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default ModernTemplate;
