import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Auth
    'login': 'Login',
    'username': 'Username',
    'password': 'Password',
    'welcomeBack': 'Welcome Back',
    'loginToContinue': 'Login to continue to PeerReview Platform',
    
    // Navigation
    'dashboard': 'Dashboard',
    'users': 'Users',
    'questions': 'Questions',
    'assignments': 'Assignments',
    'myAnswers': 'My Answers',
    'survey': 'Survey',
    'scoring': 'Answer Scoring',
    'lookups': 'Lookups',
    'settings': 'Settings',
    'logout': 'Logout',
    
    // Dashboard
    'totalUsers': 'Total Users',
    'totalQuestions': 'Total Questions',
    'totalAnswers': 'Total Answers',
    'assignedToMe': 'Assigned to Me',
    'recentAnswers': 'Recent Answers',
    'myScoringActivity': 'My Scoring Activity',
    
    // Users
    'usersList': 'Users List',
    'addUser': 'Add User',
    'createUser': 'Create User',
    'editUser': 'Edit User',
    'fullName': 'Full Name',
    'email': 'Email',
    'role': 'Role',
    'status': 'Status',
    'actions': 'Actions',
    'active': 'Active',
    'inactive': 'Inactive',
    'search': 'Search',
    'save': 'Save',
    'cancel': 'Cancel',
    'edit': 'Edit',
    'delete': 'Delete',
    'activate': 'Activate',
    'deactivate': 'Deactivate',
    'view': 'View',
    
    // Questions
    'questionsList': 'Questions List',
    'addQuestion': 'Add Question',
    'createQuestion': 'Create Question',
    'editQuestion': 'Edit Question',
    'title': 'Title',
    'titleArabic': 'Title (Arabic)',
    'titleEnglish': 'Title (English)',
    'description': 'Description',
    'questionType': 'Question Type',
    'itemsCount': 'Items Count',
    'questionInfo': 'Question Information',
    'questionItems': 'Question Items',
    'addOption': 'Add Option',
    
    // Assignments
    'assignmentsList': 'Assignments',
    'assignedForms': 'Assigned Forms',
    'assignNew': 'Assign New',
    'remove': 'Remove',
    'assignedFormsCount': 'forms assigned',
    
    // Answers
    'myAnswersList': 'My Answers',
    'submittedDate': 'Submitted Date',
    'viewDetails': 'View Details',
    
    // Survey
    'step': 'Step',
    'of': 'of',
    'previous': 'Previous',
    'next': 'Next',
    'submit': 'Submit',
    'thankYou': 'Thank you for your submission!',
    
    // Scoring
    'answerScoring': 'Answer Scoring',
    'needsScoring': 'Needs Scoring',
    'totalAnswers': 'Total Answers',
    'scoredCount': 'Scored',
    'unscoredCount': 'Unscored',
    'userAnswer': 'User Answer',
    'score': 'Score',
    'notes': 'Notes',
    'saveAndNext': 'Save & Next',
    'skip': 'Skip',
    
    // Lookups
    'roles': 'Roles',
    'questionTypes': 'Question Types',
    'categories': 'Categories',
    'subLookups': 'Sub Lookups',
    'addNew': 'Add New',
    'name': 'Name',
    
    // Settings
    'generalSettings': 'General Settings',
    'theme': 'Theme',
    'language': 'Language',
    'darkMode': 'Dark Mode',
    'lightMode': 'Light Mode',
    'profileInfo': 'Profile Information',
    'notifications': 'Notifications',
    'emailNotifications': 'Email Notifications',
    'pushNotifications': 'Push Notifications',
    'saveChanges': 'Save Changes',
    'security': 'Security',
    'currentPassword': 'Current Password',
    'newPassword': 'New Password',
    'confirmPassword': 'Confirm Password',
    'updatePassword': 'Update Password',
  },
  ar: {
    // Auth
    'login': 'تسجيل الدخول',
    'username': 'اسم المستخدم',
    'password': 'كلمة المرور',
    'welcomeBack': 'مرحباً بعودتك',
    'loginToContinue': 'سجل دخولك للوصول إلى منصة المراجعة',
    
    // Navigation
    'dashboard': 'لوحة التحكم',
    'users': 'المستخدمون',
    'questions': 'الأسئلة',
    'assignments': 'التعيينات',
    'myAnswers': 'إجاباتي',
    'survey': 'الاستبيان',
    'scoring': 'تقييم الإجابات',
    'lookups': 'البيانات المرجعية',
    'settings': 'الإعدادات',
    'logout': 'تسجيل الخروج',
    
    // Dashboard
    'totalUsers': 'إجمالي المستخدمين',
    'totalQuestions': 'إجمالي الأسئلة',
    'totalAnswers': 'إجمالي الإجابات',
    'assignedToMe': 'المعينة لي',
    'recentAnswers': 'الإجابات الأخيرة',
    'myScoringActivity': 'نشاط التقييم الخاص بي',
    
    // Users
    'usersList': 'قائمة المستخدمين',
    'addUser': 'إضافة مستخدم',
    'createUser': 'إنشاء مستخدم',
    'editUser': 'تعديل مستخدم',
    'fullName': 'الاسم الكامل',
    'email': 'البريد الإلكتروني',
    'role': 'الدور',
    'status': 'الحالة',
    'actions': 'الإجراءات',
    'active': 'نشط',
    'inactive': 'غير نشط',
    'search': 'بحث',
    'save': 'حفظ',
    'cancel': 'إلغاء',
    'edit': 'تعديل',
    'delete': 'حذف',
    'activate': 'تفعيل',
    'deactivate': 'إلغاء التفعيل',
    'view': 'عرض',
    
    // Questions
    'questionsList': 'قائمة الأسئلة',
    'addQuestion': 'إضافة سؤال',
    'createQuestion': 'إنشاء سؤال',
    'editQuestion': 'تعديل سؤال',
    'title': 'العنوان',
    'titleArabic': 'العنوان (عربي)',
    'titleEnglish': 'العنوان (إنجليزي)',
    'description': 'الوصف',
    'questionType': 'نوع السؤال',
    'itemsCount': 'عدد العناصر',
    'questionInfo': 'معلومات السؤال',
    'questionItems': 'عناصر السؤال',
    'addOption': 'إضافة خيار',
    
    // Assignments
    'assignmentsList': 'التعيينات',
    'assignedForms': 'النماذج المعينة',
    'assignNew': 'تعيين جديد',
    'remove': 'إزالة',
    'assignedFormsCount': 'نموذج معين',
    
    // Answers
    'myAnswersList': 'إجاباتي',
    'submittedDate': 'تاريخ التقديم',
    'viewDetails': 'عرض التفاصيل',
    
    // Survey
    'step': 'خطوة',
    'of': 'من',
    'previous': 'السابق',
    'next': 'التالي',
    'submit': 'إرسال',
    'thankYou': 'شكراً لك على المشاركة!',
    
    // Scoring
    'answerScoring': 'تقييم الإجابات',
    'needsScoring': 'بحاجة للتقييم',
    'totalAnswers': 'إجمالي الإجابات',
    'scoredCount': 'تم تقييمها',
    'unscoredCount': 'غير مقيمة',
    'userAnswer': 'إجابة المستخدم',
    'score': 'النقاط',
    'notes': 'ملاحظات',
    'saveAndNext': 'حفظ والتالي',
    'skip': 'تخطي',
    
    // Lookups
    'roles': 'الأدوار',
    'questionTypes': 'أنواع الأسئلة',
    'categories': 'التصنيفات',
    'subLookups': 'البيانات الفرعية',
    'addNew': 'إضافة جديد',
    'name': 'الاسم',
    
    // Settings
    'generalSettings': 'الإعدادات العامة',
    'theme': 'المظهر',
    'language': 'اللغة',
    'darkMode': 'الوضع الداكن',
    'lightMode': 'الوضع الفاتح',
    'profileInfo': 'معلومات الملف الشخصي',
    'notifications': 'الإشعارات',
    'emailNotifications': 'إشعارات البريد الإلكتروني',
    'pushNotifications': 'الإشعارات الفورية',
    'saveChanges': 'حفظ التغييرات',
    'security': 'الأمان',
    'currentPassword': 'كلمة المرور الحالية',
    'newPassword': 'كلمة المرور الجديدة',
    'confirmPassword': 'تأكيد كلمة المرور',
    'updatePassword': 'تحديث كلمة المرور',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}