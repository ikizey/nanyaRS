import * as yup from "yup";

export const file = yup
  .mixed<FileList>()
  .required("Picture is required")
  .test(
    "fileSize",
    "File is too large",
    (value) => value && value[0]?.size <= 1024 * 1024 * 2,
  )
  .test(
    "fileType",
    "Unsupported file format",
    (value) => value && ["image/jpeg", "image/png"].includes(value[0]?.type),
  );
