import { readAsDataURL } from 'promise-file-reader';
import { BasePlugin } from '@uppy/core';

const SUBREQUEST = 'batch-upload';

class ContentsUploadPlugin extends BasePlugin {
  constructor(uppy, opts) {
    super(uppy, opts);
    this.uppy = uppy;
    this.id = this.opts.id || 'VoltoUploader';
    this.type = 'uploader';
    this.bytesUploaded = 0;
    this.voltoUpload = this.voltoUpload.bind(this);
  }

  uploadFile = async (file) => {
    await readAsDataURL(file.data).then((data) => {
      const image = file.type.split('/')[0] === 'image';
      const pathname = this.opts.getPathName();
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      this.opts.createContent(
        pathname,
        {
          '@type': image ? 'Image' : 'File',
          title: file.name,
          [image ? 'image' : 'file']: {
            data: fields[3],
            encoding: fields[2],
            'content-type': file.type,
            filename: file.name,
          },
        },
        SUBREQUEST,
      );
      const uploadResp = {
        status: 200,
      };
      this.uppy.emit('upload-success', file, uploadResp);
    });
  };

  voltoUpload = (fileIDs) => {
    const promises = fileIDs.map((fileID) => {
      const file = this.uppy.getFile(fileID);
      this.uppy.emit('upload-started', file);
      return this.uploadFile(file);
    });

    return Promise.all(promises);
  };

  install() {
    this.uppy.addUploader(this.voltoUpload);
  }

  uninstall() {
    this.uppy.removeUploader(this.voltoUpload);
  }
}

export default ContentsUploadPlugin;
