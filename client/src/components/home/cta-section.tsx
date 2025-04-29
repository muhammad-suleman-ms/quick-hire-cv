import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CtaSection() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to land your dream job?</h2>
        <p className="text-neutral-300 max-w-2xl mx-auto mb-8">Create a professional, ATS-friendly resume in minutes with our easy-to-use builder</p>
        <Link href="/builder">
          <Button className="px-8 py-3 bg-cyan-500 text-primary font-medium rounded-lg hover:bg-cyan-400 transition-colors text-lg">
            Create Your Resume Now - Free
          </Button>
        </Link>
        <p className="mt-4 text-neutral-300 text-sm">No credit card required to get started</p>
      </div>
    </section>
  );
}
