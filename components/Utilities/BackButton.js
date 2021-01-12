import { useRouter } from 'next/router';
import styled from 'styled-components';

export const BackButton = () => {
  const router = useRouter();

  return (
    <BTN onClick={() => router.back()} >
      &larr;
    </BTN>
  )
}

const BTN = styled.button`
  background: none;
  border-radius: 50%;
  border: 1px solid #dfe1e5;
  display: inline-block;
`;