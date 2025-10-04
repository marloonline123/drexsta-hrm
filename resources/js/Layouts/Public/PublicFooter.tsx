import { Link } from '@inertiajs/react';

export default function PublicFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-card border-t mt-16">
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        &copy; {currentYear} Drexsta. All Rights Reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}