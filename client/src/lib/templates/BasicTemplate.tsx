import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData, ResumePDFProps } from '../utils/resume-pdf';

// BasicTemplate Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom: 2,
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 10,
    fontStyle: 'italic',
    marginBottom: 2,
  },
  description: {
    fontSize: 10,
    marginTop: 3,
    lineHeight: 1.4,
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
    padding: 3,
    borderRadius: 2,
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

export const BasicTemplate = ({ data, isPremium, hasPremiumAccess }: ResumePDFProps) => (
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
      
      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFESSIONAL SUMMARY</Text>
          <Text style={styles.description}>{data.summary}</Text>
        </View>
      )}
      
      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPERIENCE</Text>
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
          <Text style={styles.sectionTitle}>EDUCATION</Text>
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
          <Text style={styles.sectionTitle}>SKILLS</Text>
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

export default BasicTemplate;
