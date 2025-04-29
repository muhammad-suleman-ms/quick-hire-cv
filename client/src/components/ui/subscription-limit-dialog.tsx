import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, X } from "lucide-react";
import { useLocation } from "wouter";

interface SubscriptionLimitDialogProps {
  open: boolean;
  onClose: () => void;
  type: 'free-limit' | 'premium-template';
}

export function SubscriptionLimitDialog({ open, onClose, type }: SubscriptionLimitDialogProps) {
  const [_, setLocation] = useLocation();
  
  const goToSubscription = () => {
    setLocation("/subscription");
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            {type === 'free-limit' 
              ? "Free Account Limit Reached" 
              : "Premium Template Access"}
          </DialogTitle>
          <DialogDescription>
            {type === 'free-limit' 
              ? "You've reached the maximum of 3 resumes for free accounts." 
              : "This premium template requires a subscription."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-semibold mb-2">Upgrade to Premium</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Unlimited resumes and CVs</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Access to all premium templates</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>No watermarks on downloads</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Priority customer support</span>
              </li>
            </ul>
            
            <Badge variant="success" className="mb-2">Only $9.99/month</Badge>
            
            <Button className="w-full" onClick={goToSubscription}>
              Upgrade Now
            </Button>
          </div>
        </div>
        
        <DialogFooter className="flex sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Maybe Later
          </Button>
          <Button onClick={goToSubscription}>
            Go to Subscription Plans
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SubscriptionLimitDialog;