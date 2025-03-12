import { randomUUID } from 'node:crypto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  IStorageGateway,
  IStorageParams,
} from 'src/core/enterprise/gateways/storage/storage.gateway';
import { Injectable } from '@nestjs/common';

@Injectable()
export class R2StorageGateway implements IStorageGateway {
  private client: S3Client;

  constructor() {
    const accountId = '332ded2152d12800d4dee005781009d9';
    const accessKeyId = '48731eb4d359ce32c86c7542c12c9e05';
    const secretAccessKey =
      '4515f5e6071d8b1e4c6942a93f36f118ae80acf9277b78dacebda5b56059b1e4';

    this.client = new S3Client({
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      region: 'auto',
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  public async uploader(file: IStorageParams): Promise<{ url: string }> {
    const bucketName = 'casa';
    const fileName = this.generateUniqueFileName(file.fileName);

    await this.client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: fileName,
        Body: file.body,
      }),
    );

    return {
      url: fileName,
    };
  }

  public generateUniqueFileName(fileName: string): string {
    const prefixUUID = randomUUID();
    return `${prefixUUID}-${fileName}`;
  }

  public getPublicFileUrl(fileName: string) {
    return `https://pub-1eff6bb1bb8740c5a579104cc2ee9385.r2.dev/${fileName}`;
  }
}
