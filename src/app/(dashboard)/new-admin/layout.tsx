import Link from 'next/link';
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
  StickyNote
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
import { User } from './user';
import Providers from '../../../components/admin-ui/providers';
import { NavItem } from '../../../components/admin-ui/nav-item';
import { SearchInput } from '../../../components/admin-ui/search';
import DashboardRootLayout from '@/components/admin-ui/dashboard-root-layout';
import { protectPage } from '@/lib/auth-utils';


export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  
  await protectPage();

  return (
    <DashboardRootLayout 
      menuItems={[
        {
          title: 'Dashboard',
          link: '/new-admin',
          icon: <Home />
        },
        {
          title: 'Post',
          link: '/new-admin/posts',
          icon: <StickyNote />
        },
        {
          title: 'Categories',
          link: '/new-admin/categories',
          icon: <Package />
        },  
        {
          title: 'Settings',
          link: '/new-admin/settings',
          icon: <Settings />
        }
      ]}>
      {children}
    </DashboardRootLayout>
  );
}