interface UploadListeners {
    onError: (evt: ProgressEvent) => void;
    onAbort: (evt: ProgressEvent) => void;
    onLoad: (evt: ProgressEvent) => void;
    onLoadStart: (evt: ProgressEvent) => void;
    onLoadEnd: (evt: ProgressEvent) => void;
    onTimeout: (evt: ProgressEvent) => void;
    onProgress: (evt: ProgressEvent) => void;
}

export function upload(file: Blob, listeners: Partial<UploadListeners>): XMLHttpRequest {
    const xhr = new XMLHttpRequest();
    const tokenMetaElement = document.querySelector('meta[name="api-token"]');
    if (!tokenMetaElement) {
        return xhr;
    }
    const token = tokenMetaElement?.getAttribute('content');

    xhr.open('POST', '/api/media/', true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.responseType = 'json';

    if (listeners.onError) {
        xhr.addEventListener('error', listeners.onError);
    }

    if (listeners.onAbort) {
        xhr.addEventListener('abort', listeners.onAbort);
    }

    if (listeners.onLoad) {
        xhr.addEventListener('load', listeners.onLoad);
    }

    if (listeners.onLoadStart) {
        xhr.addEventListener('loadstart', listeners.onLoadStart);
    }

    if (listeners.onLoadEnd) {
        xhr.addEventListener('loadend', listeners.onLoadEnd);
    }

    if (listeners.onTimeout) {
        xhr.addEventListener('timeout', listeners.onTimeout);
    }

    if (xhr.upload && listeners.onProgress) {
        xhr.upload.addEventListener('progress', listeners.onProgress);
    }

    const data = new FormData();
    data.append('file', file);
    xhr.send(data);

    return xhr;
}
