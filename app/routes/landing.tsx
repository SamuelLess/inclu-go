import { NavLink } from "react-router";
import { Button } from "~/components/ui/button";


export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Logo - assuming there's a logo file, adjust path as needed */}
        <img 
          src="/IncluGO.svg" 
          alt="Logo" 
          className="mb-6 h-24 w-auto max-w-[212px]"
        />

        
        <p className="mb-8 text-muted-foreground">
            Your journey, your way.
            
            Whether you use a wheelchair, a prosthetic, have visual impairments, 
            or prefer to avoid crowded spaces — we prioritize accessibility for you.
        </p>
        
        <Button 
          asChild 
          size="lg" 
          className="w-full max-w-[200px]"
        >
          <NavLink to="/map">Continue</NavLink>
        </Button>
      </div>
    </div>
  );
}