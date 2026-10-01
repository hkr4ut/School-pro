import { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface FileInputProps {
  label: string;
  accept?: string;
  error?: string;
  onChange?: (file: File | null) => void;
  required?: boolean;
  className?: string;
}

export default function FileInput({ label, accept, error, onChange, required, className }: FileInputProps) {
  const [fileName, setFileName] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file?.name || '');
    onChange?.(file);
  };

  const clearFile = () => {
    setFileName('');
    onChange?.(null);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      {fileName ? (
        <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
          <Upload className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-700 flex-1 truncate">{fileName}</span>
          <button onClick={clearFile} className="text-gray-400 hover:text-gray-600" type="button" aria-label="Remove file">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex items-center justify-center gap-2 px-3 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors">
          <Upload className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-500">Choose file or drag here</span>
          <input type="file" accept={accept} onChange={handleChange} className="hidden" />
        </label>
      )}
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}
