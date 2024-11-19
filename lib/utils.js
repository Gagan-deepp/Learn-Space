import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file) => URL.createObjectURL(file);


export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function toCapitalize(text) {
  return String(text).charAt(0).toUpperCase() + String(text).slice(1)
}

export function parseServerActionResponse(response) {
  return JSON.parse(JSON.stringify(response));
}

export const getFileIcon = (extension, type) => {
  switch (extension) {
    // Document
    case "pdf":
      return "/icon/file-pdf.svg";
    case "doc":
      return "/icon/file-doc.svg";
    case "docx":
      return "/icon/file-docx.svg";
    case "csv":
      return "/icon/file-csv.svg";
    case "txt":
      return "/icon/file-txt.svg";
    case "xls":
    case "xlsx":
      return "/icon/file-document.svg";
    // Image
    case "svg":
      return "/icon/file-image.svg";
    // Video
    case "mkv":
    case "mov":
    case "avi":
    case "wmv":
    case "mp4":
    case "flv":
    case "webm":
    case "m4v":
    case "3gp":
      return "/icon/file-video.svg";
    // Audio
    case "mp3":
    case "mpeg":
    case "wav":
    case "aac":
    case "flac":
    case "ogg":
    case "wma":
    case "m4a":
    case "aiff":
    case "alac":
      return "/icon/file-audio.svg";

    default:
      switch (type) {
        case "image":
          return "/icon/file-image.svg";
        case "document":
          return "/icon/file-document.svg";
        case "video":
          return "/icon/file-video.svg";
        case "audio":
          return "/icon/file-audio.svg";
        default:
          return "/icon/file-other.svg";
      }
  }
};


export const getFileType = (fileName) => {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (!extension) return { type: "other", extension: "" };

  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "txt",
    "xls",
    "xlsx",
    "csv",
    "rtf",
    "ods",
    "ppt",
    "odp",
    "md",
    "html",
    "htm",
    "epub",
    "pages",
    "fig",
    "psd",
    "ai",
    "indd",
    "xd",
    "sketch",
    "afdesign",
    "afphoto",
    "afphoto",
  ];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
  const videoExtensions = ["mp4", "avi", "mov", "mkv", "webm"];
  const audioExtensions = ["mp3", "wav", "ogg", "flac"];

  if (documentExtensions.includes(extension))
    return { type: "document", extension };
  if (imageExtensions.includes(extension)) return { type: "image", extension };
  if (videoExtensions.includes(extension)) return { type: "video", extension };
  if (audioExtensions.includes(extension)) return { type: "audio", extension };

  return { type: "other", extension };
};
