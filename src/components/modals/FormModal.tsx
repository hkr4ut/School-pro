import Modal from '../common/Modal';
import Button from '../common/Button';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function FormModal({
  isOpen, onClose, title, children, onSubmit,
  submitLabel = 'Save', isSubmitting = false, size = 'md',
}: FormModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      footer={
        <>
          <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
          <Button variant="primary" onClick={(e) => onSubmit(e as unknown as React.FormEvent)} isLoading={isSubmitting}>{submitLabel}</Button>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
    </Modal>
  );
}
