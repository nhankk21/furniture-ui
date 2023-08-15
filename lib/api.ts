import {BoundlessClient} from 'Boundless-api-client';

const baseURL = process.env.Boundless_API_BASE_URL;
const permanentToken = process.env.Boundless_API_PERMANENT_TOKEN;
const s3Prefix = process.env.Boundless_S3_PREFIX;
const mediaServer = process.env.Boundless_MEDIA_SERVER;

const apiClient = new BoundlessClient(permanentToken);
apiClient.setInstanceId(process.env.Boundless_INSTANCE_ID as unknown as number);

if (baseURL) {
  apiClient.setBaseUrl(baseURL);
}

if (s3Prefix) {
  apiClient.setS3FolderPrefix(s3Prefix);
}

if (mediaServer) {
  apiClient.setMediaServerUrl(mediaServer);
}

export {apiClient};
