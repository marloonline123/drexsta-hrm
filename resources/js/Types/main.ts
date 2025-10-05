export interface AttendanceRecord {
  id: number;
  date: string;
  clock_in: string;
  clock_out: string;
  hours_worked: number;
  status: string;
}

export interface LeaveRecord {
  id: number;
  type: string;
  start_date: string;
  end_date: string;
  days: number;
  status: string;
  reason: string;
}

export interface PayslipRecord {
  id: number;
  period: string;
  gross_salary: number;
  net_salary: number;
  deductions: number;
  bonuses: number;
  payment_date: string;
  payment_method: string;
}

export interface LoanRecord {
  id: number;
  amount: number;
  remaining_amount: number;
  monthly_payment: number;
  status: string;
  created_at: string;
  next_payment_date: string | null;
}

export interface PaymentMethod {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
}

export interface UserPaymentData {
  id: number;
  payment_method_id: number;
  custom_details: Record<string, any>;
  is_active: boolean;
  paymentMethod?: PaymentMethod;
}

export interface PersonalStats {
  todayAttendance: AttendanceRecord | null;
  leaveBalance: Record<string, { used: number; total: number }>;
  monthlyHours: number;
  nextPayslip: {
    amount: number;
    date: string;
  } | null;
}

export interface QuickAction {
  title: string;
  url: string;
  icon: string;
}

export interface RecentActivity {
  type: string;
  description: string;
  date: string;
  status: string;
}

export interface RoleStats {
  department?: any;
  team?: any;
}

export interface DashboardProps {
  personalStats: PersonalStats;
  roleStats: RoleStats;
  recentActivities: RecentActivity[];
  quickActions: QuickAction[];
}

export interface AttendancePageProps {
  attendances: AttendanceRecord[];
  monthlySummary: {
    total_hours: number;
    total_days: number;
    attendance_rate: number;
  };
}

export interface LeavesPageProps {
  leaves: LeaveRecord[];
  leaveBalance: Record<string, { used: number; total: number }>;
}

export interface PayrollPageProps {
  payslips: PayslipRecord[];
}

export interface LoansPageProps {
  loans: LoanRecord[];
}

export interface ProfilePageProps {
  mustVerifyEmail: boolean;
  status: string | null;
  paymentMethods: PaymentMethod[];
  userPaymentData: UserPaymentData[];
}