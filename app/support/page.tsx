import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl mb-8 text-foreground">
          Support <span className="font-reenie">For Bias</span>
        </h1>

        <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
          For Bias is and will always be completely free to use! However, if you&apos;d like to
          support the development and server costs, you can make a voluntary contribution.
          Any amount is deeply appreciated and helps keep this service running smoothly for
          everyone :)
        </p>

        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-lg"
            asChild
          >
            <a
              href="https://saweria.co/forbias"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              Support For Bias (Saweria)
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>

          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-lg"
            asChild
          >
            <a
              href="https://sociabuzz.com/forbias"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              Support For Bias (SociaBuzz)
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>

          <p className="text-muted-foreground text-sm mt-4">
            Accept payments from outside Indonesia
          </p>
        </div>
      </div>
    </div>
  );
}