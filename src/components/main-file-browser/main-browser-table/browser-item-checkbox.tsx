import React, { useEffect } from 'react';
import { Checkbox } from '@ui/checkbox';
import { Row } from '@tanstack/react-table';
import { FallcrateFile } from '@/types';
import { useFilesystem } from '@/providers/filesystem-provider';

interface Props {
  row: Row<FallcrateFile>;
}
export const BrowserItemCheckbox = ({ row }: Props) => {
  const file = row.original;
  const { selectedFiles, setSelectedFiles } = useFilesystem();

  useEffect(() => {
    if (selectedFiles.includes(file.id)) {
      row.toggleSelected(true);
    }
  }, [file.id, selectedFiles, row]);

  return (
    <Checkbox
      checked={selectedFiles.includes(file.id)}
      onCheckedChange={(value) => {
        setSelectedFiles((prev) =>
          value ? [...prev, file.id] : prev.filter((id) => id !== file.id),
        );
        row.toggleSelected(!!value);
      }}
      aria-label='Select row'
      className='invisible h-5 w-5 group-hover:visible data-[state=checked]:visible'
    />
  );
};
