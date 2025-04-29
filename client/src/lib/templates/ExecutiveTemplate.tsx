import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData, ResumePDFProps } from '../utils/resume-pdf';

// ExecutiveTemplate Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 50,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1a1a1a',
    fontFamily: 'Helvetica-Bold',
  },
  title: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555555',
  },
  contactRow: {
    flexDirection: 'row',
    marginTop: 5,
    fontSize: 10,
    color: '#444444',
  },
  contactItem: {
    marginRight: 15,
  },
  contactLabel: {
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: '#1a1a1a',
    marginVertical: 15,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a1a',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
  },
  experienceItem: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#1a1a1a',
  },
  company: {
    fontSize: 12,
    marginBottom: 3,
    color: '#333333',
  },
  dates: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 11,
    color: '#444444',
    lineHeight: 1.5,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skillsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    fontSize: 11,
    marginRight: 20,
    marginBottom: 3,
    color: '#333333',
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#333333',
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

export const ExecutiveTemplate = ({ data, isPremium, hasPremiumAccess }: ResumePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {isPremium && !hasPremiumAccess && (
        <Text style={styles.watermark}>PREMIUM</Text>
      )}
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
        <Text style={styles.title}>
          {data.experience && data.experience.length > 0 ? data.experience[0].position : 'Executive Professional'}
        </Text>
        
        <View style={styles.contactRow}>
          {data.personalInfo.email && (
            <Text style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email: </Text>
              {data.personalInfo.email}
            </Text>
          )}
          
          {data.personalInfo.phone && (
            <Text style={styles.contactItem}>
              <Text style={styles.contactLabel}>Phone: </Text>
              {data.personalInfo.phone}
            </Text>
          )}
        </View>
        
        <View style={styles.contactRow}>
          {data.personalInfo.linkedIn && (
            <Text style={styles.contactItem}>
              <Text style={styles.contactLabel}>LinkedIn: </Text>
              {data.personalInfo.linkedIn}
            </Text>
          )}
          
          {data.personalInfo.website && (
            <Text style={styles.contactItem}>
              <Text style={styles.contactLabel}>Website: </Text>
              {data.personalInfo.website}
            </Text>
          )}
        </View>
        
        {data.personalInfo.address && (
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>
              <Text style={styles.contactLabel}>Address: </Text>
              {data.personalInfo.address}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.divider} />
      
      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
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
              <Text style={styles.company}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</Text>
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
                {edu.school}{edu.location ? `, ${edu.location}` : ''}
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
          <Text style={styles.sectionTitle}>Core Competencies</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>• {skill}</Text>
            ))}
          </View>
        </View>
      )}
      
      <View style={styles.divider} />
    </Page>
  </Document>
);

export default ExecutiveTemplate;
