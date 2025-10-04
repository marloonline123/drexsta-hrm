import React from 'react';
import { motion } from 'framer-motion';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { JobPosting } from '@/Types/job-postings';
import { Button } from '@/Components/Ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/Ui/card';
import { CheckCircle, Clock, Mail, Phone, FileText, ArrowRight, Home } from 'lucide-react';
import { t } from 'i18next';

interface ApplicationSuccessProps {
    posting: JobPosting;
    company: {
        id: number;
        name: string;
        slug: string;
    };
    applicationNumber: string;
}

const ApplicationSuccess = ({ posting, company, applicationNumber }: ApplicationSuccessProps) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: { delay: 0.3, duration: 0.6 }
        }
    };

    return (
        <PublicLayout>
            <Head title={`${t('publicJobs.applicationSuccess')} | ${posting.title}`} />

            <div className="min-h-screen flex items-center justify-center p-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-2xl w-full"
                >
                    {/* Success Animation */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-8"
                    >
                        <motion.div
                            variants={iconVariants}
                            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
                        >
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-3xl font-bold text-gray-900 mb-2"
                        >
                            {t('publicJobs.applicationSuccess')}
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-gray-600"
                        >
                            {t('publicJobs.applicationSuccessMessage', { position: posting.title })}
                        </motion.p>
                    </motion.div>

                    {/* Application Details */}
                    <motion.div variants={itemVariants}>
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    {t('publicJobs.applicationDetails')}
                                </CardTitle>
                                <CardDescription>
                                    {t('publicJobs.applicationConfirmation')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">
                                            {t('publicJobs.applicationNumber')}
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {applicationNumber}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">
                                            {t('publicJobs.position')}
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {posting.title}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">
                                            {t('publicJobs.company')}
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {company.name}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">
                                            {t('publicJobs.submissionDate')}
                                        </label>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {new Date().toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Next Steps */}
                    <motion.div variants={itemVariants}>
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ArrowRight className="w-5 h-5" />
                                    {t('publicJobs.whatHappensNext')}
                                </CardTitle>
                                <CardDescription>
                                    {t('publicJobs.nextStepsDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-semibold text-blue-600">1</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                {t('publicJobs.reviewProcess')}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {t('publicJobs.reviewProcessDescription')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-semibold text-blue-600">2</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                {t('publicJobs.interviewStage')}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {t('publicJobs.interviewStageDescription')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-semibold text-blue-600">3</span>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                {t('publicJobs.finalDecision')}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {t('publicJobs.finalDecisionDescription')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Timeline & Contact */}
                    <motion.div variants={itemVariants}>
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    {t('publicJobs.timeline')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">
                                            {t('publicJobs.applicationReview')}
                                        </span>
                                        <span className="text-sm font-medium text-gray-900">
                                            2-5 {t('publicJobs.businessDays')}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                        <span className="text-sm text-gray-600">
                                            {t('publicJobs.interviewScheduling')}
                                        </span>
                                        <span className="text-sm font-medium text-gray-900">
                                            1-2 {t('publicJobs.weeks')}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-sm text-gray-600">
                                            {t('publicJobs.finalResponse')}
                                        </span>
                                        <span className="text-sm font-medium text-gray-900">
                                            2-4 {t('publicJobs.weeks')}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div variants={itemVariants}>
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Mail className="w-5 h-5" />
                                    {t('publicJobs.needHelp')}
                                </CardTitle>
                                <CardDescription>
                                    {t('publicJobs.contactDescription')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {t('publicJobs.emailSupport')}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                careers@{company.slug}.com
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {t('publicJobs.phoneSupport')}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                +1 (555) 123-4567
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* FAQ Section */}
                    <motion.div variants={itemVariants}>
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle>{t('publicJobs.frequentlyAskedQuestions')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">
                                            {t('publicJobs.faqEditApplication')}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {t('publicJobs.faqEditApplicationAnswer')}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">
                                            {t('publicJobs.faqMultipleApplications')}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {t('publicJobs.faqMultipleApplicationsAnswer')}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-1">
                                            {t('publicJobs.faqStatusUpdates')}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {t('publicJobs.faqStatusUpdatesAnswer')}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button asChild variant="outline">
                            <Link href={route('jobs.index', company.slug)}>
                                <Home className="w-4 h-4 mr-2" />
                                {t('publicJobs.backToJobs')}
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={route('jobs.show', { company: company.slug, jobPosting: posting.slug })}>
                                {t('publicJobs.viewPosition')}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </PublicLayout>
    );
};

export default ApplicationSuccess;