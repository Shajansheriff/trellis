import { createFileRoute, Link } from '@tanstack/react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function ReviewTemplatesPage() {
  return (
    <main className="container py-8">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/home">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-8 flex-wrap">
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
            Review Templates
          </h1>
          <p className="text-base text-muted-foreground">
            Review templates are used to review and approve content.
          </p>
        </div>
        <div>
          <Button>New</Button>
        </div>
      </div>

      <div className="py-8">
        <Tabs defaultValue="all" className="min-w-[400px]">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
          </TabsList>
          <TabsContent value="all">All templates will appear here.</TabsContent>
          <TabsContent value="draft">
            Draft templates will appear here.
          </TabsContent>
          <TabsContent value="published">
            Published templates will appear here.
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export const Route = createFileRoute('/(app)/_app/review-templates')({
  component: ReviewTemplatesPage,
});
