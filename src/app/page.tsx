import { Session } from 'next-auth';

import authOptions from './api/auth/[...nextauth]/auth-options';

import { HeroForm } from '@/components/form';
import { Button } from '@/components/ui/button';
import * as m from '@/paraglide/messages';
import { Icons } from '@/components/icons';
import { getServerSession } from 'next-auth';
import { Navbar } from '@/components/navbar/navbar';

const Home = async () => {
  const session: Session | null = await getServerSession(authOptions);

  console.log('fahmi home page session ', session);
  return (
    <>
      <Navbar></Navbar>
      <section className="container mt-10 flex flex-col items-center gap-3 text-center md:absolute md:left-1/2 md:top-1/2 md:mt-0 md:-translate-x-1/2 md:-translate-y-1/2">
        <h1 className="mb-1 font-mono text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          welcome {session?.user?.email}
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          {m.nextjs_starter_template_description()}
        </p>

        <div className="mt-1">
          <HeroForm />
        </div>
        <div className="mt-2 flex gap-4">
          <Button asChild>
            <a
              href="https://github.com/Skolaczk/next-starter/blob/main/README.md#getting-started"
              target="_blank"
            >
              {m.get_started()}
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com/Skolaczk/next-starter" target="_blank">
              <Icons.github className="mr-2 size-4" /> {m.github()}
            </a>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;
