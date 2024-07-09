declare module 'next-auth' {
  interface Session {
    id: string;
    name: string;
    email: string;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    email: string;
    image?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }
}
