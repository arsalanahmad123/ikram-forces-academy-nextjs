import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

import { Button } from './ui/button';

interface ModalDialogProps {
  open: boolean;
  onAgree: () => void;
}

export default function ModalDialog({ open, onAgree }: ModalDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="p-10 sm:max-w-[425px] lg:min-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-3xl mb-4">Read Carefully</DialogTitle>
          <DialogDescription asChild>
            <ul className="list-disc flex flex-col gap-3 text-lg">
              <li>
                <span className="font-bold">Do Not Reload the Page:</span> All
                your progress will be lost if you reload or close this page.
              </li>
              <li>
                <span className="font-bold">Stay on This Tab:</span> Switching
                tabs or opening other apps may cause you to lose your work.
              </li>
              <li>
                <span className="font-bold">Submit Answers Carefully:</span>{' '}
                Double-check your answers before submitting, as changes may not
                be allowed later.
              </li>
              <li>
                <span className="font-bold">Complete the Paper in One Go:</span>{' '}
                Once you start, try to finish the paper without taking long
                breaks.
              </li>
              <li>
                <span className="font-bold">Follow the Time Limit:</span> Keep
                an eye on the timer and make sure to submit your paper before
                time runs out.
              </li>
              <li>
                <span className="font-bold">No External Help:</span> Do your
                best on your own, without asking for help from others.
              </li>
              <li>
                <span className="font-bold">Keep Your Device Charged:</span>{' '}
                Ensure your device is fully charged or plugged in to avoid any
                interruptions.
              </li>
              <li>
                <span className="font-bold">
                  Use a Stable Internet Connection:
                </span>{' '}
                A good internet connection is necessary to save your progress
                and submit the paper.
              </li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onAgree}>Agree</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
