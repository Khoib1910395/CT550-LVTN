const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const Bucket = mezone-auction;

const s3 = new S3({
  region: ap-southeast-1,
  accessKeyId: AKIAWX4Z7SGCMIAFSEWY,
  secretAccessKey: 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,
});

// Upload file to S3 bucket
exports.uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket,
    Body: fileStream,
    Key: file.filename,
  };

  // return promise returned by s3
  return s3.upload(uploadParams).promise();
};

// Get file from S3 bucket
exports.getFileStream = async (fileKey) => {
  const downloadParams = {
    Bucket,
    Key: fileKey,
  };
  const file = await s3.getObject(downloadParams).promise();
  return file.Body;
};
