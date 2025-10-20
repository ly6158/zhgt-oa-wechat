// 文件后缀名 与 类型 映射关系
export const FileTypeMapper = {
  word: "word",
  doc: "word",
  docx: "word",

  xls: "excel",
  xlsx: "excel",
  csv: "excel",

  ppt: "ppt",
  pptx: "ppt",
  pptm: "ppt",

  pdf: "pdf",

  mp4: "video",
  avi: "video",
  mov: "video",
  wmv: "video",
  flv: "video",
  mkv: "video",
  rmvb: "video",

  img: "image",
  jpg: "image",
  jpeg: "image",
  png: "image",
  gif: "image",
  bmp: "image",
  svg: "image",

  zip: "zip",
  tar: "zip",
  gz: "zip",
  rar: "zip",
  "7z": "zip",
  bz2: "zip",
};

// 文件类型 与 ICON名称 映射关系
export const FileIconMapper = {
  word: "file-word",
  excel: "file-excel",
  ppt: "file-ppt",
  pdf: "file-pdf",
  video: "file-video",
  image: "file-image",
  zip: "file-zip",
};

export const getFileIcon = (suffix)=>{
  if(FileTypeMapper[suffix]){
    return FileIconMapper[FileTypeMapper[suffix]]
  }else{
    return "file-other"
  }
}