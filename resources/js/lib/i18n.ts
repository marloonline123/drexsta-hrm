import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
    en: {
        translation: {
            // Navigation
            nav: {
                dashboard: 'Dashboard',
                hrm: 'HRM',
                employees: 'Employees',
                departments: 'Departments',
                attendance: 'Attendance',
                payroll: 'Payroll',
                leaves: 'Leaves',
                settings: 'Settings',
                profile: 'Profile',
                logout: 'Logout',
                changeBranch: 'Change Branch',
                admin: 'Admin Management',
                security: 'Security Guards',
                banks: 'Banks',
                employmentTypes: 'Employment Types',
                jobTitles: 'Job Titles',
                designations: 'Designations',
                billing: 'Billing',
                subscriptions: 'Subscriptions',
                companies: 'Companies',
                roles: 'Roles & Permissions'
            },
            // Companies
            companies: {
                title: 'Company Management',
                description: 'Manage your organization companies and their settings',
                addCompany: 'Add Company',
                editCompany: 'Edit Company',
                deleteCompany: 'Delete Company',
                viewCompany: 'View Company',
                companyName: 'Company Name',
                companySize: 'Company Size',
                industry: 'Industry',
                address: 'Address',
                phone: 'Phone',
                email: 'Email',
                website: 'Website',
                taxId: 'Tax ID',
                establishedDate: 'Established Date',
                status: 'Status',
                active: 'Active',
                inactive: 'Inactive',
                totalCompanies: 'Total Companies',
                activeCompanies: 'Active Companies',
                employeesCount: 'Employees',
                noCompanies: 'No companies found',
                createFirst: 'Create your first company to get started',
                confirmDelete: 'Are you sure you want to delete this company?',
                deleteWarning: 'This action cannot be undone.',
                companyDetails: 'Company Details',
                basicInfo: 'Basic Information',
                contactInfo: 'Contact Information',
                businessInfo: 'Business Information',
                // Form specific translations
                createCompany: 'Create New Company',
                editCompanyTitle: 'Edit Company',
                addNewCompany: 'Add a new company to your organization',
                updateCompanyInfo: 'Update company information for',
                companyNameRequired: 'Company Name',
                companyNamePlaceholder: 'Enter company name',
                industryRequired: 'Industry',
                industryPlaceholder: 'e.g., Technology, Healthcare, Finance',
                emailPlaceholder: 'company@example.com',
                phonePlaceholder: '+1 (555) 000-0000',
                addressPlaceholder: 'Enter company address',
                descriptionPlaceholder: 'Brief description about the company',
                companyLogo: 'Company Logo',
                uploadLogo: 'Upload Logo',
                changeLogo: 'Change Logo',
                logoDescription: 'Accepted formats: PNG, JPG, JPEG (Max size: 5MB)',
                companyStatus: 'Company Status',
                companyStatusDescription: 'Set whether this company is active or inactive',
                saving: 'Saving...',
                creating: 'Creating...',
                updating: 'Updating...',
                saveCompanyButton: 'Save Company',
                createCompanyButton: 'Create Company',
                updateCompanyButton: 'Update Company'
            },
            // Billing
            billing: {
                title: 'Billing & Payments',
                description: 'Manage your subscription, payment methods, and billing history',
                currentPlan: 'Current Plan',
                nextBilling: 'Next billing date',
                amount: 'Amount',
                paymentMethods: 'Payment Methods',
                addPaymentMethod: 'Add Payment Method',
                cardNumber: 'Card Number',
                expiryDate: 'Expiry Date',
                cvv: 'CVV',
                cardholderName: 'Cardholder Name',
                billingHistory: 'Billing History',
                invoices: 'Recent Invoices',
                downloadInvoice: 'Download Invoice',
                totalDue: 'Total Due'
            },
            // Subscriptions
            subscriptions: {
                title: 'Choose Your Plan',
                description: 'Select the perfect plan for your organization',
                monthly: 'Monthly',
                annual: 'Annual',
                save: 'Save up to 20%',
                currentPlan: 'Current Plan',
                upgrade: 'Upgrade',
                downgrade: 'Downgrade',
                mostPopular: 'Most Popular',
                perMonth: '/month',
                perYear: '/year',
                confirmChange: 'Confirm Plan Change',
                newPlan: 'New Plan',
                effective: 'Effective'
            },
            // Settings
            settings: {
                appearance: 'Appearance',
                language: 'Language',
                light: 'Light',
                dark: 'Dark',
                system: 'System'
            },
            // Chat
            chat: {
                messages: 'Messages',
                chatWith: 'Chat with your team members',
                searchConversations: 'Search conversations...',
                recent: 'RECENT',
                teamMembers: 'TEAM MEMBERS',
                typeMessage: 'Type a message...',
                online: 'online',
                away: 'away',
                offline: 'offline',
                lastSeen: 'Last seen'
            },
            // Admin
            admin: {
                employmentTypes: {
                    title: 'Employment Types',
                    description: 'Manage different employment types and their configurations',
                    addType: 'Add Employment Type',
                    typeName: 'Type Name',
                    hoursPerWeek: 'Hours per Week',
                    benefits: 'Benefits',
                    included: 'Included',
                    notIncluded: 'Not Included'
                },
                jobTitles: {
                    title: 'Job Titles',
                    description: 'Manage job titles and their configurations',
                    addTitle: 'Add Job Title',
                    titleName: 'Title Name',
                    description: 'Description'
                },
                security: {
                    title: 'Security Guards',
                    description: 'Manage security personnel and monitor their status',
                    addGuard: 'Add Security Guard',
                    badgeNumber: 'Badge Number',
                    shift: 'Shift',
                    location: 'Location',
                    onDuty: 'On Duty',
                    offDuty: 'Off Duty',
                    onBreak: 'On Break'
                },
                roles: {
                    title: 'Roles & Permissions',
                    description: 'Manage system roles and assign permissions to control access',
                    addRole: 'Add Role',
                    editRole: 'Edit Role',
                    deleteRole: 'Delete Role',
                    viewRole: 'View Role',
                    roleName: 'Role Name',
                    roleDescription: 'Description',
                    permissions: 'Permissions',
                    assignPermissions: 'Assign Permissions',
                    selectPermissions: 'Select Permissions',
                    noPermissions: 'No permissions assigned',
                    confirmDelete: 'Are you sure you want to delete this role?',
                    deleteWarning: 'This action cannot be undone and will affect all users with this role.',
                    permissionCategories: {
                        users: 'User Management',
                        roles: 'Role Management',
                        companies: 'Company Management',
                        employees: 'Employee Management',
                        attendance: 'Attendance Management',
                        payroll: 'Payroll Management',
                        reports: 'Reports & Analytics',
                        settings: 'System Settings'
                    },
                    permissionActions: {
                        view: 'View',
                        create: 'Create',
                        edit: 'Edit',
                        delete: 'Delete',
                        manage: 'Manage'
                    }
                },
                users: {
                    title: 'Admin Management',
                    description: 'Manage system administrators and their access permissions',
                    addAdmin: 'Add Admin User',
                    role: 'Role',
                    permissions: 'Permissions',
                    twoFactor: 'Enable Two-Factor Authentication',
                    superAdmin: 'Super Admin',
                    hrAdmin: 'HR Admin',
                    financeAdmin: 'Finance Admin',
                    itAdmin: 'IT Admin'
                }
            },
            // Landing Page
            landing: {
                heroTitle: 'Modern HR Management for Growing Teams',
                heroSubtitle: 'Streamline your HR processes with our comprehensive SaaS solution. Manage employees, payroll, attendance, and more.',
                startFreeTrial: 'Start Free Trial',
                subscribe: 'Subscribe Now',
                features: 'Features',
                pricing: 'Pricing',
                about: 'About',
                contact: 'Contact',
                testimonials: 'What Our Customers Say',
                whyChooseUs: 'Why Choose Us',
                getStarted: 'Get Started Today'
            },
            // Features
            features: {
                hrManagement: 'HR Management',
                hrManagementDesc: 'Complete employee lifecycle management',
                payrollSystem: 'Payroll System',
                payrollSystemDesc: 'Automated payroll processing and calculations',
                attendance: 'Attendance Tracking',
                attendanceDesc: 'Real-time attendance monitoring and reporting',
                leaveManagement: 'Leave Management',
                leaveManagementDesc: 'Streamlined leave requests and approvals',
                aiAssistance: 'AI Assistance',
                aiAssistanceDesc: 'Smart insights and automated recommendations',
                reporting: 'Advanced Reporting',
                reportingDesc: 'Comprehensive analytics and insights'
            },
            // Pricing
            pricing: {
                freeTrial: 'Free Trial',
                pro: 'Professional',
                proPlus: 'Pro+',
                monthly: 'Monthly',
                yearly: 'Yearly',
                save20: 'Save 20%',
                perMonth: '/month',
                perYear: '/year',
                mostPopular: 'Most Popular',
                choosePlan: 'Choose Plan',
                features: 'Features included:'
            },
            // Authentication
            auth: {
                login: 'Login',
                register: 'Register',
                forgotPassword: 'Forgot Password',
                email: 'Email',
                password: 'Password',
                confirmPassword: 'Confirm Password',
                rememberMe: 'Remember Me',
                dontHaveAccount: "Don't have an account?",
                alreadyHaveAccount: 'Already have an account?',
                resetPassword: 'Reset Password',
                sendResetLink: 'Send Reset Link',
                loginWithGoogle: 'Login with Google',
                loginWithMicrosoft: 'Login with Microsoft'
            },
            // Dashboard
            dashboard: {
                welcome: 'Welcome back',
                totalEmployees: 'Total Employees',
                activeEmployees: 'Active Employees',
                pendingLeaves: 'Pending Leaves',
                monthlyPayroll: 'Monthly Payroll',
                recentActivities: 'Recent Activities',
                quickActions: 'Quick Actions',
                addEmployee: 'Add Employee',
                processPayroll: 'Process Payroll',
                viewReports: 'View Reports'
            },
            // Common
            common: {
                save: 'Save',
                cancel: 'Cancel',
                delete: 'Delete',
                edit: 'Edit',
                add: 'Add',
                search: 'Search',
                filter: 'Filter',
                export: 'Export',
                import: 'Import',
                loading: 'Loading...',
                noData: 'No data available',
                success: 'Success',
                error: 'Error',
                warning: 'Warning',
                info: 'Information',
                close: 'Close',
                next: 'Next',
                previous: 'Previous',
                submit: 'Submit',
                reset: 'Reset',
                view: 'View',
                create: 'Create',
                update: 'Update',
                confirm: 'Confirm',
                confirmDelete: 'Confirm Delete',
                deleteWarning: 'This action cannot be undone. Are you sure you want to proceed?'
            }
        }
    },
    ar: {
        translation: {
            // Common
            common: {
                actions: 'الإجراءات',
                create: 'إنشاء',
                edit: 'تعديل',
                delete: 'حذف',
                view: 'عرض',
                save: 'حفظ',
                cancel: 'إلغاء',
                close: 'إغلاق',
                update: 'تحديث',
                search: 'بحث',
                filter: 'تصفية',
                loading: 'جارٍ التحميل...',
                noData: 'لا توجد بيانات متاحة',
                confirm: 'تأكيد',
                status: 'الحالة',
                active: 'نشط',
                inactive: 'غير نشط',
                name: 'الاسم',
                description: 'الوصف',
                createdAt: 'تاريخ الإنشاء',
                updatedAt: 'تاريخ التحديث',
                add: 'إضافة',
                export: 'تصدير',
                import: 'استيراد',
                success: 'نجح',
                error: 'خطأ',
                warning: 'تحذير',
                info: 'معلومات',
                next: 'التالي',
                previous: 'السابق',
                submit: 'إرسال',
                reset: 'إعادة تعيين',
                confirmDelete: 'تأكيد الحذف',
                deleteWarning: 'لا يمكن التراجع عن هذا الإجراء. هل أنت متأكد من رغبتك في المتابعة؟'
            },
            // Navigation
            nav: {
                dashboard: 'لوحة التحكم',
                hrm: 'إدارة الموارد البشرية',
                employees: 'الموظفين',
                departments: 'الأقسام',
                attendance: 'الحضور',
                payroll: 'كشوف المرتبات',
                leaves: 'الإجازات',
                settings: 'الإعدادات',
                profile: 'الملف الشخصي',
                logout: 'تسجيل الخروج',
                changeBranch: 'تغيير الفرع',
                admin: 'إدارة المسؤولين',
                security: 'حراس الأمن',
                banks: 'البنوك',
                employmentTypes: 'أنواع التوظيف',
                jobTitles: 'المسميات الوظيفية',
                designations: 'المسميات الوظيفية',
                billing: 'الفواتير',
                subscriptions: 'الاشتراكات',
                companies: 'الشركات',
                roles: 'الأدوار والصلاحيات'
            },
            // Companies
            companies: {
                title: 'إدارة الشركات',
                description: 'إدارة شركات مؤسستك وإعداداتها',
                addCompany: 'إضافة شركة',
                editCompany: 'تعديل الشركة',
                deleteCompany: 'حذف الشركة',
                viewCompany: 'عرض الشركة',
                companyName: 'اسم الشركة',
                companySize: 'حجم الشركة',
                industry: 'القطاع',
                address: 'العنوان',
                phone: 'الهاتف',
                email: 'البريد الإلكتروني',
                website: 'الموقع الإلكتروني',
                taxId: 'الرقم الضريبي',
                establishedDate: 'تاريخ التأسيس',
                status: 'الحالة',
                active: 'نشط',
                inactive: 'غير نشط',
                totalCompanies: 'إجمالي الشركات',
                activeCompanies: 'الشركات النشطة',
                employeesCount: 'الموظفين',
                noCompanies: 'لم يتم العثور على شركات',
                createFirst: 'أنشئ أول شركة للبدء',
                confirmDelete: 'هل أنت متأكد من حذف هذه الشركة؟',
                deleteWarning: 'لا يمكن التراجع عن هذا الإجراء.',
                companyDetails: 'تفاصيل الشركة',
                basicInfo: 'المعلومات الأساسية',
                contactInfo: 'معلومات الاتصال',
                businessInfo: 'معلومات العمل',
                // Form specific translations
                createCompany: 'إنشاء شركة جديدة',
                editCompanyTitle: 'تعديل الشركة',
                addNewCompany: 'إضافة شركة جديدة إلى مؤسستك',
                updateCompanyInfo: 'تحديث معلومات الشركة لـ',
                companyNameRequired: 'اسم الشركة',
                companyNamePlaceholder: 'أدخل اسم الشركة',
                industryRequired: 'القطاع',
                industryPlaceholder: 'مثال: التكنولوجيا، الرعاية الصحية، المالية',
                emailPlaceholder: 'company@example.com',
                phonePlaceholder: '+966 50 000 0000',
                addressPlaceholder: 'أدخل عنوان الشركة',
                descriptionPlaceholder: 'وصف مختصر عن الشركة',
                companyLogo: 'شعار الشركة',
                uploadLogo: 'رفع الشعار',
                changeLogo: 'تغيير الشعار',
                logoDescription: 'الصيغ المقبولة: PNG، JPG، JPEG (الحد الأقصى: 5 ميجابايت)',
                companyStatus: 'حالة الشركة',
                companyStatusDescription: 'تحديد ما إذا كانت هذه الشركة نشطة أم غير نشطة',
                saving: 'جاري الحفظ...',
                creating: 'جاري الإنشاء...',
                updating: 'جاري التحديث...',
                saveCompanyButton: 'حفظ الشركة',
                createCompanyButton: 'إنشاء الشركة',
                updateCompanyButton: 'تحديث الشركة'
            },
            // Billing
            billing: {
                title: 'الفواتير والمدفوعات',
                description: 'إدارة اشتراكك وطرق الدفع وتاريخ الفواتير',
                currentPlan: 'الخطة الحالية',
                nextBilling: 'تاريخ الفاتورة التالية',
                amount: 'المبلغ',
                paymentMethods: 'طرق الدفع',
                addPaymentMethod: 'إضافة طريقة دفع',
                cardNumber: 'رقم البطاقة',
                expiryDate: 'تاريخ الانتهاء',
                cvv: 'رمز الأمان',
                cardholderName: 'اسم حامل البطاقة',
                billingHistory: 'تاريخ الفواتير',
                invoices: 'الفواتير الحديثة',
                downloadInvoice: 'تحميل الفاتورة',
                totalDue: 'إجمالي المستحق'
            },
            // Subscriptions
            subscriptions: {
                title: 'اختر خطتك',
                description: 'اختر الخطة المثالية لمؤسستك',
                monthly: 'شهري',
                annual: 'سنوي',
                save: 'وفر حتى 20%',
                currentPlan: 'الخطة الحالية',
                upgrade: 'ترقية',
                downgrade: 'تخفيض',
                mostPopular: 'الأكثر شعبية',
                perMonth: '/شهر',
                perYear: '/سنة',
                confirmChange: 'تأكيد تغيير الخطة',
                newPlan: 'الخطة الجديدة',
                effective: 'سارية المفعول'
            },
            // Settings
            settings: {
                appearance: 'المظهر',
                language: 'اللغة',
                light: 'فاتح',
                dark: 'داكن',
                system: 'النظام'
            },
            // Chat
            chat: {
                messages: 'الرسائل',
                chatWith: 'تحدث مع أعضاء فريقك',
                searchConversations: 'البحث في المحادثات...',
                recent: 'الحديثة',
                teamMembers: 'أعضاء الفريق',
                typeMessage: 'اكتب رسالة...',
                online: 'متصل',
                away: 'غائب',
                offline: 'غير متصل',
                lastSeen: 'آخر ظهور'
            },
            // Admin
            admin: {
                employmentTypes: {
                    title: 'أنواع التوظيف',
                    description: 'إدارة أنواع التوظيف المختلفة وتكويناتها',
                    addType: 'إضافة نوع توظيف',
                    typeName: 'اسم النوع',
                    hoursPerWeek: 'ساعات في الأسبوع',
                    benefits: 'المزايا',
                    included: 'مشمولة',
                    notIncluded: 'غير مشمولة'
                },
                jobTitles: {
                    title: 'المسميات الوظيفية',
                    description: 'إدارة المسميات الوظيفية وتكويناتها',
                    addTitle: 'إضافة مسمى وظيفي',
                    titleName: 'اسم المسمى',
                    description: 'الوصف'
                },
                security: {
                    title: 'حراس الأمن',
                    description: 'إدارة أفراد الأمن ومراقبة حالتهم',
                    addGuard: 'إضافة حارس أمن',
                    badgeNumber: 'رقم الشارة',
                    shift: 'المناوبة',
                    location: 'الموقع',
                    onDuty: 'في الخدمة',
                    offDuty: 'خارج الخدمة',
                    onBreak: 'في استراحة'
                },
                roles: {
                    title: 'الأدوار والصلاحيات',
                    description: 'إدارة أدوار النظام وتعيين الصلاحيات للتحكم في الوصول',
                    addRole: 'إضافة دور',
                    editRole: 'تعديل الدور',
                    deleteRole: 'حذف الدور',
                    viewRole: 'عرض الدور',
                    roleName: 'اسم الدور',
                    roleDescription: 'الوصف',
                    permissions: 'الصلاحيات',
                    assignPermissions: 'تعيين الصلاحيات',
                    selectPermissions: 'اختيار الصلاحيات',
                    noPermissions: 'لم يتم تعيين صلاحيات',
                    confirmDelete: 'هل أنت متأكد من حذف هذا الدور؟',
                    deleteWarning: 'لا يمكن التراجع عن هذا الإجراء وسيؤثر على جميع المستخدمين الذين يملكون هذا الدور.',
                    permissionCategories: {
                        users: 'إدارة المستخدمين',
                        roles: 'إدارة الأدوار',
                        companies: 'إدارة الشركات',
                        employees: 'إدارة الموظفين',
                        attendance: 'إدارة الحضور',
                        payroll: 'إدارة كشوف المرتبات',
                        reports: 'التقارير والتحليلات',
                        settings: 'إعدادات النظام'
                    },
                    permissionActions: {
                        view: 'عرض',
                        create: 'إنشاء',
                        edit: 'تعديل',
                        delete: 'حذف',
                        manage: 'إدارة'
                    }
                },
                users: {
                    title: 'إدارة المسؤولين',
                    description: 'إدارة مسؤولي النظام وصلاحيات الوصول',
                    addAdmin: 'إضافة مستخدم مسؤول',
                    role: 'الدور',
                    permissions: 'الصلاحيات',
                    twoFactor: 'تفعيل المصادقة الثنائية',
                    superAdmin: 'مسؤول عام',
                    hrAdmin: 'مسؤول الموارد البشرية',
                    financeAdmin: 'مسؤول المالية',
                    itAdmin: 'مسؤول تقنية المعلومات'
                }
            },
            // Landing Page
            landing: {
                heroTitle: 'إدارة موارد بشرية حديثة للفرق النامية',
                heroSubtitle: 'قم بتبسيط عمليات الموارد البشرية مع حلولنا الشاملة. إدارة الموظفين وكشوف المرتبات والحضور والمزيد.',
                startFreeTrial: 'ابدأ التجربة المجانية',
                subscribe: 'اشترك الآن',
                features: 'الميزات',
                pricing: 'الأسعار',
                about: 'حولنا',
                contact: 'اتصل بنا',
                testimonials: 'ما يقوله عملاؤنا',
                whyChooseUs: 'لماذا تختارنا',
                getStarted: 'ابدأ اليوم'
            },
            // Features
            features: {
                hrManagement: 'إدارة الموارد البشرية',
                hrManagementDesc: 'إدارة شاملة لدورة حياة الموظف',
                payrollSystem: 'نظام كشوف المرتبات',
                payrollSystemDesc: 'معالجة آلية لكشوف المرتبات والحسابات',
                attendance: 'تتبع الحضور',
                attendanceDesc: 'مراقبة وإعداد تقارير الحضور في الوقت الفعلي',
                leaveManagement: 'إدارة الإجازات',
                leaveManagementDesc: 'طلبات الإجازة والموافقات المبسطة',
                aiAssistance: 'المساعدة الذكية',
                aiAssistanceDesc: 'رؤى ذكية وتوصيات آلية',
                reporting: 'التقارير المتقدمة',
                reportingDesc: 'تحليلات ورؤى شاملة'
            },
            // Pricing
            pricing: {
                freeTrial: 'تجربة مجانية',
                pro: 'المحترف',
                proPlus: 'المحترف+',
                monthly: 'شهري',
                yearly: 'سنوي',
                save20: 'وفر 20%',
                perMonth: '/شهر',
                perYear: '/سنة',
                mostPopular: 'الأكثر شعبية',
                choosePlan: 'اختر الخطة',
                features: 'الميزات المتضمنة:'
            },
            // Authentication
            auth: {
                login: 'تسجيل الدخول',
                register: 'التسجيل',
                forgotPassword: 'نسيت كلمة المرور',
                email: 'البريد الإلكتروني',
                password: 'كلمة المرور',
                confirmPassword: 'تأكيد كلمة المرور',
                rememberMe: 'تذكرني',
                dontHaveAccount: 'ليس لديك حساب؟',
                alreadyHaveAccount: 'لديك حساب بالفعل؟',
                resetPassword: 'إعادة تعيين كلمة المرور',
                sendResetLink: 'إرسال رابط الإعادة',
                loginWithGoogle: 'تسجيل الدخول بجوجل',
                loginWithMicrosoft: 'تسجيل الدخول بمايكروسوفت'
            },
            // Dashboard
            dashboard: {
                welcome: 'مرحباً بعودتك',
                totalEmployees: 'إجمالي الموظفين',
                activeEmployees: 'الموظفين النشطين',
                pendingLeaves: 'الإجازات المعلقة',
                monthlyPayroll: 'الراتب الشهري',
                recentActivities: 'الأنشطة الحديثة',
                quickActions: 'الإجراءات السريعة',
                addEmployee: 'إضافة موظف',
                processPayroll: 'معالجة كشوف المرتبات',
                viewReports: 'عرض التقارير'
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        lng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;