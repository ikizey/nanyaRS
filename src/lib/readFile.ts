export function readFile(fileList: FileList): Promise<string> {
  const file = fileList[0];
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}
