import { createFileRoute } from '@tanstack/react-router';
import Hero from './_components/Hero';
import HotProductsSection from '@/routes/(index)/_components/HotProductsSection';
import ExpireProductsSection from '@/routes/(index)/_components/ExpireProductsSection';
import AllProductsSection from '@/routes/(index)/_components/AllProductsSection';

export const Route = createFileRoute('/(index)/')({
  component: Index,
});

function Index() {
  return (
    <div>
      <Hero />
      <HotProductsSection />
      <ExpireProductsSection />
      <AllProductsSection />
    </div>
  );
}
