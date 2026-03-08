import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BookingWidgetProps {
  calUsername?: string;
  buttonText?: string;
  className?: string;
}

const BookingWidget = ({ 
  calUsername = "your-username", // Replace with your Cal.com username
  buttonText = "Book a Session",
  className = ""
}: BookingWidgetProps) => {
  const calUrl = `https://cal.com/${calUsername}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className={`bg-coral hover:bg-coral/90 text-white gap-2 ${className}`}
          size="lg"
        >
          <Calendar className="w-5 h-5" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] h-[80vh] p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-navy">Schedule a Meeting</DialogTitle>
        </DialogHeader>
        <div className="flex-1 h-full min-h-[500px]">
          <iframe
            src={`${calUrl}?embed=true&theme=light`}
            width="100%"
            height="100%"
            frameBorder="0"
            className="rounded-b-lg"
            title="Book a session"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingWidget;
