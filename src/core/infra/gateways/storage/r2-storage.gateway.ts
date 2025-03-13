import { randomUUID } from 'node:crypto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import {
  IStorageGateway,
  IStorageParams,
} from 'src/core/enterprise/gateways/storage/storage.gateway';
import { Injectable } from '@nestjs/common';
import { EnvService } from '../../config/env/env.service';

@Injectable()
export class R2StorageGateway implements IStorageGateway {
  private client: S3Client;

  constructor(private envService: EnvService) {
    const accountId = this.envService.get('CLOUDFLARE_ACCOUNT_ID');
    const accessKeyId = this.envService.get('AWS_SECRET_KEY_ID');
    const secretAccessKey = this.envService.get('AWS_SECRET_ACCESS_KEY');

    this.client = new S3Client({
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      region: 'auto',
      credentials: {
        accessKeyId,
        secretAccessKey,
        accountId,
      },
    });
  }

  public async uploader(file: IStorageParams): Promise<{ url: string }> {
    const bucketName = file.folder;
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
