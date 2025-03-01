import Link from 'next/link';
import {
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    Settings,
    ShoppingCart,
    Users2
} from 'lucide-react';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/admin-ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/admin-ui/sheet';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '@/components/admin-ui/tooltip';
import Providers from './providers';
import { NavItem } from './nav-item';
import { Navbar } from '../navbar/navbar';


export type MenuItem = {
    title: string;
    link: string;
    icon: React.ReactNode;
}

export default function DashboardRootLayout({
    menuItems,
    children
}: {
    menuItems?: MenuItem[];
    children: React.ReactNode;
}) {
    return (
        <Providers>

            <main className="flex min-h-screen w-full flex-col bg-muted/40">
                <div className='z-50 bg-background'>
                    <Navbar />
                </div>
                <DesktopNav menuItems={menuItems} />
                <div className="flex flex-col sm:gap-4 sm:pl-14 mt-16">
                    <header className="sticky z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                        <MobileNav menuItems={menuItems} />
                    </header>
                    <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4">
                        {/* <DashboardBreadcrumb /> */}
                        {children}
                    </main>
                </div>
            </main>
        </Providers>
    );
}

function DesktopNav({ menuItems }: { menuItems?: MenuItem[]; }) {
    return (
        <aside className="fixed inset-y-0 pt-14 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">

                {
                    menuItems?.map((item, index) => (
                        <NavItem key={index} href={item.link} label={item.title}>
                            {item.icon}
                        </NavItem>
                    ))
                }

                {/* <NavItem href="#" label="Dashboard">
          <Home className="h-5 w-5" />
        </NavItem>

        <NavItem href="#" label="Orders">
          <ShoppingCart className="h-5 w-5" />
        </NavItem>

        <NavItem href="/" label="Products">
          <Package className="h-5 w-5" />
        </NavItem>

        <NavItem href="/customers" label="Customers">
          <Users2 className="h-5 w-5" />
        </NavItem>

        <NavItem href="#" label="Analytics">
          <LineChart className="h-5 w-5" />
        </NavItem> */}
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="#"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                            <Settings className="h-5 w-5" />
                            <span className="sr-only">Settings</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Settings</TooltipContent>
                </Tooltip>
            </nav>
        </aside>
    );
}

function MobileNav({
    menuItems }: { menuItems?: MenuItem[]; }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                    {
                        menuItems?.map((item, index) => (
                            <Link
                                href="#"
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                {item.icon}
                                {item.title}
                            </Link>
                        ))
                    }
                    {/* <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Vercel</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            Customers
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Settings
          </Link> */}
                </nav>
            </SheetContent>
        </Sheet>
    );
}

function DashboardBreadcrumb() {
    return (
        <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="#">Dashboard</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="#">Products</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>All Products</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
