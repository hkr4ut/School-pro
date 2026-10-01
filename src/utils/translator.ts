import type { TranslationEntry } from '../types';

// ============================================================
// Mock Translation Dictionary — Nepali ↔ English
// Academic terms and common phrases
// ============================================================

export const translationDictionary: TranslationEntry[] = [
  // Academic terms
  { english: 'University', nepali: 'विश्वविद्यालय', category: 'Academic' },
  { english: 'College', nepali: 'कलेज', category: 'Academic' },
  { english: 'Student', nepali: 'विद्यार्थी', category: 'Academic' },
  { english: 'Teacher', nepali: 'शिक्षक', category: 'Academic' },
  { english: 'Professor', nepali: 'प्राध्यापक', category: 'Academic' },
  { english: 'Course', nepali: 'पाठ्यक्रम', category: 'Academic' },
  { english: 'Semester', nepali: 'सेमेस्टर', category: 'Academic' },
  { english: 'Examination', nepali: 'परीक्षा', category: 'Academic' },
  { english: 'Assignment', nepali: 'कार्यभार', category: 'Academic' },
  { english: 'Homework', nepali: 'गृहकार्य', category: 'Academic' },
  { english: 'Result', nepali: 'नतिजा', category: 'Academic' },
  { english: 'Grade', nepali: 'ग्रेड', category: 'Academic' },
  { english: 'Marks', nepali: 'अंक', category: 'Academic' },
  { english: 'Pass', nepali: 'उत्तीर्ण', category: 'Academic' },
  { english: 'Fail', nepali: 'अनुत्तीर्ण', category: 'Academic' },
  { english: 'Scholarship', nepali: 'छात्रवृत्ति', category: 'Academic' },
  { english: 'Degree', nepali: 'उपाधि', category: 'Academic' },
  { english: 'Certificate', nepali: 'प्रमाणपत्र', category: 'Academic' },
  { english: 'Lecture', nepali: 'व्याख्यान', category: 'Academic' },
  { english: 'Syllabus', nepali: 'पाठ्यक्रम', category: 'Academic' },
  { english: 'Library', nepali: 'पुस्तकालय', category: 'Academic' },
  { english: 'Laboratory', nepali: 'प्रयोगशाला', category: 'Academic' },
  { english: 'Research', nepali: 'अनुसन्धान', category: 'Academic' },
  { english: 'Thesis', nepali: 'शोधपत्र', category: 'Academic' },
  { english: 'Graduation', nepali: 'स्नातक', category: 'Academic' },
  { english: 'Enrollment', nepali: 'भर्ना', category: 'Academic' },
  { english: 'Attendance', nepali: 'उपस्थिति', category: 'Academic' },
  { english: 'Department', nepali: 'विभाग', category: 'Academic' },
  { english: 'Faculty', nepali: 'संकाय', category: 'Academic' },
  { english: 'Campus', nepali: 'क्याम्पस', category: 'Academic' },

  // Computer Science terms
  { english: 'Computer', nepali: 'कम्प्युटर', category: 'Computer Science' },
  { english: 'Programming', nepali: 'प्रोग्रामिङ', category: 'Computer Science' },
  { english: 'Software', nepali: 'सफ्टवेयर', category: 'Computer Science' },
  { english: 'Hardware', nepali: 'हार्डवेयर', category: 'Computer Science' },
  { english: 'Database', nepali: 'डाटाबेस', category: 'Computer Science' },
  { english: 'Network', nepali: 'नेटवर्क', category: 'Computer Science' },
  { english: 'Algorithm', nepali: 'एल्गोरिदम', category: 'Computer Science' },
  { english: 'Data Structure', nepali: 'डाटा संरचना', category: 'Computer Science' },
  { english: 'Web Development', nepali: 'वेब विकास', category: 'Computer Science' },
  { english: 'Artificial Intelligence', nepali: 'कृत्रिम बुद्धिमत्ता', category: 'Computer Science' },
  { english: 'Machine Learning', nepali: 'मेसिन लर्निङ', category: 'Computer Science' },
  { english: 'Cybersecurity', nepali: 'साइबर सुरक्षा', category: 'Computer Science' },
  { english: 'Operating System', nepali: 'अपरेटिङ सिस्टम', category: 'Computer Science' },
  { english: 'Internet', nepali: 'इन्टरनेट', category: 'Computer Science' },
  { english: 'Technology', nepali: 'प्रविधि', category: 'Computer Science' },

  // Common phrases
  { english: 'Good morning', nepali: 'शुभ प्रभात', category: 'Common Phrases' },
  { english: 'Thank you', nepali: 'धन्यवाद', category: 'Common Phrases' },
  { english: 'How are you?', nepali: 'तपाईंलाई कस्तो छ?', category: 'Common Phrases' },
  { english: 'What is your name?', nepali: 'तपाईंको नाम के हो?', category: 'Common Phrases' },
  { english: 'I am a student', nepali: 'म विद्यार्थी हुँ', category: 'Common Phrases' },
  { english: 'Where is the classroom?', nepali: 'कक्षाकोठा कहाँ छ?', category: 'Common Phrases' },
  { english: 'When is the exam?', nepali: 'परीक्षा कहिले हो?', category: 'Common Phrases' },
  { english: 'Please help me', nepali: 'कृपया मलाई सहयोग गर्नुहोस्', category: 'Common Phrases' },
  { english: 'I understand', nepali: 'मैले बुझें', category: 'Common Phrases' },
  { english: 'I do not understand', nepali: 'मैले बुझिनँ', category: 'Common Phrases' },
  { english: 'Goodbye', nepali: 'नमस्ते', category: 'Common Phrases' },
  { english: 'Welcome', nepali: 'स्वागतम्', category: 'Common Phrases' },

  // Days & Time
  { english: 'Sunday', nepali: 'आइतबार', category: 'Days & Time' },
  { english: 'Monday', nepali: 'सोमबार', category: 'Days & Time' },
  { english: 'Tuesday', nepali: 'मंगलबार', category: 'Days & Time' },
  { english: 'Wednesday', nepali: 'बुधबार', category: 'Days & Time' },
  { english: 'Thursday', nepali: 'बिहीबार', category: 'Days & Time' },
  { english: 'Friday', nepali: 'शुक्रबार', category: 'Days & Time' },
  { english: 'Saturday', nepali: 'शनिबार', category: 'Days & Time' },
  { english: 'Today', nepali: 'आज', category: 'Days & Time' },
  { english: 'Tomorrow', nepali: 'भोलि', category: 'Days & Time' },
  { english: 'Yesterday', nepali: 'हिजो', category: 'Days & Time' },

  // Numbers
  { english: 'One', nepali: 'एक', category: 'Numbers' },
  { english: 'Two', nepali: 'दुई', category: 'Numbers' },
  { english: 'Three', nepali: 'तीन', category: 'Numbers' },
  { english: 'Four', nepali: 'चार', category: 'Numbers' },
  { english: 'Five', nepali: 'पाँच', category: 'Numbers' },
  { english: 'Six', nepali: 'छ', category: 'Numbers' },
  { english: 'Seven', nepali: 'सात', category: 'Numbers' },
  { english: 'Eight', nepali: 'आठ', category: 'Numbers' },
  { english: 'Nine', nepali: 'नौ', category: 'Numbers' },
  { english: 'Ten', nepali: 'दश', category: 'Numbers' },
];

/**
 * Simple mock translation function.
 * Looks up the input text in the dictionary and returns the translation.
 * If no exact match is found, attempts word-by-word translation.
 */
export function mockTranslate(
  text: string,
  direction: 'en-to-np' | 'np-to-en'
): string {
  if (!text.trim()) return '';

  const sourceKey = direction === 'en-to-np' ? 'english' : 'nepali';
  const targetKey = direction === 'en-to-np' ? 'nepali' : 'english';

  // Try exact match first (case-insensitive for English)
  const exactMatch = translationDictionary.find(
    (entry) =>
      entry[sourceKey].toLowerCase() === text.trim().toLowerCase()
  );
  if (exactMatch) return exactMatch[targetKey];

  // Try word-by-word translation
  const words = text.split(/\s+/);
  const translated = words.map((word) => {
    const match = translationDictionary.find(
      (entry) =>
        entry[sourceKey].toLowerCase() === word.toLowerCase()
    );
    return match ? match[targetKey] : word;
  });

  const result = translated.join(' ');

  // If nothing was translated, return a helpful message
  if (result === text) {
    return direction === 'en-to-np'
      ? 'अनुवाद उपलब्ध छैन (Translation not available)'
      : 'Translation not available';
  }

  return result;
}
