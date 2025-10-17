import { useParams } from 'react-router';
import z from 'zod';

export function useValidatedId() {
  const { id } = useParams();
  const result = z.uuid().safeParse(id);
  return result.success ? result.data : null;
}
