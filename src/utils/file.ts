export const fileToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // `readAsDataURL()` results in a string containing a data URL.
      const data = (reader.result as string).replace(/^data:\w*\/\w*;base64,/, "");
      if (!data) reject("no data in file");
      else resolve(data);
    };
    reader.onerror = reject;
  });
};

export const getExt = (filename: string) =>
  filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
