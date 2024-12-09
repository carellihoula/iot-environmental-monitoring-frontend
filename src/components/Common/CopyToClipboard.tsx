import React, { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import styled from "styled-components";

interface CopyToClipboardProps {
  text: string; // Le texte à copier dans le presse-papiers
  onCopy?: () => void; // Callback facultatif déclenché après la copie
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true); // Change le texte du bouton à "Copié"
      if (onCopy) onCopy();

      // Réinitialise le texte après 2 secondes
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <CopyButton onClick={handleCopy}>
      <MdContentCopy size={15} />
      {copied ? "Copié" : "Copier"}
    </CopyButton>
  );
};

export default CopyToClipboard;

// Styled Components
const CopyButton = styled.button`
  background-color: #3c1bd1;
  color: #fff;
  border: none;
  padding: 8px 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #2e02f5;
  }

  svg {
    margin-right: 5px;
  }
`;
