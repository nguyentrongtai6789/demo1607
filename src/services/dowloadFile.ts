const dispositionType = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
class DownloadFiles {
  private downloadBinaryFile = (
    data: Blob,
    fileName: string,
    subname?: string
  ) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");
    link.href = url;
    if (subname) {
      fileName = fileName.slice(0, fileName.length - 5);
      link.setAttribute("download", `${fileName}${subname}`);
    } else {
      link.setAttribute("download", `${fileName}`);
    }
    document.body.appendChild(link);
    link.click();
  };

  private downloadBase64File = (
    base64: string,
    fileName: string,
    fileType: string
  ) => {
    const linkSource = `data:application/${fileType};base64,${base64}`;
    const downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    downloadLink.href = linkSource;
    downloadLink.target = "_self";
    downloadLink.download = fileName;
    downloadLink.click();
  };

  private fileName = (header: any) => {
    const disposition = header["content-disposition"];

    const matches = dispositionType.exec(disposition);

    if (!matches) {
      return;
    }

    return matches[1].replace(/['"]/g, "");
  };

  public getDownloadBinaryFile = (data: any, header: any, submane?: string) => {
    this.downloadBinaryFile(data, header, submane);
  };
  public getDownloadBase64File = (
    base64: string,
    fileName: string,
    fileType: string
  ) => {
    this.downloadBase64File(base64, fileName, fileType);
  };

  public getFileName = (header: any) => {
    this.fileName(header);
  };
}

const DownloadFile = new DownloadFiles();
export default DownloadFile;
