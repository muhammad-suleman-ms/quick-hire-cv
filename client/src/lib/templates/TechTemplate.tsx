import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ResumeData, ResumePDFProps } from '../utils/resume-pdf';

// TechTemplate Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: 20,
    color: 'white',
    marginBottom: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
    color: '#bdc3c7',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  contactItem: {
    fontSize: 10,
    marginRight: 15,
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 10,
    color: '#2c3e50',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingBottom: 5,
    textTransform: 'uppercase',
  },
  experienceItem: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    color: '#2c3e50',
  },
  company: {
    fontSize: 11,
    color: '#34495e',
    marginBottom: 3,
  },
  dates: {
    fontSize: 10,
    color: '#7f8c8d',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 10,
    color: '#2c3e50',
    lineHeight: 1.5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skillCategory: {
    width: '33%',
    marginBottom: 10,
  },
  skillCategoryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  skill: {
    fontSize: 10,
    marginBottom: 3,
    color: '#34495e',
  },
  summary: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#2c3e50',
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

export const TechTemplate = ({ data, isPremium, hasPremiumAccess }: ResumePDFProps) => {
  // Group skills by category for tech template (simulate categories)
  const groupedSkills = {
    'Programming': data.skills?.slice(0, Math.ceil(data.skills.length / 3)) || [],
    'Tools & Frameworks': data.skills?.slice(Math.ceil(data.skills.length / 3), Math.ceil(2 * data.skills.length / 3)) || [],
    'Other Skills': data.skills?.slice(Math.ceil(2 * data.skills.length / 3)) || [],
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {isPremium && !hasPremiumAccess && (
          <Text style={styles.watermark}>PREMIUM</Text>
        )}
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.firstName} {data.personalInfo.lastName}</Text>
          <Text style={styles.title}>
            {data.experience && data.experience.length > 0 ? data.experience[0].position : 'Software Engineer'}
          </Text>
          
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{data.personalInfo.email}</Text>
            <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>
            {data.personalInfo.linkedIn && (
              <Text style={styles.contactItem}>LinkedIn: {data.personalInfo.linkedIn}</Text>
            )}
            {data.personalInfo.website && (
              <Text style={styles.contactItem}>Website: {data.personalInfo.website}</Text>
            )}
            {data.personalInfo.address && (
              <Text style={styles.contactItem}>{data.personalInfo.address}</Text>
            )}
          </View>
        </View>
        
        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Profile</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        )}
        
        {/* Skills with categories */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <View style={styles.skillsContainer}>
              {Object.entries(groupedSkills).map(([category, skills]) => (
                <View key={category} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>{category}</Text>
                  {skills.map((skill, index) => (
                    <Text key={index} style={styles.skill}>• {skill}</Text>
                  ))}
                </View>
              ))}
            </View>
          </View>
        )}
        
        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
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
      </Page>
    </Document>
  );
};

export default TechTemplate;
