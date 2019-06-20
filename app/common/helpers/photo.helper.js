export const photoUploader = (
  url,
  fileUri,
  fileName,
  contentType,
  updatePhoto,
  errorResponse
) => {
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Once it's uploaded, dispatch the signed url with all extra params removed
        const sanitized_url = url.substr(0, url.indexOf('?'));
        updatePhoto(sanitized_url);
      } else {
        console.log('Error')
        // addPhoto({ photo: existingPhoto });
        // errorResponse('Unable to upload image');
      }
    }
  };
  xhr.setRequestHeader('X-Amz-ACL', 'public-read');
  xhr.setRequestHeader('Content-Type', contentType);
  xhr.send({ uri: fileUri, type: contentType, name: fileName });
};