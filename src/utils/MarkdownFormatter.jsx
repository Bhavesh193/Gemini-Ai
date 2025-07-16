export const formatTextWithBasicMarkdown = (text) => {
  if (!text) return { __html: '' };


  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');

  formattedText = formattedText.replace(/\n/g, '<br />');

  return { __html: formattedText };
};