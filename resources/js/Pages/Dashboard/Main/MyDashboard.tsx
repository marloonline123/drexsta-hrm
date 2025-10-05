import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { Badge } from '@/Components/Ui/badge';
import { Button } from '@/Components/Ui/button';
import { Clock, Calendar, User, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { DashboardProps } from '@/Types/main';

export default function MyDashboard({ personalStats, recentActivities, quickActions }: DashboardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'present':
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'absent':
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'clock':
        return <Clock className="h-4 w-4" />;
      case 'calendar':
        return <Calendar className="h-4 w-4" />;
      case 'user':
        return <User className="h-4 w-4" />;
      case 'dollar-sign':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <>
      <Head title="My Dashboard" />

      <div className="space-y-6">
        {/* Personal Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Today's Attendance */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {personalStats.todayAttendance ? (
                <div className="space-y-1">
                  <div className="text-2xl font-bold">
                    {personalStats.todayAttendance.hours_worked}h
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {personalStats.todayAttendance.clock_in} - {personalStats.todayAttendance.clock_out}
                  </p>
                  <Badge className={getStatusColor(personalStats.todayAttendance.status)}>
                    {personalStats.todayAttendance.status}
                  </Badge>
                </div>
              ) : (
                <div className="text-2xl font-bold text-muted-foreground">No data</div>
              )}
            </CardContent>
          </Card>

          {/* Leave Balance */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(personalStats.leaveBalance).map(([type, balance]: [string, { used: number; total: number }]) => (
                  <div key={type} className="flex justify-between text-sm">
                    <span className="capitalize">{type}</span>
                    <span>{balance.used}/{balance.total}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Hours */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Hours</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{personalStats.monthlyHours}h</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          {/* Next Payslip */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payslip</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {personalStats.nextPayslip ? (
                <div className="space-y-1">
                  <div className="text-2xl font-bold">
                    ${personalStats.nextPayslip.amount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {personalStats.nextPayslip.date}
                  </p>
                </div>
              ) : (
                <div className="text-2xl font-bold text-muted-foreground">No data</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks you can perform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  asChild
                >
                  <a href={action.url}>
                    {getIcon(action.icon)}
                    <span className="text-sm">{action.title}</span>
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Your latest attendance and leave activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.description}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.date}
                      </p>
                    </div>
                    <Badge className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recent activities</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}