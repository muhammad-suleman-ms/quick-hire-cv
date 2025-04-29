import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData, ResumePDFProps } from '../utils/resume-pdf';

// CreativeTemplate Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  sidebar: {
    width: '30%',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  content: {
    width: '70%',
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  contactSection: {
    marginBottom: 25,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  contactItem: {
    fontSize: 10,
    marginBottom: 5,
    color: '#444444',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 20,
  },
  sidebarSection: {
    marginBottom: 25,
  },
  experienceItem: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#333333',
  },
  company: {
    fontSize: 11,
    color: '#444444',
    marginBottom: 3,
  },
  dates: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 10,
    color: '#444444',
    lineHeight: 1.5,
  },
  skill: {
    fontSize: 10,
    marginBottom: 5,
    color: '#444444',
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#444444',
    marginBottom: 20,
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

export const CreativeTemplate = ({ data, isPremium, hasPremiumAccess }: ResumePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {isPremium && !hasPremiumAccess && (
        <Text style={styles.watermark}>PREMIUM</Text>
      )}
      
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.header}>
          <Text style={styles.name}>
            {data.personalInfo.firstName}{'\n'}
            {data.personalInfo.lastName}
          </Text>
          <Text style={styles.title}>
            {data.experience && data.experience.length > 0 ? data.experience[0].position : 'Professional'}
          </Text>
        </View>
        
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Contact</Text>
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
        
        {data.skills && data.skills.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.contactTitle}>Skills</Text>
            {data.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>• {skill}</Text>
            ))}
          </View>
        )}
        
        {data.education && data.education.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.contactTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 2 }}>
                  {edu.degree}
                </Text>
                <Text style={{ fontSize: 10 }}>{edu.school}</Text>
                <Text style={{ fontSize: 10, color: '#666666', fontStyle: 'italic' }}>
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
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
                <Text style={styles.company}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</Text>
                <Text style={styles.dates}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </Text>
                {exp.description && <Text style={styles.description}>{exp.description}</Text>}
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
);

export default CreativeTemplate;
