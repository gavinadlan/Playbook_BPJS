import React from 'react';

export const highlightKeyword = (text: string, keyword: string): string[] => {
  if (!keyword) return [text];
  
  const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
  return parts;
}; 