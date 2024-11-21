import { configDotenv } from "dotenv";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

configDotenv();
const client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

async function getObjectURL(key) {
  const cmd = new GetObjectCommand({
    Bucket: "protected-bucket.loukik",
    Key: key,
  });
  const url = await getSignedUrl(client, cmd);
  return url;
}

async function init() {
  console.log("url for protected image:", await getObjectURL("naruto.jpg"));
}

init();
