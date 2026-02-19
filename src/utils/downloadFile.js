export const downloadFile = async (url, filename) => {
  const res = await fetch(url);

  const blob = await res.blob();

  const blobUrl = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename || "file.pdf";

  document.body.appendChild(a);
  a.click();

  a.remove();
  window.URL.revokeObjectURL(blobUrl);
};
